import {
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import icon from "../assets/game.png";
// import SearchBar from "./SearchBar";
import ModeChanger from "./ModeChanger";
import { BsSearch } from "react-icons/bs";

const NavBar = () => {
  return (
    <>
      <HStack justifyContent="space-between" padding="10px">
        <Image src={icon} boxSize="50px" marginLeft={4} />
        <InputGroup>
          <InputLeftElement children={<BsSearch />} />
          <Input placeholder="Search..." borderRadius={20} />
        </InputGroup>
        <ModeChanger />
      </HStack>
    </>
  );
};

export default NavBar;
