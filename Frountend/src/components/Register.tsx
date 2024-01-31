import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
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
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaPhone, FaEnvelope } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export interface FormData {
  username: string;
  email: string;
  phone: string;
  password: string;
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Toggle password visibility
  const handleShowClick = () => setShowPassword(!showPassword);

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        formData
      );
      console.log("Response:", response.data);
      setModalMessage("Registration Successful");
      setIsSuccessModalOpen(true);
    } catch (error: any) {
      console.error("Registration Error:", error.response.data.msg);
      setModalMessage(error.response.data.msg);
      setIsErrorModalOpen(true);
    }
  };

  // Close modal
  const closeModal = () => {
    setIsSuccessModalOpen(false);
    setIsErrorModalOpen(false);
  };

  // Handle form input changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Flex
      flexDirection="column"
      width="90vw"
      height="100vh"
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
        <Heading color="teal.300">Welcome</Heading> {/* Change text color */}
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="gray.700"
              boxShadow="md"
            >
              {/* Username input */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Username"
                    onChange={handleChange}
                    value={formData.username}
                    color="white"
                    name="username"
                  />
                </InputGroup>
              </FormControl>
              {/* Email input */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaEnvelope color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    color="white"
                    onChange={handleChange}
                    value={formData.email}
                    name="email"
                  />
                </InputGroup>
              </FormControl>
              {/* Phone input */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaPhone color="gray.300" />}
                  />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    color="white"
                    onChange={handleChange}
                    value={formData.phone}
                    name="phone"
                  />
                </InputGroup>
              </FormControl>
              {/* Password input */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    color="white"
                    onChange={handleChange}
                    value={formData.password}
                    name="password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {/* Submit button */}
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Sign Up
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      {/* Success Modal */}
      <Modal isOpen={isSuccessModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalMessage}</ModalBody>
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
          <ModalHeader>Error</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalMessage}</ModalBody>
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

export default Register;
