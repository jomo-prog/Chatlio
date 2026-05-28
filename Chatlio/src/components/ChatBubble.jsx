function ChatBubble({message, currentUserId}) {

    const isMine = message.senderId.id === currentUserId;
    const time = new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"

    })
    return(

        <div className={`message ${isMine ? "sent" : "received"}`}>
  <div className="message-bubble">
    {!isMine && <strong>{message.sender?.username}</strong>}
    <p>{message.content}</p>
  </div>

  <span className="message-time">{time}</span>
</div>


    );
}

export default ChatBubble;