import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ModeChanger = () => {

    const { colorMode, toggleColorMode } = useColorMode()


  return (
    <>
      <HStack>
        <Switch colorScheme="red" isChecked={colorMode === 'dark'} onChange={toggleColorMode}/>
        <Text whiteSpace="nowrap">Dark Mode</Text>
      </HStack>
    </>
  );
};

export default ModeChanger;
