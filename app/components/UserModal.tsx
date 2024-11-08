import React, { useEffect } from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Button,
  Modal as ChakraModal,
} from "@chakra-ui/react";

export interface IModal {
  setIsSubmitted: (value: boolean) => void;
  setUsername: (value: string) => void;
  setJobTitle: (value: string) => void;
  username: string;
  jobTitle: string;
}
export default function UserModal({
  setIsSubmitted,
  setUsername,
  setJobTitle,
  username,
  jobTitle,
}: IModal) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Retrieve stored user info if available
    const storedUsername = localStorage.getItem("username");
    const storedJobTitle = localStorage.getItem("jobTitle");
    if (storedUsername && storedJobTitle) {
      setUsername(storedUsername);
      setJobTitle(storedJobTitle);
      setIsSubmitted(true);
    } else {
      onOpen();
    }
  }, [onOpen]);

  const handleSave = () => {
    localStorage.setItem("username", username);
    localStorage.setItem("jobTitle", jobTitle);
    setIsSubmitted(true);
    onClose();
  };

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter Your Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            mb={4}
          />
          <Input
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSave} disabled={!username || !jobTitle}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
}
