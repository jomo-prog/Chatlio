

function Sidebar () {
    return (    
            
            <aside className = "Sidebar">
                <div className="sidebar-header">
                Chats
            </div>
                <nav className ="sidebar-navlinks">
                    <ul>
                         <li>
                            <button className="homebutton">Home</button></li>
                        <li>My Chats</li>
                        <li>New chat</li>
                        <li>Add Contact</li>                       
                        {/* here will be recent contacts by the user and groups, he/she is in */}
                        <li>General Group</li>
                        <li>Dev Team</li>
                        <li>Project Updates</li>
                    </ul>
                </nav>
            </aside>
        
    )
}

export default Sidebar;