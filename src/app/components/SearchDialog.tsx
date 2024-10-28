"use client";

import { EtaCard } from "./EtaCard";
import { Loading } from "./Loading";
import { Search } from "./Search";

import emptyEta from "../../../public/emptyEta.svg";
import { addEtaButtonText, emptyEtaText } from "../constants/boilerplate";
import { BranchEta, EmptyEtaProps } from "../interfaces/eta";
import { getMultipleEtasData } from "../utils/services/multipleStopsEtas";

import { openSearchDialog } from "@/redux/features/searchDialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import Image from "next/image";
import { useMemo } from "react";
import useSWR from "swr";

export const Bookmark = (): JSX.Element => {
  const etas = useAppSelector((state) => state.etas);
  const dispatch = useAppDispatch();

  const generateSWRKey = () => {
    const etaKeys = Object.keys(etas);
    if (etaKeys.length === 0) return null;

    const urlParams = etaKeys
      .map((key) => `stops=${etas[key].routeTag}|${etas[key].stopTag}`)
      .join("&");

    return { urlParams, etaKeys };
  };

  const swrKey = useMemo(() => generateSWRKey(), [etas]);

  const {
    data: bookmarkedEtas,
    isLoading,
    mutate,
  } = useSWR(
    swrKey ? [swrKey.urlParams, swrKey.etaKeys] : null,
    ([urlParams, etaKeys]) => getMultipleEtasData(urlParams, etaKeys),
    { refreshInterval: 60000 }
  );

  const handleAddEtaClick = () => {
    dispatch(openSearchDialog());
  };

  const EtaList = ({ bookmarkedEtas }: { bookmarkedEtas: BranchEta[] }) => (
    <Flex gap="4" direction="column">
      {bookmarkedEtas.map((eta) => (
        <EtaCard key={eta.id} eta={eta} stopId={eta.stopId ?? ""} />
      ))}
    </Flex>
  );

  const EmptyEta = ({
    handleAddEtaClick,
    emptyEtaText,
    addEtaButtonText,
  }: EmptyEtaProps) => (
    <div className="flex items-center justify-center flex-col w-full h-full space-y-8">
      <Image priority src={emptyEta} alt="" width={480} />
      <div className="font-bold text-lg">{emptyEtaText}</div>
      <Button size="3" onClick={handleAddEtaClick}>
        <PlusIcon width={16} height={16} />
        {addEtaButtonText}
      </Button>
    </div>
  );

  return (
    <div className="flex-grow w-full max-w-lg ">
      <Search />
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="px-6 py-8 h-full ">
          {bookmarkedEtas && bookmarkedEtas.length > 0 ? (
            <EtaList bookmarkedEtas={bookmarkedEtas} />
          ) : (
            <EmptyEta
              handleAddEtaClick={handleAddEtaClick}
              emptyEtaText={emptyEtaText}
              addEtaButtonText={addEtaButtonText}
            />
          )}
        </div>
      )}
    </div>
  );
};
