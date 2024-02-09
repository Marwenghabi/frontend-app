import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Flex, Text, Select } from '@chakra-ui/react';
import 'chart.js/auto';
import Card from "components/card/Card";
function ChartComponent() {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [selectedFilter, setSelectedFilter] = useState('week');

    useEffect(() => {
      fetchData();
    }, [selectedFilter]);
    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchData = async () => {
      console.log("data de api ", apiUrl);
      try {
        const responseTelecom = await axios.get(
          `${process.env.REACT_APP_API_KEY}/api/v1/suppliers/telecom-percentage-${selectedFilter}`
         // `http://localhost:8080/api/v1/suppliers/telecom-percentage-${selectedFilter}`
        );
        const responseOrange = await axios.get(
          `${process.env.REACT_APP_API_KEY}/api/v1/suppliers/orange-percentage-${selectedFilter}`
         // `http://localhost:8080/api/v1/suppliers/orange-percentage-${selectedFilter}`
        );
        const responseOoredoo = await axios.get(
          `${process.env.REACT_APP_API_KEY}/api/v1/suppliers/ooredoo-percentage-${selectedFilter}`
        //`http://localhost:8080/api/v1/suppliers/ooredoo-percentage-${selectedFilter}`
        );

        const chartData = {
          labels: ['Telecom', 'Orange', 'Ooredoo'],
          datasets: [
            {
              data: [responseTelecom.data, responseOrange.data, responseOoredoo.data],
              backgroundColor: ['blue', 'orange', 'red'],
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'API :", error);
      }
    };

    const handleFilterChange = (event) => {
      setSelectedFilter(event.target.value);
    };
  
    return (
       <Card
       direction="column"
       w="100%"
       px="0px"
     
       >
         <Text fontSize='md' fontWeight='600' mt='4px'style={{marginLeft:"5px"}}>
              Graphique
            </Text>
      <Flex direction='column' alignItems='center'>
         <div style={{width:"400px", height:"350px"}}>
        
        <Select
       
          variant='subtle'
          alignItems='left'
          value={selectedFilter}
          onChange={handleFilterChange}
          width='unset'
          fontWeight='700'
        >
          <option value='week'>Aujourd'hui</option>
          <option value='month'>Mois</option>
          <option value='year'>Année</option>
        </Select>
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
        </div>
      </Flex></Card>
    );
}

export default ChartComponent;
