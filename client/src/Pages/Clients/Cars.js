import React from "react";
import Header from "../../Components/clients/Header/Header";
import CarLists from "../../Components/clients/CarLists/CarLists";
import Search from "../../Components/clients/Search/Search";

function Cars() {
    return (
        <div>
            <Header />
            <Search/>
            <CarLists/>
        </div>
    );
}

export default Cars;
