import React, { useState } from "react";
import Box from "@mui/material/Box";

import { Link } from "react-router-dom";

export default function AccountMenu() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredMenu, setIsHoveredMenu] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseEnterMenu = () => {
    setIsHoveredMenu(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleMouseLeaveMenu = () => {
    setIsHoveredMenu(false);
  };

  const linkStyle = {
    width: "100px",
    color: isHovered ? "white" : "#5c5470",
  };
  const linkStyleMenu = {
    width: "100px",
    color: isHoveredMenu ? "white" : "#5c5470",
  };

  return (
    <div>
      <React.Fragment>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            border: "1px solid #5c5470",
            width: "200px",
            padding: "5px",
            borderRadius: "15px",
            backgroundColor: "#e0e0e0",
            marginTop: "50px",
          }}
        >
          <a
            href="/weather"
            style={linkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Weather
          </a>
          <Link
            to={"/details"}
            style={linkStyleMenu}
            onMouseEnter={handleMouseEnterMenu}
            onMouseLeave={handleMouseLeaveMenu}
          >
            Details
          </Link>
        </Box>
      </React.Fragment>
    </div>
  );
}
