"use client";

import { fetchMultipleRouteEtas as fetchData } from "./actions";

import emptyEta from "../../../public/emptyEta.svg";
import { EtaCard } from "../baseClientComponents/EtaCard";
import { Loading } from "../baseClientComponents/Loading";
import { addEtaButtonText, emptyEtaText } from "../constants/boilerplate";
import { BranchEta, EmptyEtaProps } from "../interfaces/eta";
import { SearchDialog } from "../searchDialog/SearchDialog";

import { openSearchDialog } from "@/redux/features/searchDialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Bookmark = (): JSX.Element => {
  const etas = useAppSelector((state) => state.etas);
  const [loaded, setLoaded] = useState(false);
  const [bookmarkedEtas, setBookmarkedEtas] = useState<BranchEta[]>([]);
  const [revalidateToggle, setRevalidateToggle] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddEtaClick = () => {
    dispatch(openSearchDialog());
  };

  // toggle revalidateToggle every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRevalidateToggle(!revalidateToggle);
    }, 60000);

    return () => clearInterval(interval);
  }, [revalidateToggle]);

  useEffect(() => {
    let urlParams = "";
    const etaKeys = Object.keys(etas);

    etaKeys.forEach((key) => {
      urlParams = urlParams.concat(
        `&stops=${etas[key].routeTag}|${etas[key].stopTag}`
      );
    });

    const fetchMultipleRouteEtas = async () => {
      setBookmarkedEtas(await fetchData(urlParams, etaKeys));
      setLoaded(true);
    };

    fetchMultipleRouteEtas();
  }, [etas, revalidateToggle]);

  // EtaList component
  const EtaList = ({ bookmarkedEtas }: { bookmarkedEtas: BranchEta[] }) => (
    <Flex gap="4" direction="column">
      {bookmarkedEtas.map((eta) => (
        <EtaCard key={eta.id} eta={eta} stopId={eta.stopId ?? ""} />
      ))}
    </Flex>
  );

  // EmptyEta component
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
      <SearchDialog />
      {!loaded ? (
        <div className="h-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="px-6 py-8 h-full ">
          {bookmarkedEtas.length > 0 ? (
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
