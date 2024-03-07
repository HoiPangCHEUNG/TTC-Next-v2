"use server";
import { extractEtaDataFromJson, extractMessageFromJson } from "../utils/eta";

import { env } from "process";

export const fetchStatusMessage = async () => {
  const endpoint = env.TTC_STATUS_ENDPOINT;

  if (!endpoint || endpoint === "") {
    return [];
  }

  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    const dataJson = await response.json();

    return extractMessageFromJson(dataJson);
  } catch (error) {
    console.log(error);
    return [];
  }
};
