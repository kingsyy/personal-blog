import { TextsParam } from "@/models/params";
import React from "react";

const InsightRoll = ({ texts }: TextsParam) => {
  return (
    <div className="w-full bg-accent dark:bg-accentDark text-light dark:text-dark whitespace-nowrap overflow-hidden">
      <div className="animate-roll  w-full py-2 sm:py-3 flex items-center justify-center capitalize font-semibold tracking-wider text-sm sm:text-base">
        {texts.map((text, index, insights) => (
          <div key={index}>
            {text} <span className="px-4">{insights.length - 1 === index ? "" : "|"}</span>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightRoll;