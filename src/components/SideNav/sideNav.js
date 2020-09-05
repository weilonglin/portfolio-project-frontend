import React from "react";
import TopBar from "./TopBar";
import "./sideNav.css";
import Chat from "../Chat/Chat";

export default function SideNav() {
  return (
    <div class="sidenav">
      <TopBar />
      <Chat />
      <button className="signOutButton">Sign out</button>
    </div>
  );
}
