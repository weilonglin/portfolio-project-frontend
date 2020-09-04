import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <navBar>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/feed">Feed</NavLink>
      <NavLink to="/profile">My Profile</NavLink>
    </navBar>
  );
}
