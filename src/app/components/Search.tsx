"use client";

import { EtaCard } from "./EtaCard";
import { IconLocation } from "./Icons";
import { Loading } from "./Loading";

import notFoundEta from "../../../public/notFoundEta.svg";
import {
  closeButtonText,
  etaNotFoundText,
  searchButtonText,
  searchDialogPlaceholder,
  searchDialogTitle,
} from "../constants/boilerplate";
import { getSingleEtasData } from "../utils/services/singleStopEtas";

import {
  closeSearchDialog,
  openSearchDialog,
} from "@/redux/features/searchDialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import {
  Cross2Icon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import {
  Badge,
  Button,
  Dialog,
  Flex,
  IconButton,
  Separator,
  TextField,
} from "@radix-ui/themes";
import Image from "next/image";
import { useState, useEffect } from "react";
import useSWR from "swr";

export const Search = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [stopId, setStopId] = useState("");
  const [searched, setSearched] = useState(false);

  const searchDialog = useAppSelector((state) => state.searchDialog);
  const dispatch = useAppDispatch();

  const {
    data: etas,
    isLoading,
    mutate,
  } = useSWR(stopId, getSingleEtasData, {
    revalidateOnFocus: false,
  });

  const closeDialog = () => {
    dispatch(closeSearchDialog());
    setOpen(false);
  };

  const onOpenChange = (open: boolean) => {
    open ? dispatch(openSearchDialog()) : dispatch(closeSearchDialog());
  };

  const handleSearch = () => {
    if (text !== "") {
      setStopId(text);
      setSearched(true);
      mutate();
    }
  };

  const reset = () => {
    setSearched(false);
    setText("");
    setStopId("");
  };

  useEffect(() => {
    setOpen(searchDialog.open);
    reset();
  }, [searchDialog.open]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Flex className="relative" align="center" justify="center">
          <Dialog.Title className="flex items-center justify-center space-x-2 flex-grow">
            <IconLocation />
            <div>{searchDialogTitle}</div>
          </Dialog.Title>
          <Dialog.Close
            onClick={closeDialog}
            className="absolute -top-2 -right-2"
          >
            <IconButton variant="ghost">
              <Cross2Icon />
            </IconButton>
          </Dialog.Close>
        </Flex>
        <Separator mb="3" size="4" />
        <TextField.Root>
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Input
            autoFocus
            placeholder={searchDialogPlaceholder}
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && text !== "") {
                handleSearch();
              }
            }}
          />
        </TextField.Root>
        <div
          className={`container ${
            isLoading || (etas && etas.length > 0) || searched
              ? "my-8 expanded"
              : "collapsed"
          }`}
        >
          {isLoading && <Loading />}
          {!isLoading && searched && etas?.length === 0 && (
            <Flex direction="column" align="center">
              <Image priority src={notFoundEta} alt="" width={480} />
              <Badge color="orange" className="font-bold text-center">
                <ExclamationTriangleIcon />
                {etaNotFoundText}
              </Badge>
            </Flex>
          )}
          {!isLoading && etas && etas.length > 0 && (
            <Flex className="mt-4" gap="4" direction="column">
              {etas.map((eta) => (
                <EtaCard key={eta.id} eta={eta} stopId={stopId} />
              ))}
            </Flex>
          )}
        </div>
        <Flex align="center" justify="center" className="mt-6">
          <Button
            disabled={isLoading || text === ""}
            onClick={handleSearch}
            variant="outline"
          >
            {searchButtonText}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
