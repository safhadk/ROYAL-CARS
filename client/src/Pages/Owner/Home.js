import React from "react";
import OwnerHome from "../../Components/owner/Home/OwnerHome.jsx";
import Header from "../../Components/owner/Header/Header";
import Banner from "../../Components/clients/Banner/Banner.jsx";

function Home() {
    return (
        <div>
            <Header />
            <Banner/>
            {/* <OwnerHome /> */}
        </div>
    );
}

export default Home;
