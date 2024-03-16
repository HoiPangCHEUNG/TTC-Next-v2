"use client";

import { fetchStatusMessage as fetchData } from "./actions";

import { broadcastText } from "../constants/boilerplate";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";
import { useEffect, useState } from "react";

export const Broadcast = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const MarqueeText = ({ messages }: { messages: string[] }) => (
    <div className="w-80% animate-marquee whitespace-nowrap flex flex-row">
      {messages.map((msg, index) => (
        <Callout.Text className="" key={index}>
          <span className="whitespace-pre">{msg + `          `}</span>
        </Callout.Text>
      ))}
    </div>
  );

  useEffect(() => {
    const fetchStatusMessage = async () => {
      try {
        const response = await fetchData();
        setMessages(response);
      } catch (error) {
        console.error("Error fetching status message:", error);
      }
    };

    fetchStatusMessage();
  }, []);

  return (
    <Callout.Root className="relative flex overflow-x-hidden px-2 mt-2 w-dvw">
      {messages.length > 0 ? (
        <div>
          <div className="py-2 animate-marquee whitespace-nowrap">
            <MarqueeText messages={messages} />
          </div>
          <div className="absolute top-0 py-6 animate-marquee2 whitespace-nowrap">
            <MarqueeText messages={messages} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{broadcastText}</Callout.Text>
        </div>
      )}
    </Callout.Root>
  );
};
