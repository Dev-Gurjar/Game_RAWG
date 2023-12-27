import {
  Card,
  CardBody,
  SimpleGrid,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import GameCard from "./GameCard";
// import { useEffect, useState } from "react";
// import apiclint from "../Services/apiclint";
import { Game } from "../App";

interface Props {
  games: Game[];
  error: any;
  isloding: boolean;
}

const GamesBody = ({ games, error, isloding }: Props) => {
  const skeletons = [1, 2, 3, 4, 5, 6, 7,8];
  return (
    <>
      {error && <h3>{error}Tmks</h3>}

      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding="10px"
        spacing={6}
      >
        {isloding &&
          skeletons.map((skeleton) => {
            return (
              <Card key={skeleton} borderRadius={10} overflow="hidden" maxW="sm" >
                <Skeleton height="300px" width="400px"/>
                <CardBody>
                  <SkeletonText />
                </CardBody>
              </Card>
            );
          })}

        {games.map((game) => (
          <GameCard game={game} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default GamesBody;
