import {
  Box,
  Grid,
  Flex,
  Text,
  Button,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
import Notifications from "views/admin/profile/components/Notifications";
import Projects from "views/admin/profile/components/Projects";
import Storage from "views/admin/profile/components/Storage";
import Upload from "views/admin/profile/components/Upload";
import Card from "components/card/Card";

import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/img.webp";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

export default function Overview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiData, setApiData] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const fetchDataFromApi = async () => {
    try {
      const response = await axios.get(
      //  "http://localhost:8080/api/v2/user/4"
        `${process.env.REACT_APP_API_KEY}/api/v2/user/4`,
        );
      const data = response.data;

      setApiData(data);
      setFormData(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données de l'API :", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = async () => {
    closeModal();
    try {
      const response1 = await axios.put(
        //"http://localhost:8080/api/v2/user/update/4",
        `${process.env.REACT_APP_API_KEY}/api/v2/user/update/4`,
         formData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données de l'API :", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid>
        <Banner
          gridArea="1 / 1 / 2 / 2"
          banner={banner}
          avatar={avatar}
          name={formData.username}
          job="Administration"
        />
      </Grid>

      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid mb="20px" columns={{ sm: 1, md: 2 }} spacing={{ base: "20px", xl: "20px" }}>
          <Card>
            <Flex direction="column" p={4}>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Informations Personnelles
              </Text>
              <Text fontSize="md">
                <strong>Nom:</strong> {formData.firstName}
              </Text>
              <Text fontSize="md">
                <strong>Prénom:</strong> {formData.lastName}
              </Text>
              <Text fontSize="md">
                <strong>Mail:</strong> {formData.email}
              </Text>
              <Text fontSize="md">
                <strong>Role:</strong> {formData.role}
              </Text>
              <Button colorScheme="blue" mt={3} onClick={openModal} leftIcon={<FontAwesomeIcon icon={faEdit} />}>
                Modifier
              </Button>
            </Flex>
          </Card>
        </SimpleGrid>

        <Modal isOpen={isModalOpen} onClose={closeModal} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modifier les informations</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <input
                type="text"
                name="nom"
                className="custom-input"
                placeholder="Nom"
                value={formData.firstName}
                onChange={handleInputChange}
                style={{color: "#2d75ef"}}
              />
              <input
                type="text"
                name="prenom"
                className="custom-input"
                placeholder="Prénom"
                value={formData.lastName}
                onChange={handleInputChange}
                style={{color: "#2d75ef"}}
              />
              <input
                type="text"
                name="mail"
                className="custom-input"
                placeholder="Mail"
                value={formData.email}
                onChange={handleInputChange}
                style={{color: "#2d75ef"}}
              />
              <input
                type="text"
                name="role"
                className="custom-input"
                placeholder="Role"
                value={formData.role}
                onChange={handleInputChange}
                style={{color: "#2d75ef"}}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={closeModal}>
                Annuler
              </Button>
              <Button colorScheme="blue" onClick={handleUpdate}>
                Mettre à jour
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}
