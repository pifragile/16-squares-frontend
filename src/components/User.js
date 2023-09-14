import Layout from "./Layout";
import { useParams } from "react-router-dom";

import UserDetail from "./UserDetail";
import CollectedOverview from "./CollectedOverview";
import CreatedOverview from "./CreatedOverview";
function User() {
    let { address } = useParams();

    if (address) {
        return (
            <Layout>
                <UserDetail address={address} />
                <CollectedOverview address={address}/>
                <CreatedOverview address={address}/>
            </Layout>
        );
    } else {
        return <Layout>Please sync your wallet.</Layout>;
    }
}

export default User;
