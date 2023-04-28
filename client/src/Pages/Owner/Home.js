import React from "react";
import Header from "../../Components/owner/Header/Header";
import Banner from "../../Components/clients/Banner/Banner.jsx";
import Dashboard from "../../Components/owner/Home/Dashboard";

function Home() {
    return (
        <div>
            <Header />
            {/* <Banner/> */}
            <Dashboard/>
        </div>
    );
}

export default Home;
