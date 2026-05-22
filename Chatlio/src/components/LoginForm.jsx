import { useState } from "react";
import { useNavigate } from "react-router-dom";




function LoginForm () {


    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("")
    const navigate = useNavigate();

    async function handleSubmit(e) {
    e.preventDefault();
 try {
    const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if(!response.ok) {
                alert (data.message);
                return;
            }

            localStorage.setItem("authToken", data.token);
              localStorage.setItem("user", JSON.stringify(data.user));


            console.log(data);

            navigate("/ChatPage");
            
 }catch (error) {
    console.error(error);
    alert("server error");
    
}

    
}



    return (


        
        <div className="login-page">
            <h2>Log into chatlio</h2>
            <form className="login-form"
            onSubmit={handleSubmit}>

                <input 
                type = "email"
                placeholder = "enter your email"
                value = {email}
                onChange={(e) => setEmail(e.target.value)} />

                <input 
                type = "password"
                placeholder = "enter your password"
                value = {password}
                onChange={(e) => setPassword(e.target.value)} />

                <button 
                type= "submit">Login </button>
                




            </form>
        </div>

    );
}

export default LoginForm;