import { loadingText } from "../constants/boilerplate";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        <div className="relative flex h-16 w-16">
          <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-radix-yellow-900 opacity-75"></div>
          <div className="relative inline-flex rounded-full h-16 w-16 bg-radix-yellow-900"></div>
        </div>
        <div className="mt-8 font-bold text-lg">{loadingText}</div>
      </div>
    </div>
  );
};
