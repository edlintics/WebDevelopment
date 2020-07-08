import React from "react";

var currentTime = new Date()

var currentYear = currentTime.getFullYear();


function footer() {
    return (
        <footer>
            <p>Copyright @ {currentYear}</p>
        </footer>
    )
}


export default footer;