//import "terminal.css";
import "./App.css";
import { React, createContext } from "react";
export const ModeContext = createContext(0);
export const SeriesContext = createContext([]);

function App() {
    return (
        <div
            className="App"
            style={{
                background: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                hwodtheight: "100vw",
            }}
        >
            <img
                src="/davinci.jpg"
                style={{
                    height: "min(500px, 100vw)"
                }}
            />
        </div>
    );
}

export default App;
