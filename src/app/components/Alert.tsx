"use client";

import { liveAlertNormalText } from "../constants/boilerplate";
import { getRouteLiveAlert } from "../utils/services/routeLiveAlert";

import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useMemo } from "react";
import useSWR from "swr";

export const Alert = () => {
  const { data } = useSWR("/api/live-alert", getRouteLiveAlert);

  const containerClasses =
    "relative flex items-center px-2 mt-2 w-dvw min-h-[52px] shadow-md bg-slate-800 text-sky-300 overflow-hidden";

  const calculateMarqueeTextSpeed = (messages: string[]) => {
    const totalLength = messages.reduce((acc, msg) => acc + msg.length, 0);
    const baseDuration = 15;
    const adjustedDuration = Math.max(baseDuration, totalLength / 10);
    return `${adjustedDuration}s`;
  };

  const MarqueeText = ({ messages }: { messages: string[] }) => {
    const duration = useMemo(
      () => calculateMarqueeTextSpeed(messages),
      [messages]
    );

    return (
      <div
        className="flex gap-2 items-center whitespace-nowrap animate-marquee"
        style={{ animationDuration: duration }}
      >
        {messages.map((msg, index) => (
          <span className="pr-5 w-full text-sm leading-6" key={index}>
            {msg}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={containerClasses}>
      {data && data.length > 0 ? (
        <MarqueeText messages={data} />
      ) : (
        <div className="flex items-center justify-start whitespace-nowrap text-sm space-x-2">
          <CheckCircledIcon />
          <span>{liveAlertNormalText}</span>
        </div>
      )}
    </div>
  );
};
