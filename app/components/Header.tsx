import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { IUserInfo } from './InformationPage';

export default function Header({
    username,
    jobTitle,
  }: IUserInfo) {
    return (
        <Flex justifyContent="space-between" mb={4}>
          <Box>
            <Text fontSize="xl">Welcome, {username}</Text>
            <Text fontSize="md">Job Title: {jobTitle}</Text>
          </Box>
          <Button onClick={() => {localStorage.clear() ; location.reload()}}>Edit Info</Button>
        </Flex>
    );
}