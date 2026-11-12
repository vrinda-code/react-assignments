# Team Chat Application

A simple, responsive team chat application built using React.js. Users can send messages, interact with conversations and use emojis.

## Features

- Send messages using the input box or Enter key.
- Random usernames assigned to each message (Alan, Bob, Carol, Dean and Elin).
- Like messages with an interactive counter.
- Emoji picker to insert emojis into messages.
- Automatic scrolling to the latest message.
- Responsive interface for different screen sizes.
- Empty state displayed before the first message.

## Tech Stack

- React.js
- JavaScript
- CSS
- Vite

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/vrinda-code/react-assignments.git
```

### 2. Navigate to the Chat App

```bash
cd react-assignments/chat-app/frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the application

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## Project Structure

```text
chat-app/
├── README.md
└── frontend/
    ├── public/
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## Implementation Notes

- React useState manages messages, likes and emoji picker visibility.
- Each message receives a randomly selected username.
- Message likes are updated independently.
- Enter sends a message, while Shift + Enter allows a new line.
- Messages and likes are maintained in local React state and reset when the page is refreshed.

## Author

Vrinda Loya