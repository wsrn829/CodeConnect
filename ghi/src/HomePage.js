import React, { useEffect, useState } from "react";
import "./HomePage.css";

function MainPage() {
  return (
    <div className="content">
      <div className="text-content">
        <h2 className="display-8">
        The ultimate solution for automotive dealership management!
        </h2>
      </div>
      <div className="image-content">
        <img src="main.png" alt="car" className="responsive-image" />
      </div>
  </div>
  )
};

export default MainPage;