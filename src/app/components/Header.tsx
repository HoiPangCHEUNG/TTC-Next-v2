"use client";
import { appName } from "../constants/boilerplate";

import { openSearchDialog } from "@/redux/features/searchDialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { PlusIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, Separator } from "@radix-ui/themes";

export const Header = () => {
  const etas = useAppSelector((state) => state.etas);
  const dispatch = useAppDispatch();

  const handleAddEtaClick = () => {
    dispatch(openSearchDialog());
  };

  return (
    <div className="sticky z-30 opacity-100 w-full max-w-lg bg-radix-gray-100">
      <Flex align="center" justify="center" className="px-6 py-4 w-full">
        <div className="flex-grow font-bold text-xl">{appName}</div>
        {etas && Object.keys(etas).length > 0 && (
          <IconButton size="2" onClick={handleAddEtaClick}>
            <PlusIcon width="20" height="20" />
          </IconButton>
        )}
      </Flex>
      <Separator my="1" size="4" />
    </div>
  );
};
