import React from "react";
import Announcement from "./components/announcement";
import Navbar from "@/components/shared/navbar";
import HeroPage from "./components/hero";
import NewArrivals from "./components/new-arrivals";

export default function Homepage() {
  return (
    <div>
      <HeroPage />
      <NewArrivals />
    </div>
  );
}
