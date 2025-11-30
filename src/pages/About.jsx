import React from "react";

const About = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="text-center mb-5">About Us</h1>
          <p className="lead text-center mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, dolores.
          </p>

          <div className="row text-center mb-5">
            <div className="col-md-4 mb-4">
              <h3 className="text-primary">100K+</h3>
              <p className="text-muted">Customers</p>
            </div>
            <div className="col-md-4 mb-4">
              <h3 className="text-primary">5000+</h3>
              <p className="text-muted">Products</p>
            </div>
            <div className="col-md-4 mb-4">
              <h3 className="text-primary">24/7</h3>
              <p className="text-muted">Support</p>
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h4 className="card-title">Our Mission</h4>
              <p className="card-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt asperiores praesentium consequatur accusantium expedita
                nisi nulla sunt quo nam vero?
              </p>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title">Why Choose Us?</h4>
              <ul className="list-unstyled">
                <li className="mb-2"> Premium quality products</li>
                <li className="mb-2"> Competitive pricing</li>
                <li className="mb-2"> Fast and free shipping</li>
                <li className="mb-2"> 24/7 customer support</li>
                <li className="mb-2"> Easy returns and exchanges</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
