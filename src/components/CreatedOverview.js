import Layout from "./Layout";
import TokenOverview from "./TokenOverview";
import { extractTokensForOverview } from "../lib/utils";

import { useParams } from "react-router-dom";
import { CONTRACT } from "../consts";
import { useEffect, useState } from "react";
function CreatedOverview() {
    const [query, setQuery] = useState(null);
    let { address } = useParams();

    useEffect(() => {
        if (address) {
            let q =
                "v1/tokens" +
                "?" +
                new URLSearchParams({
                    "contract": CONTRACT,
                    'firstMinter': address,
                    "sort.desc": "firstTime",
                });
            setQuery(q);
        }
    }, [address]);

    if (address) {
        return (
            <div>
                <h1>Creations</h1>
                <TokenOverview
                    query={query}
                    pageLength={6}
                    extractTokens={extractTokensForOverview}
                ></TokenOverview>
            </div>
        );
    } else {
        return <Layout>Please sync your wallet.</Layout>;
    }
}

export default CreatedOverview;
