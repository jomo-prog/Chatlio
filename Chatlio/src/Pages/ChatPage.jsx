import { useNavigate } from "react-router-dom";
import ChatWindow from "../Components/ChatWindow";
import Sidebar from "../Components/Sidebar";
import ChatNavbar from "../components/ChatNav-Bar";
import { useEffect, useState } from "react";



function ChatPage() {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem("authToken");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/me", {
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
    }

    checkAuth();

    const interval = setInterval(checkAuth, 10 * 1000);

    return () => clearInterval(interval);
  }, [navigate]);
 



   return (
    
    <>
      <ChatNavbar />

      <div className="chat-page">
        <Sidebar 
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}/>
        <ChatWindow 
        selectedChat={selectedChat} />
      </div>
    </>
   );


   
}

export default ChatPage;

