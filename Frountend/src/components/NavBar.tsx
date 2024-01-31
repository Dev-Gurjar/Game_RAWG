import { Button, HStack, Image, Input, InputGroup, Link, InputLeftElement, Stack, Text } from "@chakra-ui/react";
import icon from "../assets/game.png";
import ModeChanger from "./ModeChanger";
import { BsSearch } from "react-icons/bs";
import { useState } from "react"; // Import useState hook
import { FormData } from "./Register";
const NavBar = () => {

  // State to store user information
  const [user, setUser] = useState<FormData>({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  // Dummy login function for demonstration purposes
  const handleLogin = () => {


    setUser({ username: "Jhon",
    email: "poimno@gmaill.com",
    phone: "938459083",
    password: "oidhvhj", }); // Example user information
  };

  // Dummy logout function for demonstration purposes
  // const handleLogout = () => {
  //   // Perform logout logic here and reset user state
  //   setUser(null);
  // };

  return (
    <>
      <HStack justifyContent="space-between" padding="10px">
        <Link href="/">
          <Image src={icon} boxSize="80px" marginLeft={2} />
        </Link>
        <InputGroup ml={180} mr={20}>
          <InputLeftElement children={<BsSearch />} />
          <Input placeholder="Search..." borderRadius={20} />
        </InputGroup>
        <Stack direction="row" spacing={4} mr={7}>
          {user.username ? (
            // If user is logged in, display username
            <Text color="white" marginRight={4}>{user.username}</Text>
          ) : (
            // If user is not logged in, display login and registration buttons
            <>
              <Link href="/login">
                <Button colorScheme="teal" variant="outline" onClick={handleLogin}>
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button colorScheme="teal" variant="solid">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </Stack>
        <ModeChanger />
      </HStack>
    </>
  );
};

export default NavBar;
