import { useState } from "react";
import { CONTRACT } from "../consts";
import { getToken, getTokens } from "../lib/api";
import { addCreators, addPrices } from "../lib/utils";
import Layout from "./Layout";
import TokenOverview from "./TokenOverview";
import QuerySelector from "./QuerySelector";

function MarketPlace() {
    const queries = {
        listed: `v1/contracts/${CONTRACT}/bigmaps/listings/keys?active=true&sort.desc=lastLevel`,
        all: `v1/tokens?contract=${CONTRACT}&sort.desc=tokenId`,
    };

    const [query, setQuery] = useState(queries['listed']);

    function handleChange(e) {
        setQuery(queries[e.target.value]);
    }

    async function extractTokensForMarketplace(data) {
        let tokens;

        if ("metadata" in data[0]) tokens = data;
        else {
            tokens = await getTokens(
                CONTRACT,
                data.map((e) => e.key)
            );
            tokens = tokens.sort(
                (a, b) =>
                    data.findIndex((e) => e.key === a.tokenId) -
                    data.findIndex((e) => e.key === b.tokenId)
            );
        }
        tokens = await addCreators(tokens);
        tokens = await addPrices(tokens);
        return tokens;
    }

    return (
        <Layout>
            <h1>16 SQUARES - CODE ART FOR EVERYONE</h1>
            <QuerySelector handleChange={handleChange} />
            <br/>
            <br/>
            <TokenOverview
                query={query}
                extractTokens={extractTokensForMarketplace}
                pageLength={21}
            />
        </Layout>
    );
}

export default MarketPlace;
