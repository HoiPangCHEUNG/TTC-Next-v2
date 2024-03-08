"use client";

import { fetchEtasByStopId as fetchData } from "./actions";

import notFoundEta from "../../../public/notFoundEta.svg";
import { EtaCard } from "../baseClientComponents/EtaCard";
import { IconLocation } from "../baseClientComponents/Icons";
import { Loading } from "../baseClientComponents/Loading";
import {
  closeButtonText,
  etaNotFoundText,
  searchButtonText,
  searchDialogPlaceholder,
  searchDialogTitle,
} from "../constants/boilerplate";
import { BranchEta } from "../interfaces/eta";

import {
  closeSearchDialog,
  openSearchDialog,
} from "@/redux/features/searchDialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import {
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import {
  Badge,
  Button,
  Dialog,
  Flex,
  Separator,
  TextField,
} from "@radix-ui/themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export const SearchDialog = () => {
  const [open, setOpen] = useState(false);
  const [stopId, setStopId] = useState("");
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [etas, setEtas] = useState<BranchEta[]>([]);

  const searchDialog = useAppSelector((state) => state.searchDialog);
  const dispatch = useAppDispatch();

  const closeDialog = () => {
    dispatch(closeSearchDialog());
    setSearching(false);
    setEtas([]);
    setOpen(false);
    setSearched(false);
  };

  const onOpenChange = (open: boolean) => {
    open ? dispatch(openSearchDialog()) : dispatch(closeSearchDialog());
  };

  useEffect(() => {
    if (!searching) return;
    if (stopId === "") return;

    const fetchEtasByStopId = async () => {
      setEtas(await fetchData(stopId));
      setSearched(false);
      setSearching(false);
      setSearched(true);
    };

    fetchEtasByStopId();
  }, [searching, stopId]);

  useEffect(() => {
    setOpen(searchDialog.open);
  }, [searchDialog.open]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Title className="flex items-center justify-center space-x-2">
          <IconLocation />
          <div>{searchDialogTitle}</div>
        </Dialog.Title>
        <Separator my="3" size="4" />
        <TextField.Root>
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Input
            placeholder={searchDialogPlaceholder}
            onChange={(event) => setStopId(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                setSearching(!searching);
              }
            }}
          />
        </TextField.Root>
        <div
          className={`container ${
            searching || etas.length > 0 || searched
              ? "my-8 expanded"
              : "collapsed"
          }`}
        >
          {searching && <Loading />}
          {!searching &&
            searched &&
            (etas && etas.length > 0 ? (
              <Flex className="mt-4" gap="4" direction="column">
                {etas.map((eta, _) => (
                  <EtaCard key={eta.id} eta={eta} stopId={stopId} />
                ))}
              </Flex>
            ) : (
              <Flex direction="column" align="center">
                <Image priority src={notFoundEta} alt="" width={480} />
                <Badge color="orange" className="font-bold text-center">
                  <ExclamationTriangleIcon />
                  {etaNotFoundText}
                </Badge>
              </Flex>
            ))}
        </div>
        <Flex align="center" justify="center" gap="2" className="mt-4">
          <Button
            disabled={searching || stopId === ""}
            onClick={() => setSearching(!searching)}
            variant="outline"
          >
            {searchButtonText}
          </Button>
          <Button onClick={closeDialog} variant="outline">
            {closeButtonText}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
