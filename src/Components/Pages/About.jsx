import React from 'react';

function About() {
  return (
    <div className="container my-5 py-5" style={{ maxWidth: 800 }}>
      <h1 className="fw-bold text-center mb-4">About PIXEL</h1>
      <p className="fs-5 text-center mb-5 text-muted">
        Welcome to PIXEL—your destination for high-performance gaming gear, honest reviews, and the latest in mechanical keyboard and tech innovation. 
      </p>
      <h4 className="fw-semibold mt-4 mb-3">Our Story</h4>
      <p>
        PIXEL was founded by passionate engineers and gamers who wanted a curated, thoughtfully built hub for not just buying top-tier gaming hardware, but also learning about the tech behind it. We believe shopping for the best gear should be simple, transparent, and even fun.
      </p>
      <h4 className="fw-semibold mt-4 mb-3">Our Mission</h4>
      <p>
        We are obsessed with quality, community, and empowering you to make confident choices. We work directly with the world’s top brands and keep our ear to the ground so you don’t have to. Whether you’re a pro, a beginner, or just a fan—PIXEL is your launchpad for all things gaming and tech.
      </p>
      <div className="text-center mt-5">
        <strong>Thank you for being part of our journey!</strong>
      </div>
    </div>
  );
}

export default About;
