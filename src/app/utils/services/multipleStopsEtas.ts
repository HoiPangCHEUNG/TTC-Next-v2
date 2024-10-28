import { extractEtaDataFromJson } from "../eta";

export const getMultipleEtasData = async (
  urlParams: string,
  keys: string[]
) => {
  try {
    const data = await fetch(
      `/api/etas?command=predictionsForMultiStops&a=ttc&${urlParams}`
    );
    const dataJson = await data.json();

    const etas = extractEtaDataFromJson(dataJson);

    return etas.filter((eta) => keys.includes(eta.id));
  } catch (error) {
    console.log("Error fetching etas:", error);
    return [];
  }
};
