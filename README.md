# URL Shortener Microservice

A simple API microservice built with Node.js and Express that shortens valid URLs. You can submit a URL, get a short URL in return, and when you visit the short URL, you will be redirected to the original website.

This project is a solution to the "URL Shortener Microservice" challenge from [freeCodeCamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice).

---

## ✨ Tech Stack

-   **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
-   **Middleware:** [cors](https://github.com/expressjs/cors), [body-parser](https://github.com/expressjs/body-parser)
-   **Language:** [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

_Note: This project uses in-memory arrays for data storage, so data will be reset on server restart._

---

## 🚀 How It Works

The API has two main endpoints for creating and using shortened URLs.

### Endpoint: `POST /api/shorturl`

-   Creates a new short URL.
-   **Request Body:** The request must be `x-www-form-urlencoded` with a `url` field containing the URL to be shortened.
-   **Validation:** The service checks if the submitted URL is valid by performing a DNS lookup on the hostname.
-   **Response:** If the URL is valid, it returns a JSON object with the original and short URLs. If invalid, it returns an error.

### Endpoint: `GET /api/shorturl/:short_url`

-   Redirects to the original URL associated with a short URL.
-   **URL Parameter:** `:short_url` is the number returned from the creation endpoint.
-   **Response:** A 302 redirect to the original URL.

---

### 📝 Usage Example

1.  Go to the root URL of the project in your browser.
2.  Use the provided HTML form to submit a valid URL (e.g., `https://www.freecodecamp.org`).
3.  The API will respond with a JSON object.
4.  Visit `[PROJECT_URL]/api/shorturl/<YOUR_SHORT_URL>` to be redirected to the original site.

---

### 📤 Output Example

-   **Successful Output (`POST /api/shorturl`):**

    ```json
    { "original_url": "https://www.freecodecamp.org", "short_url": 1 }
    ```

-   **Error Output (`POST /api/shorturl`):**
    ```json
    { "error": "invalid url" }
    ```

---

## 💻 Local Development

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd <REPOSITORY_NAME>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm start
    ```
    The server will then be running on `http://localhost:3000`.

---
