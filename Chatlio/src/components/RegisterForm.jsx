import { useState } from "react";
import { useNavigate } from "react-router-dom";


function RegisterForm () {

    const [username, setName] = useState ("");
        const [email, setEmail] = useState ("");
        const [password, setPassword] = useState ("");

       async function handleSubmit(e) {
            e.preventDefault();

            try{
            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
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

            console.log(data);

            navigate("/ChatPage")
        } catch (error) {
            console.error(error);
            alert(error)

        }

        }

        
        const navigate = useNavigate();

        return (
            <div className = "register-page">
                <form 
                className = "register-form"
                onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    <input
                    
                    type = "text"
                    placeholder="Please enter your name"
                    value = {username}
                    onChange={(e) => setName(e.target.value)}


                    />

                    {/* email input */}
                    <input
                    type = "email"
                    placeholder="Please enter your email"
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}


                    />

                    {/* password input */}
                     <input
                    type = "password"
                    placeholder="Please enter your password"
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}


                    />
                    <div className="auth-switch">
                        <span>Already have an account?</span>
                         <button
                         onClick={() => navigate("/login")}
                        type="button"
                        className="login-link"
                    >
                        Log in
                    </button>
                    </div>
                    

                    
                    <button type="submit">
                        create Account
                    </button>


                </form>

            </div>
        )


}
 export default RegisterForm;