import React from 'react'
import { useNavigate } from 'react-router-dom';

function Banner() {
  const Navigate=useNavigate()

  return (
    <div class="container-fluid p-0 mb-90">
      <div id="header-carousel" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="w-full" src="\safad\carousel-1.jpg" alt="Image" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: "900px" }}>
                <h1 className="display-1 text-white mb-md-4">     Best Rental Cars In Your Location</h1>
                <h1 className="btn btn-primary py-md-3 px-md-5 mt-2" onClick={() => {Navigate("/cars"); }} >Reserve Now</h1>
              </div>
            </div>
          </div>

          <div class="carousel-item" id="2">
            <img class="w-full" src="\safad\carousel-2.jpg" alt="Image" />
            <div class="carousel-caption flex flex-col items-center justify-center">
              <div class="p-3 max-w-900">
                <h4 class="text-white uppercase mb-3">Rent A Car</h4>
                <h1 class="text-white text-4xl md:text-6xl mb-4">Quality Cars with Unlimited Miles</h1>
                <a href="#" class="btn btn-warning py-3 px-5 mt-2">Reserve Now</a>
              </div>
            </div>
          </div>
        </div>

        <a class="carousel-control-prev" href="#header-carousel" data-slide="prev">
          <div class="btn btn-dark w-45 h-45">
            <span class="carousel-control-prev-icon mb-n2"></span>
          </div>
        </a>
        <a class="carousel-control-next" href="#header-carousel" data-slide="next">
          <div class="btn btn-dark w-45 h-45">
            <span class="carousel-control-next-icon mb-n2"></span>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Banner