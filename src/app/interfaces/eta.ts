import { ALERT_SEVERITY_TYPE } from "../constants/alert";

// Interface for Eta store inside localStorage
export interface BookmarkEta {
  id: string;
  // identifier for the routes, routes could have different branch such as 60`A`, 60`B`
  routeTag: string;
  // identifier for stops
  stopId?: string;
  // there are multiple lines and even branches inside a stop, to identify the specific line we need to use the stopTag
  stopTag: string;
}

// Raw JSON response from the API
export interface BranchEta extends BookmarkEta {
  branchTag: string;
  stopTitle: string;
  destination: string;
  etas?: number[];
  routeTitle: string;
}

interface EtaPredictionDetail {
  branch: string;
  dirTag: string;
  minutes: string;
  seconds: string;
}

interface EtaDirectionDetail {
  title: string;
  prediction: EtaPredictionDetail | EtaPredictionDetail[];
}

interface PredictioDetail {
  direction: EtaDirectionDetail | EtaDirectionDetail[];
  dirTitleBecauseNoPredictions?: string;
  routeTag: string;
  routeTitle: string;
  stopTag: string;
  stopTitle: string;
}

export interface EtaPredictionJson {
  copyright: string;
  predictions: PredictioDetail | PredictioDetail[];
  Error?: {
    content: string;
  };
}

interface RouteStatus {
  tag: string;
  message: {
    text: string;
  };
}

export interface TransitStatus {
  copyright: string;
  route: RouteStatus[];
}

export interface LiveAlert {
  total: number;
  routes?: {
    title: string;
    description: string;
    severity: ALERT_SEVERITY_TYPE;
  }[];
}

export interface EtaCardProps {
  eta: BranchEta;
  stopId: string;
}

export interface EmptyEtaProps {
  handleAddEtaClick: () => void;
  emptyEtaText: string;
  addEtaButtonText: string;
}
