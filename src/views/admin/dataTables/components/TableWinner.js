import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from "components/card/Card";
import ReactPaginate from 'react-paginate';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";


function WinnerTable() {
  const [winners, setWinners] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const winnersPerPage = 5; // Nombre de gagnants par page

  useEffect(() => {
    // Effectuez une requête HTTP GET pour récupérer les données de l'API
    axios.get(
      `${process.env.REACT_APP_API_KEY}/api/v3/winner/allWinner`)
      .then((response) => {
        setWinners(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données de l\'API :', error);
      });
  }, []);

  const pageCount = Math.ceil(winners.length / winnersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayWinners = winners
    .slice(pageNumber * winnersPerPage, (pageNumber + 1) * winnersPerPage)
    .map((winner) => (
      <Tr key={winner.id}>
        <Td>{winner.phoneNumber}</Td>
        <Td>{winner.type}</Td>
        <Td>{new Date(winner.date).toLocaleString()}</Td>
      </Tr>
    ));
    const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <div>
      <Card>
      <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
        La liste des numéros gagnant
        </Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Numéro gagnant</Th>
              <Th>Type</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>{displayWinners}</Tbody>
        </Table>
        
        {/* Pagination Controls */}
        <Flex justify="space-between" px="25px" mt="24px">
          <Button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 0}>
            Précédent
          </Button>
          <Flex align="center" fontSize="12px" color="gray.400">
            <Text mr="1">Page</Text>
            <Text fontWeight="bold">{pageNumber + 1}</Text>
            <Text mx="1">de</Text>
            <Text fontWeight="bold">{pageCount}</Text>
          </Flex>
          <Button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber === pageCount - 1}>
            Suivant
          </Button>
        </Flex>
      </Card>
    </div>
  );
}

export default WinnerTable;
