"use client";

import EmployersPage from "@/components/employers/EmployersPage";
import React from "react";

const page = () => {
  return (
    <div>
      <EmployersPage
        onStart={function (): void {
          throw new Error("Function not implemented.");
        }}
        setCurrentPage={function (
          page:
            | "home"
            | "services"
            | "howItWorks"
            | "faq"
            | "application"
            | "employers"
        ): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default page;
