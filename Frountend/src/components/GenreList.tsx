import {
  Button,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
} from "@chakra-ui/react";
import { Genre } from "../App";
import { getCroppedImageUrl } from "./GameCard";
import { useState } from "react"; // Import useState hook

type FilterByGenreType = (genre: string) => void;

interface Props {
  genres: Genre[];
  filterByGenre: FilterByGenreType;
}

const GenreList = ({ genres, filterByGenre }: Props) => {
  // Destructure genres directly from Props

  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null); // State for selected genre
  const handleGenreClick = (genre: Genre) => {
    // Update selected genre state
    setSelectedGenre(genre);
    filterByGenre(genre.slug); // Update genre filter in App.tsx
  };

  return (
    <>
      {/* Heading for the genre list */}
      <Heading fontSize="2xl" marginTop={9} marginBottom={3} marginLeft={4}>
        Genre
      </Heading>

      {/* List of genres */}
      <List marginLeft={4}>
        {genres.map((genre) => (
          <ListItem key={genre.id} paddingY="5px">
            {" "}
            {/* Added key prop with unique identifier */}
            {/* Horizontal stack for image and button */}
            <HStack>
              {/* Genre image */}
              <Image
                boxSize="32px"
                borderRadius={8}
                objectFit="cover"
                src={getCroppedImageUrl(genre.image_background)}
              />

              {/* Genre name button */}
              <Button
                whiteSpace="normal"
                textAlign="left"
                fontSize="md"
                variant="link"
                fontWeight={selectedGenre && selectedGenre.id === genre.id ? 'bold' : 'normal'}
                onClick={() => handleGenreClick(genre)}
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
