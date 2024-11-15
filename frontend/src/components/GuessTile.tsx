import React from "react"

// Define the prop types for the GuessTile component
type GuessTileProps = {
    char: string, 
    color:string
}

// Define the GuessTile functional component
const GuessTile: React.FC<GuessTileProps> = ({char, color}) => {
    return (
        <>
            {/* Render a div with the class 'guess-tile' and dynamically applied color */}
            <div className={`guess-tile ${color}`}>{char}</div>
        </>
    )
}

export default GuessTile