"use client";

import { EtaCardProps } from "../interfaces/eta";

import { addEta, removeEta } from "@/redux/features/eta";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { Badge, Card, Flex, IconButton, Text } from "@radix-ui/themes";

export const EtaCard = ({ eta, stopId }: EtaCardProps) => {
  const etas = useAppSelector((state) => state.etas);
  const dispatch = useAppDispatch();

  const handleBookmarkClick = () => {
    if (!etas[eta.id]) {
      dispatch(
        addEta({
          [eta.id]: {
            id: eta.id,
            routeTag: eta.routeTag,
            stopTag: eta.stopTag,
            stopId: stopId,
          },
        })
      );
    } else {
      dispatch(removeEta(eta.id));
    }
  };

  return (
    <div key={eta.id} className="relative">
      <IconButton
        onClick={handleBookmarkClick}
        radius="full"
        className="absolute -top-4 -left-4 z-10"
      >
        {etas[eta.id] ? <BookmarkFilledIcon /> : <BookmarkIcon />}
      </IconButton>
      <Card key={eta.id} className="flex items-center min-h-24">
        <Flex gap="2" align="center">
          <Badge
            radius="large"
            className="flex justify-center items-center flex-1 max-h-8 max-w-12"
          >
            <div>{eta.branchTag}</div>
          </Badge>
          <Flex className="flex-6" direction="column" gap="2">
            <Text weight="bold">{`To:` + eta.destination}</Text>
            <Text>{eta.stopTitle}</Text>
          </Flex>
          <Flex className="relative" direction="column" align="end">
            {eta.etas && eta.etas?.[0] <= 5 && (
              <span className="animate-ping absolute right-2 -top-2 inline-flex h-2 w-2 rounded-full bg-radix-yellow-900 opacity-75"></span>
            )}
            <Text className="flex-1" weight="bold">
              {eta.etas?.[0] + "m"}
            </Text>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};
