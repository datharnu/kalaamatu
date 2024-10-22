import React from "react";
import Announcement from "./components/announcement";
import Navbar from "@/components/shared/navbar";
import HeroPage from "./components/hero";

export default function Homepage() {
  return (
    <div>
      <Announcement />
      <Navbar />
      <HeroPage />
    </div>
  );
}
