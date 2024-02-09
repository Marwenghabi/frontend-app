import React, { Component } from "react";
import {
  Box,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";
import imagTriage from "../../../assets/img/newt.jpg";

import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ColumnsTableOoredo from "./components/ColumnsTableOoredo";
import ColumnsTableOrange from "./components/ColumnsTableOrange";
import { columnsDataColumns } from "views/admin/dataTables/variables/columnsData";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import WinnerTable from "./components/TableWinner";
import SMSSender from "./components/SendSMS";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      loading: false,
      phoneNumber: "",
      type: "",
      showLoadingWinnerTable: false, 
    };
  }

  fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_KEY}/api/v1/suppliers/randomPhoneNumber`
        
      );
      if (response.data !== undefined) {
        console.log(
          "data triage sort ",
          response.data.data.phoneNumber,
          response.data
        );
        this.setState({
          phoneNumber: response.data.data.phoneNumber,
          type: response.data.data.type,
        });
      } else {
        console.error("Erreur API : pas de données valides");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de l'API :",
        error
      );
    }
  };

  saveData = async () => {
    const { phoneNumber, type } = this.state;
    try {
      const responseSave = await axios.post(
       // "http://localhost:8080/api/v3/winner/saveRandomWinner"
        `${process.env.REACT_APP_API_KEY}/api/v3/winner/saveRandomWinner`
        ,
        {
          randomPhoneNumber: phoneNumber,
          type: type,
        }
      );
      if (phoneNumber !== undefined) {
        console.log("Succès");
      } else {
        console.error("Erreur API : pas de données valides");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la sauvegarde des données de l'API :",
        error
      );
    }
  };

  handleGardClick = () => {
    this.fetchData();
    this.setState({ showModal: true, loading: true });

   
    setTimeout(() => {
      this.setState({ loading: false });
     
      this.saveData();

    
      this.setState({ showLoadingWinnerTable: true });
    }, 2000);
  };

  render() {
    const { showModal, loading, phoneNumber, showLoadingWinnerTable } = this.state;

    return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid
          mb="20px"
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: "20px", xl: "20px" }}
        >
          <Card onClick={this.handleGardClick}>
            <img
              src={imagTriage}
              style={{ height: "100px" }}
              alt="tirage"
            />
          </Card>
        </SimpleGrid>

        <Modal
          isOpen={showModal}
          onClose={() => this.setState({ showModal: false })}
          isCentered
        >
          <ModalOverlay />
          <ModalContent style={{ height: "30vh" }}>
            <ModalCloseButton />
            <ModalBody>
              {loading ? (
                <Box textAlign="center">
                  <Spinner size="xl" />
                  <Box mt={4}>Chargement en cours...</Box>
                </Box>
              ) : (
                <Box textAlign="center" onClick={this.saveData}>
                  <h1>Le numéro gagné est :</h1>
                  <h1 style={{ fontSize: "50px", margin: "45px" }}>
                    {phoneNumber}
                  </h1>
                </Box>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>

        <SimpleGrid>
          {showLoadingWinnerTable ? (
            <Spinner size="xl" />
          ) : (
            <WinnerTable />
          )}
        </SimpleGrid>

        <SimpleGrid   mb="20px"
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: "20px", xl: "20px" }}> 
        </SimpleGrid>

        <SimpleGrid>
        <Card>
          <SMSSender />
        </Card>
        </SimpleGrid>
      </Box>
    );
  }
}

export default Settings;
