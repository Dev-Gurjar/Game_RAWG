import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { FormData } from "./Register";
import { useNavigate } from 'react-router-dom'; 
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Link,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

interface LoginData {
  email: string;
  password: string;
}

interface SetUserDataFunction {
  (userData: { username: string; email: string; phone: string; password: string }): void;
}
interface Prop{
  setUserData: SetUserDataFunction;
  setLoginInfo: (isLoggedIn : boolean) => void;
}

const Login = ({setUserData, setLoginInfo}:Prop) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); 
  const fitUser = (user: FormData | null) => {
    if (user) {
      setUserData({
        username: user.username,
        email: user.email,
        phone: user.phone,
        password: "xConfidntialx",
      });
    }
  };

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://172.31.47.98:3000/login",
        loginData
      );
      const { token, user } = response.data;
      fitUser(user);
      setLoginInfo(true);
      navigate('/'); 
      
      // Store token and user information in local storage or session cookie
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      console.log(response)
      console.log("Logged in as:", user.username);
      console.log("Email:", user.email);
      console.log("Phone:", user.phone);
  
      // Redirect or perform other actions as needed
    } catch (error: any) {
      console.error("Login Error:", error.response.data);
      setLoginInfo(false);
      setModalMessage(error.response.data);
      setIsErrorModalOpen(true);
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (token && userString) {
      const user = JSON.parse(userString);
      fitUser(user);
      setLoginInfo(true);
      navigate('/');
    }
  }, []); 

  const closeModal = () => {
    setIsSuccessModalOpen(false);
    setIsErrorModalOpen(false);
  };

  return (
    <Flex
      flexDirection="column"
      width="100vw"
      height="85vh"
      backgroundColor="gray.900"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.300">Welcome, </Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="gray.700"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    onChange={handleChange}
                    type="email"
                    placeholder="Email Address"
                    color="white"
                    name="email"
                    value={loginData.email}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    color="white"
                    name="password"
                    value={loginData.password}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right" color="white">
                  <Link href="#" color="teal.300">Forgot Password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>

      {/* Success Modal */}
      <Modal isOpen={isSuccessModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login Success</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalMessage}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Error Modal */}
      <Modal isOpen={isErrorModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login Error</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalMessage}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Login;
