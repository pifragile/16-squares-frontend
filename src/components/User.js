import Layout from "./Layout";
import TokenOverview from "./TokenOverview";
import { extractTokensForOverview } from "../lib/utils";

import { useParams } from "react-router-dom";

import UserDetail from "./UserDetail";
import { SeriesContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { CONTRACT } from "../consts";
function User() {
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
        return (
            <Layout>
                <UserDetail address={address} />
                <h1>Collection</h1>
                <TokenOverview
                    query={query}
                    pageLength={6}
                    extractTokens={extractTokensForOverview}
                ></TokenOverview>
            </Layout>
        );
    } else {
        return <Layout>Please sync your wallet.</Layout>;
    }
}

export default User;
