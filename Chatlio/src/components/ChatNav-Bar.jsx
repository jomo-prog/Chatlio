import { useState } from "react";

function ChatNavbar() {

    const [open, setOpen] = useState(false);

    const username = "James";
    const profileImage = "";

    return (
        <nav className="chat-navbar">

            <div className="chat-navbar-logo">
                Chatlio
            </div>

            <div className="chat-navbar-right">

                {/* PROFILE ICON */}

                <div className="profile-avatar">

                    {profileImage ? (

                        <img
                            src={profileImage}
                            alt="profile"
                        />

                    ) : (

                        <span>
                            {username.charAt(0).toUpperCase()}
                        </span>

                    )}

                </div>

                {/* HAMBURGER */}

                <div className="chat-navbar-menu">

                    <button
                        className="hamburger-btn"
                        onClick={() => setOpen(!open)}
                    >
                        ☰
                    </button>

                    {open && (
                        <div className="dropdown-menu">
                            <p>Profile</p>
                            <p>Settings</p>
                            <p>Logout</p>
                        </div>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default ChatNavbar;