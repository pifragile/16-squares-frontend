import { CONTRACT } from "../consts";
import { getToken, getTokens } from "../lib/api";
import { addCreators, addPrices } from "../lib/utils";
import Layout from "./Layout";
import TokenOverview from "./TokenOverview";

function MarketPlace() {
    const query = `v1/contracts/${CONTRACT}/bigmaps/listings/keys?active=true&sort.desc=lastLevel`;
    async function extractTokensForMarketplace(data) {
        let tokens = await getTokens(
            CONTRACT,
            data.map((e) => e.key)
        );
        tokens = await addCreators(tokens);
        tokens = await addPrices(tokens);
        tokens = tokens.sort(
            (a, b) =>
                data.findIndex((e) => e.key === a.tokenId) -
                data.findIndex((e) => e.key === b.tokenId)
        );
        return tokens;
    }

    return (
        <Layout>
            <h1>16 SQUARES - CODE ART FOR EVERYONE</h1>
            <TokenOverview
                query={query}
                extractTokens={extractTokensForMarketplace}
                pageLength={20}
            />
        </Layout>
    );
}

export default MarketPlace;
