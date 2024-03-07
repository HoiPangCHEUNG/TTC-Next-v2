"use server";
import { BranchEta } from "../interfaces/eta";
import { extractEtaDataFromJson } from "../utils/eta";

import { env } from "process";

export const fetchMultipleRouteEtas = async (
  urlParams: string,
  keys: string[]
): Promise<BranchEta[]> => {
  const endpoint = `${env.MULTI_ROUTE_DATA_EDNPOINT}${urlParams}`;

  if (!endpoint || endpoint === "") {
    return [];
  }

  try {
    const response = await fetch(endpoint, {
      cache: "no-store",
    });
    const dataJson = await response.json();
    const data = extractEtaDataFromJson(dataJson);

    return data.filter((eta) => keys.includes(eta.id));
  } catch (error) {
    console.log(error);
    return [];
  }
};
