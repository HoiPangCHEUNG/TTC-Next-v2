import { BranchEta, EtaPredictionJson, TransitStatus } from "../interfaces/eta";

export const extractEtaDataFromJson = (
  json: EtaPredictionJson
): BranchEta[] => {
  if (!json || !json.predictions || json.Error) return [];

  const predictions = Array.isArray(json.predictions)
    ? json.predictions
    : [json.predictions];

  return predictions
    .map((prediction) => {
      if (prediction.dirTitleBecauseNoPredictions) {
        return [
          {
            id: "",
            routeTag: prediction.routeTag,
            branchTag: "",
            stopTag: prediction.stopTag,
            stopTitle: prediction.stopTitle,
            routeTitle: "",
            destination: "",
            dirTag: "",
          },
        ];
      }

      const directions = Array.isArray(prediction.direction)
        ? prediction.direction
        : [prediction.direction];

      return directions.map((direction) => {
        const etas = Array.isArray(direction.prediction)
          ? direction.prediction
          : [direction.prediction];

        let branchTag = "";
        let dirTag = "";
        const branchEtas: number[] = etas.map((eta) => {
          branchTag =
            branchTag === "" && eta.branch !== "" ? eta.branch : branchTag;
          dirTag = dirTag === "" && eta.dirTag !== "" ? eta.dirTag : dirTag;
          return parseInt(eta.minutes);
        });

        // yes I know, dont't judge me...
        const destination =
          direction.title.split("towards").pop()?.trim() ?? "";

        return {
          id: `${dirTag}-${prediction.stopTag}`,
          routeTag: prediction.routeTag,
          branchTag,
          stopTag: prediction.stopTag,
          stopTitle: prediction.stopTitle,
          etas: branchEtas,
          destination,
          routeTitle: direction.title,
        };
      });
    })
    .flat()
    .sort((a, b) => b.branchTag.localeCompare(a.branchTag))
    .filter((eta) => eta.id !== "");
};

export const extractMessageFromJson = (json: TransitStatus) => {
  if (!json || !json.route) return [];

  return json.route
    .map((route) => {
      if (!route.message || !route.message.text) return "";
      return route.message.text;
    })
    .filter((message) => message !== "");
};
