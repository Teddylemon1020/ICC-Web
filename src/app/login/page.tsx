import React from "react";

function change() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-blue-900 flex items-center justify-center">
      {" "}
      {/* separate div to create a scrollable container */}
      <div>
        {" "}
        {/* div for heaer elements */}
        <h1>Wellcome to Rookies!!!</h1> {/* title */}
      </div>
      <div>
        <h2>Introduction to Rookies</h2>
      </div>
    </div>
  );
}

export default change;
