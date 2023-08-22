import Layout from "./Layout";
import { useContext, useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Cookies from "universal-cookie";
import { WalletContext, mint } from "../lib/wallet";
import { CONTRACT } from "../consts";

function Home() {
    const wallet = useContext(WalletContext);
    const cookies = new Cookies();

    const [code, setCode] = useState(
        prettyPrint(cookies.get("code")) ||
            prettyPrint(`{
  "background": "#ffffff",
  "boxes": [
    { "x": 0, "y": 0, "w": 0, "c": "#000000" },
    { "x": 0, "y": 0, "w": 0, "c": "#000000" },
    { "x": 0, "y": 0, "w": 0, "c": "#000000" },
    { "x": 0, "y": 0, "w": 0, "c": "#000000" },
    { "x": 0, "y": 0, "w": 0, "c": "#000000" },
    { "x": 0, "y": 0, "w": 0, "c": "#000000" },
    { "x": 0, "y": 0, "w": 0, "c": "#000000" },
    { "x": 0, "y": 0, "w": 0, "c": "#000000" },
    { "x": 0, "y": 0, "w": 0, "c": "#000000" },
    { "x": 0, "y": 0, "w": 0, "c": "#000000" },
    { "x": 0, "y": 0, "w": 0, "c": "#000000" },
    { "x": 0, "y": 0, "w": 0, "c": "#000000" },
    { "x": 0, "y": 0, "w": 0, "c": "#000000" },
    { "x": 0, "y": 0, "w": 0, "c": "#000000" },
    { "x": 0, "y": 0, "w": 0, "c": "#000000" },
    { "x": 0, "y": 0, "w": 0, "c": "#000000" }
  ]  
}`)
    );

    const [error, setError] = useState(null);

    function validateColor(c) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(c);
    }

    function validateData(data) {
        setError(null);
        try {
            data = JSON.parse(data);
        } catch (e) {
            setError("invalid JSON.");
            return false;
        }
        if (!validateColor(data.background)) {
            setError("invalid background color.");
            return false;
        }
        if (!data.boxes.length === 16) {
            setError("invlalid amount of boxes. you need 16");
            return false;
        }

        for (let box of data.boxes) {
            if (
                typeof box.x === "number" &&
                box.x <= 1000 &&
                typeof box.y === "number" &&
                box.y <= 1000 &&
                typeof box.w === "number" &&
                box.w <= 1000 &&
                validateColor(box.c)
            )
                continue;

            setError("invalid boxes");
            return false;
        }
        return true;
    }

    function encodeData(data) {
        data = JSON.parse(data);
        let arr = [];
        arr.push(data.background.substring(1));
        for (let box of data.boxes) {
            arr.push(box.x);
            arr.push(box.y);
            arr.push(box.w);
            arr.push(box.c.substring(1));
        }
        return btoa(JSON.stringify(arr));
    }

    function onCodeChange(e) {
        const newCode = e.target.value;
        if (!validateData(newCode)) return;
        setCode(prettyPrint(newCode));
        cookies.set("code", prettyPrint(newCode), { path: "/" });
    }
    function prettyPrint(code) {
        if (typeof code === "string") {
            return JSON.stringify(JSON.parse(code), null, 2);
        }
        return JSON.stringify(code, null, 2);
    }

    async function handleMint() {
        await mint(wallet, CONTRACT, encodeData(code));
    }

    return (
        <Layout>
            <h1>16 squares - code art for everyone</h1>
            <p>
                In the code editor below, you can define a background color and
                16 squares.<br></br>
                Each square has an x and y coordinate, a width w and a color c.
                <br></br>
                For x, y and w, use values from 0 to 1000.
                <br></br>
                <br></br>
                Let those constraints fuel your creativity!
            </p>
            <div style={{ display: "flex" }}>
                <CodeEditor
                    value={code}
                    language="json"
                    placeholder="Please enter JS code."
                    onChange={onCodeChange}
                    padding={15}
                    style={{
                        width: "30vw",
                        fontSize: 12,
                        backgroundColor: "#f5f5f5",
                        fontFamily:
                            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                    }}
                />
                <div style={{ width: "5vw" }}></div>
                {error && <div>{error}</div>}

                {error === null && (
                    <div>
                        <iframe
                            title="mint"
                            style={{
                                height: "30vw",
                                width: "30vw",
                                border: "solid black 1px",
                            }}
                            src={`http://localhost:5501?data=${encodeData(
                                code
                            )}`}
                        />
                        <br></br>
                        <button onClick={handleMint}>Mint</button>
                    </div>
                )}
            </div>
            <button
                onClick={() => {
                    cookies.remove("code");
                    window.location.reload();
                }}
            >
                clear cache
            </button>
        </Layout>
    );
}

export default Home;
