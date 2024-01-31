import { Card, CardBody, SimpleGrid, Skeleton, SkeletonText } from "@chakra-ui/react";
import GameCard from "./GameCard";
import { Game } from "../App";

interface Props {
  games: Game[];
  error: any;
  isLoading: boolean; // Corrected typo in prop name
}

const GamesBody = ({ games, error, isLoading }: Props) => {
  // Array to generate skeleton loaders
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8]; // Adjusted to match the number of skeletons displayed

  return (
    <>
      {/* Display error message if there is an error */}
      {error && <h3>{error}Tmks</h3>}

      {/* Display a grid of game cards */}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} padding="10px" spacing={6}>
        {/* Display skeleton loaders while loading */}
        {isLoading &&
          skeletons.map((skeleton) => (
            <Card key={skeleton} borderRadius={10} overflow="hidden" maxW="sm">
              {/* Skeleton for game card image */}
              <Skeleton height="300px" width="400px" />

              <CardBody>
                {/* Skeleton for game card body */}
                <SkeletonText />
              </CardBody>
            </Card>
          ))}

        {/* Render game cards when data is available */}
        {games.map((game) => (
          <GameCard key={game.id} game={game} /> // Added key prop for GameCard component
        ))}
      </SimpleGrid>
    </>
  );
};

export default GamesBody;
