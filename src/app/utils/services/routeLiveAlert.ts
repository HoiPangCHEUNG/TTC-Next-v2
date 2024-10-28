import { ALERT_SEVERITY_TYPE } from "@/app/constants/alert";
import { LiveAlert } from "@/app/interfaces/eta";

export const getRouteLiveAlert = async () => {
  try {
    const liveAlert = await fetch("/api/live-alert");
    const liveAlertJson = (await liveAlert.json()) as LiveAlert;

    const msgs: string[] = [];
    liveAlertJson?.routes?.forEach((route) => {
      if (
        (route.severity === ALERT_SEVERITY_TYPE.CRITICAL ||
          route.severity === ALERT_SEVERITY_TYPE.MAJOR) &&
        route.title &&
        route.description
      ) {
        msgs.push(`${route.title} ${route.description}`);
      }
    });

    return Array.from(new Set(msgs));
  } catch (error) {
    console.error("Error fetching live alerts:", error);
    return [];
  }
};
