require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
let bodyParser = require("body-parser");
const dns = require("node:dns");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
	res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
	res.json({ greeting: "hello API" });
});

app.listen(port, function () {
	console.log(`Listening on port ${port}`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const savedUrls = [];
let urlCounter = 1;

app.post("/api/shorturl", function (req, res) {
	const originalUrl = req.body.url;
	let hostname;

	try {
		hostname = new URL(originalUrl).hostname;
	} catch (e) {
		return res.json({ error: "invalid url" });
	}

	dns.lookup(hostname, (err, _address) => {
		if (err) {
			return res.json({ error: "invalid url" });
		}

		if (!savedUrls.find((item) => item.original_url === originalUrl)) {
			const shortUrl = urlCounter++;
			const newUrlEntry = {
				original_url: originalUrl,
				short_url: shortUrl,
			};
			savedUrls.push(newUrlEntry);
			res.json(newUrlEntry);
		} else {
			res.json(
				savedUrls.find((item) => item.original_url === originalUrl)
			);
		}
	});
});

app.get("/api/shorturl/:short_url", function (req, res) {
	const shortUrl = parseInt(req.params.short_url, 10);
	const urlEntry = savedUrls.find((item) => item.short_url === shortUrl);

	if (urlEntry) {
		res.redirect(urlEntry.original_url);
	} else {
		res.status(404).json({
			error: "No short URL found for the given input",
		});
	}
});
