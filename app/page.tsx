"use client";
import { useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import UserModal from "./components/UserModal";
import InformationPage from "./components/InformationPage";

// Apollo Client Setup
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL, // Example GraphQL API
  cache: new InMemoryCache(),
});

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        {!isSubmitted ? (
          <UserModal
            setIsSubmitted={setIsSubmitted}
            setUsername={setUsername}
            setJobTitle={setJobTitle}
            username={username}
            jobTitle={jobTitle}
          />
        ) : (
          <InformationPage username={username} jobTitle={jobTitle} />
        )}
      </ChakraProvider>
    </ApolloProvider>
  );
}
