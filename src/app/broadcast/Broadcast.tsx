"use client";

import { fetchStatusMessage as fetchData } from "./actions";

import { broadcastText } from "../constants/boilerplate";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";
import { useEffect, useState } from "react";

export const Broadcast = () => {
  const [message, setMessage] = useState<string[]>([]);

  useEffect(() => {
    const fetchStatusMessage = async () => {
      const response = await fetchData();
      setMessage(response);
    };

    fetchStatusMessage();
  }, []);

  return (
    <div className="px-2 mt-2 w-dvw">
      {message.length > 0 ? (
        <Callout.Root className="relative flex overflow-x-hidden">
          <div className="w-80% animate-marquee whitespace-nowrap flex flex-row">
            {message.map((msg, index) => (
              <Callout.Text className="" key={index}>
                <span className="whitespace-pre">{msg + `          `} </span>
              </Callout.Text>
            ))}
          </div>
        </Callout.Root>
      ) : (
        <Callout.Root>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{broadcastText}</Callout.Text>
        </Callout.Root>
      )}
    </div>
  );
};
