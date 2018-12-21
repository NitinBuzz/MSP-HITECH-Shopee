import React, { Component } from "react";

class Footer extends React.Component {
  render() {
    return (
      <div>
        {" "}
        <p
          style={{
            borderTop: "3px solid #333333",
            margin: "1em 0",
            marginRight: "14px",
            marginLeft: "14px"
          }}
        />
        <div
          style={{
            paddingTop: "20px",
            position: "relative",
            backgroundColor: "#1A1A1B",
            color: "#ffffff",
            bottom: 0,
            height: "auto",
            textAlign: "center",
            fontFamily: "Ubuntu",
            fontWeight: "normal",
            fontSize: "15px"
          }}
        >
          <p style={{ paddingTop: "20px" }}>Thanks for visiting.</p>
          <br />
          <br />
          <p style={{ paddingBottom: "30px" }}>
            Made with{" "}
            <span style={{ color: "#dd1f57", size: "150%" }}>&hearts;</span>{" "}
            <span>by </span>
            <a href="#" target="_blank" style={{ color: "#ffffff" }}>
              Nitin
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
