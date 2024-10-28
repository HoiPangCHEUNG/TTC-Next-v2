import { extractEtaDataFromJson } from "../eta";

export const getSingleEtasData = async (stopId: string) => {
  try {
    console.log(stopId);
    const data = await fetch(
      `/api/etas?command=predictions&a=ttc&stopId=${stopId}`
    );
    const dataJson = await data.json();

    console.log(dataJson);
    return extractEtaDataFromJson(dataJson);
  } catch (error) {
    console.log("Error fetching etas:", error);
    return [];
  }
};
