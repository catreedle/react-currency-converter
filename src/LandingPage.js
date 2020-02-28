import React from "react"
import { directive } from "@babel/types";
import { Link } from "react-router-dom"

function LandingPage() {
    return (
        <div>
            <h1>
            akhirnya Landing Page
            </h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/exchange">Currency Converter</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default LandingPage