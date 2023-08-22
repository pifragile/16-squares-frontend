import Layout from "./Layout";
function About() {
    return (
        <Layout>
            <div className="main">
            

                <h1>About 16 SQUARES</h1>
                <p>
                    Create a piece of art with only 16 squares!<br/>
                    Created by pifragile.

                </p>
                <h1>Contract</h1>
                <p></p>
                <h1>Fees</h1>
                <p>
                    Minting fee: 0, Artist Royalties: 10%, Platform Royalties: 5%
                </p>

                <h1>Disclaimer</h1>
                <b>TL;DR USE AT YOUR OWN RISK.</b>
                <p>
                    16 SQUARES is an experimental platform. While every effort is
                    made by the team to provide a secure platform, Editart will
                    not accept any liability or responsibility for any kind of
                    damage created by the use of the platform.
                </p>
            </div>
        </Layout>
    );
}

export default About;
