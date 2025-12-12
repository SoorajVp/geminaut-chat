
# Geminaut

Geminaut is a Vite React project that provides an AI chat experience using the Gemini API. Users can sign in via Google and interact with an AI chatbot. The application features light and dark modes and leverages React Context for state management.

## Features

- **Google Sign-In:** Secure authentication using Google.
- **AI Chat:** Engage in friendly conversations with AI powered by the Gemini API.
- **Light/Dark Mode:** Toggle between light and dark themes for an optimal user experience.
- **State Management:** Managed using React Context for seamless data flow.

## Installation

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/SoorajVp/geminaut-chat.git
cd geminaut-chat
````

### 2. Install Dependencies

Using npm:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the project root and add:

```env
VITE_GEMINI_API_KEY=your-gemini-api-key
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

Replace the placeholders with your actual API credentials.

### 4. Run the Project

Using npm:

```bash
npm run dev
```

### 5. Access the Application

Open your browser and visit:

```
http://localhost:5173
```
