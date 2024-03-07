"use server";
import { BranchEta } from "../interfaces/eta";
import { extractEtaDataFromJson } from "../utils/eta";

import { env } from "process";

export const fetchEtasByStopId = async (
  stopId: string
): Promise<BranchEta[]> => {
  const endpoint = `${env.TTC_DATA_ENDPOINT}=${stopId}`;

  if (!endpoint || endpoint === "") {
    return [];
  }

  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    const data = await response.json();

    return extractEtaDataFromJson(data);
  } catch (error) {
    console.log(error);
    return [];
  }
};
