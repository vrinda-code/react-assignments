
import { useState, useRef, useEffect } from "react";
import "./App.css";

const userList = ["Alan", "Bob", "Carol", "Dean", "Elin"];

const emojis = [
  "😀", "😂", "❤️", "👍", "🎉",
  "🔥", "😍", "🙌", "😊", "🚀",
  "👏", "😎", "🥳", "🤔", "💯",
];

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const messagesEndRef = useRef(null);

  // Automatically scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Send a new chat message
  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    const randomUser =
      userList[Math.floor(Math.random() * userList.length)];

    const newMessage = {
      id: Date.now() + Math.random(),
      username: randomUser,
      text: trimmedMessage,
      timestamp: new Date(),
      likes: 0,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      newMessage,
    ]);

    setMessage("");
    setShowEmojiPicker(false);
  };

  // Send message when Enter is pressed
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  // Increase likes for an individual message
  const handleLike = (messageId) => {
    setMessages((previousMessages) =>
      previousMessages.map((msg) =>
        msg.id === messageId
          ? { ...msg, likes: msg.likes + 1 }
          : msg
      )
    );
  };

  // Add selected emoji to the message
  const addEmoji = (emoji) => {
    setMessage((previousMessage) => previousMessage + emoji);
  };

  return (
    <div className="app-container">

      {/* Chat Header */}
      <header className="chat-header">
        <div className="header-avatar">TC</div>

        <div className="header-info">
          <h1>Team Chat</h1>
          <p>Welcome to your team conversation</p>
        </div>

        <div className="online-status">
          <span className="status-dot"></span>
          Online
        </div>
      </header>

      {/* Chat Messages */}
      <main className="chat-area">
        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <h2>Start a conversation</h2>
            <p>
              Send your first message and start chatting
              with the team!
            </p>
          </div>
        ) : (
          <div className="message-list">
            {messages.map((msg) => (
              <article
                className="message-item"
                key={msg.id}
              >
                <div className="message-avatar">
                  {msg.username.charAt(0)}
                </div>

                <div className="message-content">
                  <div className="message-meta">
                    <span className="username">
                      {msg.username}
                    </span>

                    <span className="message-time">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="message-bubble">
                    {msg.text}
                  </div>
                </div>

                <button
                  className="like-button"
                  onClick={() => handleLike(msg.id)}
                  aria-label={`Like message by ${msg.username}`}
                  title="Like message"
                  type="button"
                >
                  <span>♡</span>
                  <span>{msg.likes}</span>
                </button>
              </article>
            ))}

            <div ref={messagesEndRef}></div>
          </div>
        )}
      </main>

      {/* Message Input */}
      <footer className="chat-footer">

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="emoji-picker">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => addEmoji(emoji)}
                aria-label={`Insert ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        <div className="input-wrapper">

          <button
            className="emoji-toggle"
            type="button"
            onClick={() =>
              setShowEmojiPicker((previous) => !previous)
            }
            aria-label="Toggle emoji picker"
            title="Choose an emoji"
          >
            😊
          </button>

          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows="1"
            aria-label="Type your chat message"
          />

          <button
            className="send-button"
            onClick={handleSend}
            disabled={!message.trim()}
            type="button"
          >
            Send <span>➤</span>
          </button>

        </div>

        <p className="input-hint">
          Press Enter to send · Shift + Enter for a new line
        </p>

      </footer>
    </div>
  );
}

export default App;
