import { CONTRACT } from "../consts";
import { getToken } from "../lib/api";
import Layout from "./Layout";
import TokenOverview from "./TokenOverview";

function MarketPlace() {
    const query = `v1/contracts/${CONTRACT}/bigmaps/listings/keys?active=true`;
    async function extractTokensForMarketplace(data) {
        let tokens = [];
        for (let item of data) {
            let token = await getToken(CONTRACT, item.key);
            if (token) {
                token["price"] = parseInt(item.value);
                tokens.push(token);
            }
        }
        return tokens;
    }

    return (
        <Layout>
            <h1>Marketplace</h1>
            <TokenOverview
                query={query}
                extractTokens={extractTokensForMarketplace}
                pageLength={6}
            />
        </Layout>
    );
}

export default MarketPlace;
