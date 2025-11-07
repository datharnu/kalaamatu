import React from "react";
import { Input } from "../ui/input";
import PaymentIcons from "./PaymentIcons";

export default function Footer() {
  return (
    <div className="mb-10">
      <hr className="h-px my-7 bg-[rgba(var(--color-foreground),0.1)] border-0 dark:bg-[rgba(var(--color-foreground),0.2)]" />
      <div className="text-[rgba(var(--color-foreground),1)] flex flex-col justify-center items-center gap-4 ">
        <p className="">Subscribe to our emails</p>
        <Input
          type="email"
          placeholder="Email"
          className="border-[rgba(var(--color-foreground),0.5)] text-md tracking-wider  text-[rgba(var(--color-foreground),0.75)] py-5 w-[50vw]"
        />
      </div>
      <hr className="h-px my-7 bg-[rgba(var(--color-foreground),0.1)] border-0 dark:bg-[rgba(var(--color-foreground),0.2)]" />
      <PaymentIcons />

      <p className="text-[rgba(var(--color-foreground),0.75)] text-xs text-center tracking-wider mt-5">
        © 2024, Boots.and.more Powered by Rentville
      </p>
    </div>
  );
}
