import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Box, Heading, Select } from '@chakra-ui/react';

function Chart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [selectedFilter, setSelectedFilter] = useState('week');

  useEffect(() => {
    fetchData();
  }, [selectedFilter]);

  const fetchData = async () => {
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
       // `http://localhost:8080/api/v1/suppliers/ooredoo-percentage-${selectedFilter}`
      );

      const dataLabels = ['Telecom', 'Orange', 'Ooredoo'];
      const series = [
        responseTelecom.data,
        responseOrange.data,
        responseOoredoo.data,
      ];

      const chartData = {
        labels: dataLabels,
        datasets: [
          {
            label: 'Données du graphique',
            data: series,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
          },
        ],
      };

      setChartData(chartData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données de l\'API :', error);
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Heading size="md" mb={4}>Graphique</Heading>
      <Select
        fontSize='sm'
        variant='subtle'
        defaultValue='week'
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value)}
        width='unset'
        fontWeight='700'
        mb={4}
      >
        <option value='week'>Aujourd'hui</option>
        <option value='month'>Mois</option>
        <option value='year'>Année</option>
      </Select>
      <Box>
      <Line
  data={chartData}
  options={{
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear', // Configuration de l'échelle de l'axe x en tant qu'échelle linéaire
        position: 'bottom',
      },
      y: {
        beginAtZero: true,
      },
    },
  }}
/>
      </Box>
    </Box>
  );
}

export default Chart;
