"use client";
import React from "react";
import "./progress.css";
import Template from "./templates";

const Progress = () => {
  return (
    <div className="progressbar-container">
      <div className="progressbar">
        <Template >
          <div></div>
        </Template>
      </div>
    </div>
  );
};

export default Progress;
