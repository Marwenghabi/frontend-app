
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from 'react';
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";

import { RiArrowUpSFill } from "react-icons/ri";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";

export default function TotalSpent(props) {
  const { ...rest } = props;



  const textColor = useColorModeValue("secondaryGray.900", "white", "black");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white", "black");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100","whiteAlpha.150");
  const iconColor = useColorModeValue("brand.500", "white","black");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100","whiteAlpha.150");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" },
    { bg: "whiteAlpha.150" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" },
    { bg: "whiteAlpha.150" }
  );

  const [chartData, setChartData] = useState(lineChartDataTotalSpent);

  // Fonction pour ajouter une nouvelle ligne de données au graphique
  const addNewLineToChart = () => {
    const newData = {
      label: 'Nouvelle Ligne',
      data: [10, 20, 30, 40, 50], // Remplacez ces valeurs par les données réelles de la nouvelle ligne
      borderColor: 'blue', // Couleur de la ligne (facultatif)
      borderWidth: 2, // Largeur de la ligne (facultatif)
    };

    // Mettre à jour les données du graphique en ajoutant la nouvelle ligne
    setChartData((prevChartData) => ({
      ...prevChartData,
      datasets: [...prevChartData.datasets, newData],
    }));
  };

  return (
    <Card
      justifyContent='center'
      align='center'
      direction='column'
      w='100%'
      mb='0px'
      {...rest}>
      <Flex justify='space-between' ps='0px' pe='20px' pt='5px'>
        <Flex align='center' w='100%'>
          <Button
            bg={boxBg}
            fontSize='sm'
            fontWeight='500'
            color={textColorSecondary}
            borderRadius='7px'>
            <Icon
              as={MdOutlineCalendarToday}
              color={textColorSecondary}
              me='4px'
            />
            This month
          </Button>
          <Button
            ms='auto'
            align='center'
            justifyContent='center'
            bg={bgButton}
            _hover={bgHover}
            _focus={bgFocus}
            _active={bgFocus}
            w='37px'
            h='37px'
            lineHeight='100%'
            borderRadius='10px'
            {...rest}>
            <Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
          </Button>
        </Flex>
      </Flex>
      <Flex w='100%' flexDirection={{ base: "column", lg: "row" }}>
        <Flex flexDirection='column' me='20px' mt='28px'>
          {/* <Text
            color={textColor}
            fontSize='34px'
            textAlign='start'
            fontWeight='700'
            lineHeight='100%'>
            $37.5K
          </Text> */}
          <Flex align='center' mb='20px'>
            {/* <Text
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'
              mt='4px'
              me='12px'>
              Total Spent
            </Text> */}
            <Flex align='center'>
              {/* <Icon as={RiArrowUpSFill} color='green.500' me='2px' mt='2px' /> */}
              {/* <Text color='green.500' fontSize='sm' fontWeight='700'>
                +2.45%
              </Text> */}
            </Flex>
          </Flex>

          <Flex align='center'>
            {/* <Icon as={IoCheckmarkCircle} color='green.500' me='4px' /> */}
            {/* <Text color='green.500' fontSize='md' fontWeight='700'>
              On track
            </Text> */}
          </Flex>
        </Flex>
        <Box minH='260px' minW='75%' mt='auto'>
          {/* <LineChart
            chartData={lineChartDataTotalSpent}
            chartOptions={lineChartOptionsTotalSpent}
           
          /> */}
           <LineChart chartData={chartData} chartOptions={lineChartOptionsTotalSpent} />
          
          
        </Box>
      </Flex>
    </Card>
  );
}
