import {
  Card,
  CardBody,
  Center,
  SimpleGrid,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import GameCard from "./GameCard";
import { Game } from "../App";

interface Props {
  games: Game[];
  error: any;
  isLoading: boolean;
}

const GamesBody = ({ games, error, isLoading }: Props) => {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      {error && <h3>{error}Tmks</h3>}

      <Center padding={5}>
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          padding="10px"
          spacing={6}
        >
          {isLoading &&
            skeletons.map((skeleton) => (
              <Card
                key={skeleton}
                borderRadius={10}
                overflow="hidden"
                maxW="sm"
              >
                <Skeleton height="300px" width="400px" />
                <CardBody>
                  <SkeletonText />
                </CardBody>
              </Card>
            ))}

          {/* Render game cards from filteredData */}
          {!isLoading &&
            games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
        </SimpleGrid>
      </Center>
    </>
  );
};

export default GamesBody;
