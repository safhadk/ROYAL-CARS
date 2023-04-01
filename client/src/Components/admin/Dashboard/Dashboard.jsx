import React from "react";

function Dashboard() {
    return (
        <div>
            <div className="text-center m-5">
                <main class="px-3">
                    <h1>Cover your page.</h1>
                    <p class="lead">
                        Cover is a one-page template for building simple and beautiful home pages. Download, edit the text,
                        and add your own fullscreen background photo to make it your own.
                    </p>
                    <p class="lead">
                        <a href="#" class="btn btn-lg btn-light fw-bold border-white bg-white">
                            Learn more
                        </a>
                    </p>
                </main>
            </div>
            <div className=" m-5">
                <div class="list-group w-auto">
                    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                        <div class="d-flex gap-2 w-100 justify-content-between">
                            <div>
                                <h6 class="mb-0">List group item heading</h6>
                                <p class="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                            </div>
                            <small class="opacity-50 text-nowrap">now</small>
                        </div>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                        <div class="d-flex gap-2 w-100 justify-content-between">
                            <div>
                                <h6 class="mb-0">Another title here</h6>
                                <p class="mb-0 opacity-75">
                                    Some placeholder content in a paragraph that goes a little longer so it wraps to a new
                                    line.
                                </p>
                            </div>
                            <small class="opacity-50 text-nowrap">3d</small>
                        </div>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                        <div class="d-flex gap-2 w-100 justify-content-between">
                            <div>
                                <h6 class="mb-0">Third heading</h6>
                                <p class="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                            </div>
                            <small class="opacity-50 text-nowrap">1w</small>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
