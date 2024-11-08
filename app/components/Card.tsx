import { Box, Image, Text } from "@chakra-ui/react";

export interface ICharacter {
  id: string;
  name: string;
  image: string;
  species: string;
}

export default function Card({ character }: {character: ICharacter}) {
  return (
    <Box
      key={character.id}
      mb={4}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image src={character.image} alt={character.name} />
      <Box p={4}>
        <Text>{character.name}</Text>
        <Text>{character.species}</Text>
      </Box>
    </Box>
  );
}
