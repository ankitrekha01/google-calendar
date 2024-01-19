# Google Calendar Integration with Express.js

This is a simple Express.js application that integrates with the Google Calendar API. It allows you to authenticate, retrieve events, create new events, and fix meetings within a specified time range.

## Prerequisites

Before running the application, make sure you have the following:

- Node.js and npm installed
- Google API credentials (Client ID, Client Secret, and API Key)
- Redirect URL configured in the Google Cloud Console for OAuth2 authentication

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/ankitrekha01/google-calendar.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure your environment variables:

    Create a `.env` file in the project root and add the following:

    ```env
    CLIENT_ID=your-client-id
    CLIENT_SECRET=your-client-secret
    API_KEY=your-api-key
    REDIRECT_URL=your-redirect-url
    PORT=5000
    ```

4. Run the application:

    ```bash
    npm start
    ```

5. Visit `http://localhost:5000/google` in your browser to authenticate with Google Calendar.

## Endpoints

- `/google`: Initiates the Google OAuth2 authentication flow.
- `/google/redirect`: Handles the OAuth2 callback and sets the access token.
- `/allevent`: Retrieves all events from the authenticated user's Google Calendar.
- `/create-event`: Creates a new event within a specified time range, avoiding conflicts with existing events.
- `/fix-meeting`: Inserts a new event into the Google Calendar using the `/create-event` endpoint.

## Usage

1. Visit `http://localhost:5000/google` to authenticate with Google Calendar.

2. Use the provided endpoints to interact with the Google Calendar API.

3. Customize the application logic in `meetings.js` and endpoints in `app.js` as needed.

## Important Notes

- Ensure that your Google API credentials are correctly configured.
- The application uses an in-memory storage for the access token. In a production environment, consider using a secure token storage mechanism.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
