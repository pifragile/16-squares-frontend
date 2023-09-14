import { TZKT_API } from "../consts";
import { useState, useEffect } from "react";

import TokenGrid from "./TokenGrid";

function TokenOverview({ query, pageLength, extractTokens }) {
    const [tokens, setTokens] = useState(null);
    const [page, setPage] = useState(0);
    const [oldPage, setOldPage] = useState(0);
    const [maybeMore, setMaybeMore] = useState(true);
    const [update, setUpdate] = useState(1);
    const [dummy, setDummy] = useState(0);

    const loadMore = () => {
        setOldPage(page);
        setPage(Math.max(page + pageLength, 0));
    };

    useEffect(() => {
        setTokens(null);
        setPage(0)
        setOldPage(0)
        setMaybeMore(true)
        setUpdate(1)
        setDummy(Math.random())
    }, [query, pageLength, extractTokens]);

    useEffect(() => {
        async function fetchTokens() {
            if (!maybeMore) return;
            if(!query) return;
            if (tokens && oldPage === page) return;
            let separator = query.includes("?") ? "&" : "?";
            let res = await fetch(
                TZKT_API +
                    query +
                    `${separator}limit=${pageLength}&offset=${page}`
            );
            let result = await res.json();
            if (result.length > 0) {
                let extractedTokens = await extractTokens(result);
                if (tokens === null) setTokens(extractedTokens);
                else {
                    extractedTokens.forEach(
                        (t) =>
                            tokens.filter((i) => i.id === t.id).length === 0 &&
                            tokens.push(t)
                    );
                    setTokens(tokens);
                    setUpdate((u) => u + 1);
                }
                setMaybeMore(result.length === pageLength);
            } else {
                if (page === 0) setTokens([]);
                setPage(Math.max(page - pageLength, 0));
            }
        }

        fetchTokens().catch(console.error);
    }, [maybeMore, tokens, oldPage, page, dummy]);


    if (tokens && update) {
        if (tokens.length === 0) return "No tokens.";
        return <TokenGrid tokens={tokens} loadMore={loadMore} />;
    } else {
        return "Loading...";
    }
}

export default TokenOverview;
