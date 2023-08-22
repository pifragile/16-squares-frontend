import SyncButton from "./SyncButton";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { WalletContext } from "../lib/wallet";

function Layout({ children, favicon = "/favicon.png" }) {
    const client = useContext(WalletContext).client;
    const [activeAccount, setActiveAccount] = useState(null);
    useEffect(() => {
        const func = async () => {
            const account = await client.getActiveAccount();
            if (account) {
                setActiveAccount(account.address);
            }
        };
        func();
    }, [client]);

    return (
        <div
            style={{
                paddingLeft: "10vw",
                paddingRight: "10vw",
                minHeight: "100vh",
                margin: 0,
                display: "grid",
                gridTemplateRows: "auto 1fr auto",
            }}
        >
            <header>
                <div className="terminal-nav">
                    <nav className="terminal-menu">
                        <ul>
                        <li key="Home">
                                <span className="menu-item">
                                    <Link to="/">Home</Link>
                                </span>
                            </li>
                            <li key="Series">
                                <span className="menu-item">
                                    <Link to="/marketplace">Marketplace</Link>
                                </span>
                            </li>
                            <li key="MyCollection">
                                <span className="menu-item">
                                    <Link to={`/user/${activeAccount}`}>
                                        My collection
                                    </Link>
                                </span>
                            </li>

                            <li key="About">
                                <span className="menu-item">
                                    <Link to="/about">About</Link>
                                </span>
                            </li>
                            <li>
                                {" "}
                                <SyncButton />
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div
                className="content"
                style={{
                    marginTop: "5vh",
                }}
            >
                {children}
            </div>
            <footer>
                <br />
                Built with{" "}
                <a href="https://tzkt.io" target="_blank" rel="noreferrer">
                    TzKT API
                </a>
            </footer>
        </div>
    );
}

export default Layout;
