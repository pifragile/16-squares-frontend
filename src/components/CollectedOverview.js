import Layout from "./Layout";
import TokenOverview from "./TokenOverview";
import { extractTokensForOverview } from "../lib/utils";

import { useParams } from "react-router-dom";
import { CONTRACT } from "../consts";
import { useEffect, useState } from "react";
function CollectedOverview() {
    const [query, setQuery] = useState(null);
    let { address } = useParams();

    useEffect(() => {
        if (address) {
            let q =
                "v1/tokens/balances" +
                "?" +
                new URLSearchParams({
                    "token.contract": CONTRACT,
                    account: address,
                    "balance.gt": 0,
                    "sort.desc": "firstTime",
                });
            setQuery(q);
        }
    }, [address]);

    if (address) {
        console.log(query)
        return (
            <div>
                <h1>Collection</h1>
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

export default CollectedOverview;
