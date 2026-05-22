import { useNavigate } from "react-router-dom";

    

function HeroSection() {
    const navigate = useNavigate();
    return (
        <section className= "hero">

            <h1>Private Messaging Made Simple</h1>

            <p>
                Chat securely using unique chat addresses.
            </p>

            <button onClick={() => navigate("/register")}>
                Get Started
            </button> 
        </section>
    );

}

    export default HeroSection;
