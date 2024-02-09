import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

// Assets
import logotelecom from "assets/img/auth/logo-tt.png";
import logoOrange from "assets/img/auth/logo-orange.png";
import logoOoredoo from "assets/img/auth/logo-oored.jpg";

// Custom components
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import CheckTableOoredoo from "./components/CheckTableOoredoo";
import CheckTableOrange from "./components/CheckTableOrange";
import PieCard from "views/admin/default/components/PieCard";
import DataTable from "./components/tableTelecom";
import axios from 'axios';
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import  Chart from "./components/Chart";
import ChartComponent from "./components/chart2";
import { useEffect, useState } from "react";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [totalTelecom, setTotalTelecom] = useState(0);
  const [totalOrange, setTotalOrange] = useState(0);
  const [totalOoredoo, setTotalOoredoo] = useState(0);
  const [dataseries, setDataseries] = useState([]);
  

  useEffect(() => {
   
 

    fetch( 
      `${process.env.REACT_APP_API_KEY}/api/v1/suppliers/total-telecom` )
      .then((response) => response.json())
      .then((data) => {
        // Mettre à jour l'état avec le nombre total de télécom reçu de l'API
        setTotalTelecom(data);
        console.log(data, "data");
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données de l'API :",
          error
        );
      });
  }, []);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_KEY}/api/v1/suppliers/total-orange`
      //"http://localhost:8080/api/v1/suppliers/total-orange"
      
      )
      .then((response) => response.json())
      .then((data) => {
        setTotalOrange(data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données de l'API :",
          error
        );
      });
  }, []);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_KEY}/api/v1/suppliers/total-ooredoo`
      //"http://localhost:8080/api/v1/suppliers/total-ooredoo"
      )
      .then((response) => response.json())
      .then((data) => {
        setTotalOoredoo(data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données de l'API :",
          error
        );
      });
  }, []);

  useEffect(() => {
    fetchData();

    async function fetchData() {
      try {
        const responseTelecom = await axios.get(
          `${process.env.REACT_APP_API_KEY}/api/v1/suppliers/telecom-percentage-week`
         // `http://localhost:8080/api/v1/suppliers/telecom-percentage-week`
        );
        const responseOrange = await axios.get(
        //  `http://localhost:8080/api/v1/suppliers/orange-percentage-week`
          `${process.env.REACT_APP_API_KEY}/api/v1/suppliers/orange-percentage-week`
        );
        const responseOoredoo = await axios.get(
       //   `http://localhost:8080/api/v1/suppliers/ooredoo-percentage-week`
          `${process.env.REACT_APP_API_KEY}/api/v1/suppliers/ooredoo-percentage-week`
        );

        if (
          typeof responseTelecom.data === "number" &&
          typeof responseOrange.data === "number" &&
          typeof responseOoredoo.data === "number"
        ) {
          const series = [
            responseTelecom.data,
            responseOrange.data,
            responseOoredoo.data,
          ];

          setDataseries(series);
          console.log(dataseries, "data api");
        } else {
          console.error(
            "Les données de l'API ne sont pas valides :",
            responseTelecom.data,
            responseOrange.data,
            responseOoredoo.data
          );
          setDataseries([0, 0, 0]);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'API :",
          error
        );
      }
    }
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <img
                  src={logotelecom}
                  width="70%"
                  height="100%"
                  alt="Telecom Logo"
                />
              }
            />
          }
          name='Telecom'
          value={totalTelecom}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <img
                  src={logoOrange}
                  width="100%"
                  height="100%"
                  alt="Orange Logo"
                />
              }
            />
          }
          name='Orange'
          value={totalOrange}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <img
                  src={logoOoredoo}
                  width="70%"
                  height="100%"
                  alt="Ooredoo Logo"
                />
              }
            />
          }
          name='Ooredoo'
          value={totalOoredoo}
        ></MiniStatistics>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        {/* <PieCard
        dataProp={dataseries}/> */}
        <ChartComponent/>
        
        <DataTable />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <CheckTableOoredoo />
        <CheckTableOrange />
      </SimpleGrid>
    </Box>
  );
}
