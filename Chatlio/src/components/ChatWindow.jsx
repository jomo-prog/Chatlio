import { useEffect, useState } from "react";
import ChatBubble from "./ChatBubble";

function ChatWindow({ selectedChat }) {
  const [messages, setMessages] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function fetchMessages() {
      if (!selectedChat) {
        setMessages([]);
        return;
      }

      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `http://localhost:5000/api/chats/${selectedChat.id}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "failed to fetch messages");
        return;
      }

      setMessages(data.messages || []);
    }

    fetchMessages();
  }, [selectedChat]);

  if (!selectedChat) {
    return (
      <div className="chatwindow">
        <div className="chat-empty-state">
          <h3>Select a chat</h3>
          <p>Choose a conversation from the sidebar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chatwindow">
      <div className="chat-header">
        <h3>{selectedChat.type === "group" ? selectedChat.name : "Direct Chat"}</h3>
        <p>{selectedChat.members?.length || 0} members</p>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            currentUserId={currentUser?.id}
          />
        ))}
      </div>

      <form className="chat-input-area">
        <input type="text" placeholder="Type a message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatWindow;