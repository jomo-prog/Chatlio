
function ChatWindow () {
    return(
        <div className="chatwindow">

    <div className="chat-header">
        <h3>general group</h3>
        <p>12 members online</p>
    </div>

    <div className="chat-messages">

                {/* RECEIVED */}
                <div className="message received">

                    <div className="message-bubble">
                        <strong>James</strong>
                        <p>Hello everyone 👋</p>
                    </div>

                    <span className="message-time">
                        10:40 AM
                    </span>

                </div>

                {/* SENT */}
                <div className="message sent">

                    <div className="message-bubble">
                        <p>Hey! Welcome to Chatlio.</p>
                    </div>

                    <span className="message-time">
                        10:42 AM
                    </span>

                </div>

            </div>
{/* chat input area */}

            
            <form className="chat-input-area">

                <input
                    type="text"
                    placeholder="Type a message..."
                />

                <button type="submit">
                    Send
                </button>

            </form>

        </div>
    );
}

export default ChatWindow;