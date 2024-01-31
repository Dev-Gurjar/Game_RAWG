import { Badge, Card, CardBody, HStack, Heading, Image } from "@chakra-ui/react";
import { Game } from "../App";
import noImage from "../assets/no-image-placeholder.webp";
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaLinux, FaAndroid } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";
import { Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface Props {
  game: Game;
}

// Function to get a cropped image URL or return a placeholder if the URL is not available
export const getCroppedImageUrl = (url: string) => {
  if (!url) return noImage;
  const target = "media/";
  const index = url.indexOf(target) + target.length;
  return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};

const GameCard = ({ game }: Props) => {
  // Map platform slugs to their corresponding icons
  const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNintendo,
    mac: FaApple,
    linux: FaLinux,
    android: FaAndroid,
    ios: MdPhoneIphone,
    web: BsGlobe,
  };

  return (
    <Card key={game.id} maxW="sm" variant="elevated">
      {/* Display the game image */}
      <Image src={getCroppedImageUrl(game.background_image)} />

      <CardBody>
        {/* Display platform icons */}
        <HStack justifyContent="space-between" marginBottom={3}>
          <HStack marginY={1}>
            {game.parent_platforms.map((platform) => (
              <Icon
                key={platform.platform.id}
                as={iconMap[platform.platform.slug]} // Use the corresponding icon for the platform
                color="blue.500"
              ></Icon>
            ))}
          </HStack>

          {/* Display Metacritic score as a badge */}
          <Badge
            colorScheme="red"
            fontSize="14px"
            paddingX={2}
            borderRadius="4px"
          >
            {game.metacritic}
          </Badge>
        </HStack>

        {/* Display game name */}
        <Heading>{game.name}</Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;
