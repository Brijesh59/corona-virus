import React from "react";
import Loader from "react-loader";

export default function App(props) {
  return (
    <div style={{ textAlign: 'center'}}>
      <Loader
        loaded={props.isLoaded}
        lines={13}
        length={20}
        width={10}
        radius={30}
        corners={1}
        rotate={0}
        direction={1}
        color="#0066ff"
        speed={1}
        trail={60}
        shadow={false}
        hwaccel={true}
        className="spinner"
        zIndex={2e9}
        top="50%"
        left="50%"
        scale={1.0}
        loadedClassName="loadedContent"
      />
    </div>
  );
}


