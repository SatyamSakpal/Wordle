import wordle_logo from '../assets/wordle-logo.webp'

// Define the Navbar component
export default function Navbar() {
    return (
        <>  
            {/* Render a navigation element with the logo image */}
            <nav>
                <img src={wordle_logo} alt="wordle_logo" />
            </nav>
        </>
    )
}