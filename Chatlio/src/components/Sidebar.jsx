import {Home, Plus, MessageCircle, UserPlus, Users} from "lucide-react";
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";

function Sidebar ({selectedChat, onSelectChat}) {

    const [chats, setChats] = useState([]);
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("user"));


    useEffect(() => {
        async function fetchChats() {
            try {
                const token = localStorage.getItem("authToken");

                const response = await fetch("http://localhost:5000/api/chats", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },                    
                });

                 if (response.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
        return;
    }

    const data = await response.json();

    if (!response.ok) {
        alert (data.message || "failed to fetch chats");
        return;

       
    }

     setChats(data.chats);



     } catch (error) {
            console.error(error);
            alert("server error");
        }
        }
        
        fetchChats();
    }, 
         [navigate]);


         function getChatName(chat) {
            if (chat.type === "group") {
                return chat.name || "unnamed group"
            }

             const otherMember = chat.members.find(
      (member) => member.user.id !== currentUser?.id
    );

    return otherMember?.user.username || "Unknown User";
         }

        
  
 function getLastMessage () {
    const lastMessage = chats.messages?.[0];

    if (!lastMessage) {
        return "no messages yet"
    }

    return lastMessage.content || "Attachment";
 }  
    return (    
            
            <aside className = "Sidebar">
                <div className="sidebar-header">
                    <MessageCircle size={18} />
               <span>Chats</span> 
            </div>
                <nav className ="sidebar-navlinks">
                    <button className="sidebar-action">
                        <Home size={18} />
                        <span>Home</span>
                    </button>

                    <button className="sidebar-action">
                        <MessageCircle size={18}/>
                        <span>My chats</span>                        
                    </button>


                    <button className="sidebar-action">
                        <Plus size={18} />
                        <span>New chat</span>
                    </button>

                    <button className="sidebar-action">
                        <UserPlus size={18} />
                        <span>Add contact</span>
                    </button>
                    <div className="chat-list">
                        {chats.map((chat) => ( 
                            <button 
                             key={chat.id}
            className={`chat-button ${
              selectedChat?.id === chat.id ? "active" : ""
            }`}
            onClick={() => onSelectChat(chat)}
          >
            <div className="chat-avatar">
              {chat.type === "group" ? <Users size={18} /> : <MessageCircle size={18} />}
            </div>

            <div className="chat-button-text">
              <strong>{getChatName(chat)}</strong>
              <span>{getLastMessage(chat)}</span>
            </div>
          </button>
        ))}
                        
                    </div>
                </nav>
            </aside>
        
    );
}
export default Sidebar;