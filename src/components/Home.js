import Layout from "./Layout";
import { useContext, useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Cookies from "universal-cookie";
import { WalletContext, mint } from "../lib/wallet";
import { CONTRACT } from "../consts";
import { resolveIpfsSketches } from "../lib/utils";

function Home() {
    const wallet = useContext(WalletContext);
    const cookies = new Cookies();

    const [code, setCode] = useState(
        prettyPrint(cookies.get("code")) ||
            prettyPrint(`{
  "background": "#ffffff",
  "squares": [
    { "x": 300, "y": 300, "w": 400, "c": "#000000" },
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

    function validateCoords(c) {
        return typeof c === "number" && c <= 1000 && c >= 0;
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
        if (!data.squares.length === 16) {
            setError("invlalid amount of boxes. you need 16");
            return false;
        }

        for (let box of data.squares) {
            if (
                validateCoords(box.x)&&
                validateCoords(box.y)&&
                validateCoords(box.w)&&
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
        for (let box of data.squares) {
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
                "art lives from constraints and dies from freedom" - leonardo da
                vinci
            </p>
            <br />
            <p>
                minting is free | only gas and storage cost | your squares are
                stored on-chain
            </p>
            <br />
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
                    <div style={{ height: "35vw", width: "35vw" }}>
                        <iframe
                            title="mint"
                            style={{
                                height: "35vw",
                                width: "35vw",
                                border: "solid black 1px",
                            }}
                            src={`${resolveIpfsSketches(
                                "ipfs://QmNjRXvsqn3XM89F6zNDRqtQHSTp3cmnQPGXkPeYuoLjX2"
                            )}?data=${encodeData(code)}`}
                        />
                        <br></br>
                        <button onClick={handleMint}>Mint</button>
                        <p>
                            In the code editor, you can define a background
                            color and 16 squares. Each square has an x and y
                            coordinate, a width w and a color c. Use values from
                            0 to 1000.
                            <br></br>
                            <br></br>
                            Let those constraints fuel your creativity!
                            <br></br>
                            <br></br>
                            <small>
                                mints will show up in "my collection" | you can
                                then sell them on the marketplace
                            </small>
                        </p>
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
