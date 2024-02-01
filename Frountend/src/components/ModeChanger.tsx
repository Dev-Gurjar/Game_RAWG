import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

interface Prop{
  text:string
}
const ModeChanger = ({text}:Prop) => {

    const { colorMode, toggleColorMode } = useColorMode()


  return (
    <>
      <HStack>
        <Switch colorScheme="red" isChecked={colorMode === 'dark'} onChange={toggleColorMode}/>
        <Text whiteSpace="nowrap">{text}</Text>
      </HStack>
    </>
  );
};

export default ModeChanger;
