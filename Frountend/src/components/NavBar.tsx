import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Select,
  Tooltip,
  Spacer,
  Heading,
  PopoverTrigger,
  PopoverCloseButton,
  PopoverContent,
  PopoverArrow,
  Popover,
  PopoverBody,
  PopoverHeader,
  Tfoot,
  Td,
  Tr,
  Tbody,
  Th,
  Table,
  TableContainer,
  TableCaption,
  Thead,
} from "@chakra-ui/react";
import icon from "../assets/game.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";
import genres from "../data/genres";
import platforms from "../data/platforms";
import ModeChanger from "./ModeChanger";
import { FormData } from "./Register";

interface SetUserDataFunction {
  (userData: {
    username: string;
    email: string;
    phone: string;
    password: string;
  }): void;
}
interface Props {
  setUserData: SetUserDataFunction;
  setSearchQuery: (query: string) => void;
  filterByGenre: (genre: string) => void;
  filterByPlatform: (platform: string) => void;
  isLoggedIn: boolean;
  userData: FormData | null;
  setLoginInfo: (isLoggedIn: boolean) => void;
}

const NavBar = ({
  setSearchQuery,
  filterByGenre,
  filterByPlatform,
  isLoggedIn,
  userData,
  setLoginInfo,
  setUserData,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleSortByGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
    filterByGenre(event.target.value);
  };

  const handleSortByPlatform = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    filterByPlatform(event.target.value);
  };

  const handleLogout = () => {
    // Clear the user's authentication state
    setLoginInfo(false); // Update the isLoggedIn state to false
    setUserData({
      // Clear the user data
      username: "",
      email: "",
      phone: "",
      password: "",
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <>
      {/* Desktop Navbar */}
      <HStack
        justifyContent="space-between"
        padding="10px"
        display={{ base: "none", md: "flex" }}
      >
        <Link to="/">
          <Image src={icon} boxSize="80px" />
        </Link>

        {location.pathname !== "/login" &&
          location.pathname !== "/register" && (
            <InputGroup width="50%">
              <InputLeftElement children={<BsSearch />} />
              <Input
                placeholder="Search..."
                borderRadius={20}
                onChange={handleSearchQueryChange}
              />
            </InputGroup>
          )}
        <Stack direction="row" spacing={4}>
          {!isLoggedIn ? (
            <HStack>
              <Link to="/login">
                <Button colorScheme="teal" variant="outline">
                  Log In
                </Button>
              </Link>
              <Link to="/register">
                <Button colorScheme="teal" variant="solid">
                  Sign Up
                </Button>
              </Link>
            </HStack>
          ) : (
            <HStack>
              <Heading as="h3" size="md" color="teal.300">
                Welcome,{" "}
              </Heading>
              <Popover>
                <PopoverTrigger>
                  <Button colorScheme="purple" variant="outline">
                    {userData?.username || "whoareyou"}!
                  </Button>
                </PopoverTrigger>
                <PopoverContent width="400px">
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>
                    chutiya ---- {userData?.username || "whoareyou"}!
                  </PopoverHeader>
                  <PopoverBody>
                    <TableContainer>
                      <Table variant="striped" colorScheme="cyan">
                        <TableCaption>
                          You are tokenized | you can refresh
                        </TableCaption>
                        <Thead>
                          <Tr>
                            <Th fontSize={16}>Name </Th>
                            <Th fontSize={16}>
                              {userData?.username || "whoareyou"}
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td>Email </Td>
                            <Td>{userData?.email || "whoareyou"}</Td>
                          </Tr>
                          <Tr>
                            <Td>Phone Nu.</Td>
                            <Td>{userData?.phone || "whoareyou"}</Td>
                          </Tr>
                          <Tr>
                            <Td>Password</Td>
                            <Td>{userData?.password || "whoareyou"}</Td>
                          </Tr>
                        </Tbody>
                        <Tfoot></Tfoot>
                      </Table>
                    </TableContainer>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Button colorScheme="teal" variant="solid" onClick={handleLogout}>
                Log Out
              </Button>
            </HStack>
          )}

          <ModeChanger text="Dark" />
        </Stack>
      </HStack>

      {/* Mobile Navbar - Hamburger Icon */}
      <HStack display={{ base: "flex", md: "none" }} padding={3}>
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && (
            <Select placeholder="Sort by genre" onChange={handleSortByGenre}>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.slug}>
                  {genre.name}
                </option>
              ))}
            </Select>
          )}

        {location.pathname !== "/login" &&
          location.pathname !== "/register" && (
            <Select
              placeholder="Sort by platform"
              onChange={handleSortByPlatform}
            >
              {platforms.map((platform) => (
                <option key={platform.id} value={platform.slug}>
                  {platform.name}
                </option>
              ))}
            </Select>
          )}
        <Spacer />

        <Button onClick={onOpen} padding={0}>
          <GiHamburgerMenu />
        </Button>
        <Tooltip placement="right-end">
          <ModeChanger text="" />
        </Tooltip>
      </HStack>

      {/* Drawer */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <Link to="/" onClick={onClose}>
                <Text>Home</Text>
              </Link>
              {isLoggedIn ? (
                <Button colorScheme="teal" onClick={handleLogout}>
                  Log Out
                </Button>
              ) : (
                <>
                  <Link to="/login" onClick={onClose}>
                    <Text>Login</Text>
                  </Link>
                  <Link to="/register" onClick={onClose}>
                    <Text>Register</Text>
                  </Link>
                </>
              )}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default NavBar;
