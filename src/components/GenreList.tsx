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

interface Props {
  genres: Genre[];
}

const GenreList = (genres: Props) => {
  return (
    <>
      <Heading fontSize="2xl" marginTop={9} marginBottom={3} marginLeft={4}>Genere</Heading>
      <List marginLeft={4}>
        {genres.genres.map((genre) => (
          <ListItem paddingY="5px">
            <HStack>
              <Image
                boxSize="32px"
                borderRadius={8}
                objectFit="cover"
                src={getCroppedImageUrl(genre.image_background)}
              />
              <Button
                whiteSpace="normal"
                textAlign="left"
                // fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
                fontSize="md"
                variant="link"
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
