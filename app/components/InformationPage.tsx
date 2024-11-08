'use client';
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Card, { ICharacter } from "./Card";
import Header from "./Header";
import { useEffect, useState } from "react";

export interface IUserInfo {
  username: string;
  jobTitle: string;
}
export default function InformationPage({ username, jobTitle }: IUserInfo) {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);

  const { loading, error, data } = useQuery(
    gql`
      query GetCharacters($page: Int) {
        characters(page: $page) {
          info {
            count
            pages
          }
          results {
            id
            name
            image
            species
          }
        }
      }
    `,
    {
      variables: { page },
      skip: !username || !jobTitle,
    }
  );

  useEffect(() => {
    const currentPage = parseInt(
      new URLSearchParams(window.location.search).get("page") ?? "1",
      10
    );
    setPage(currentPage);
  }, []);

 

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.replace(`/?page=${newPage}`);
  };



  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading data</Text>;

  return (
    <Box p={4}>
      <Header username={username} jobTitle={jobTitle} />
      <Box>
        {data.characters.results.map((character: ICharacter) => (
          <Card character={character} key={character.id} />
        ))}
      </Box>

      <Flex justifyContent="space-between" mt={4}>
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= data.characters.info.pages}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
}
