import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 50,
    }}
    spin
  />
);

function Spinner() {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: "999",
        background: "#ffffff63",
        width: "100vw",
        height: "100%",
        minHeight: "1166px",
      }}
    >
      <Spin
        style={{
          justifyContent: "center",
          display: "flex",
          height: "100vh",
          alignItems: "center",
          left: "45%",
          top: "45%",
          position: "absolute",
        }}
        indicator={antIcon}
      />
    </div>
  );
}

export default Spinner;
