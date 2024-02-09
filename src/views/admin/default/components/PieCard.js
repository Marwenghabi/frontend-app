import React, { Component } from 'react';
import PieChart from 'components/charts/PieChart';
import axios from 'axios';
import Card from 'components/card/Card.js';
import { Box, Flex, Text, Select } from '@chakra-ui/react';

class Conversion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: 'week',
      chartData: { labels: ['Telecom', 'Orange', 'Ooredoo'], series: []},
      // loading: false,
    };
  }
  
// componentDidMount() {   
//      this.fetchData();
//  }
  // handleFilterChange = (event) => {
  //   this.setState({ selectedFilter: event.target.value }, this.fetchData);
  // };

  // async componentDidMount() {
   
  //   await this.fetchData();
  // }

  // async componentDidUpdate(prevProps, prevState) {
    
  //   if (this.state.selectedFilter !== prevState.selectedFilter) {
  //     await this.fetchData();
  //   }
  // }

  fetchData = async () => {
    this.setState({ loading: true });
    // const labels = ['Telecom', 'Orange', 'Ooredoo'];
    // const series = this.props.dataseries;
    // this.setState({ chartData: { labels, series } });
    this.series=this.props;
    try {
      const responseTelecom = await axios.get(

        `${process.env.REACT_APP_API_KEY}/api/v1/suppliers/telecom-percentage-${this.state.selectedFilter}`,

      //  `http://localhost:8080/api/v1/suppliers/telecom-percentage-${this.state.selectedFilter}`
      );
      const responseOrange = await axios.get(
        `${process.env.REACT_APP_API_KEY}/api/v1/suppliers/orange-percentage-${this.state.selectedFilter}`,
      //  `http://localhost:8080/api/v1/suppliers/orange-percentage-${this.state.selectedFilter}`
      );
      const responseOoredoo = await axios.get(
        `${process.env.REACT_APP_API_KEY}/api/v1/suppliers/ooredoo-percentage-${this.state.selectedFilter}`,
       // `http://localhost:8080/api/v1/suppliers/ooredoo-percentage-${this.state.selectedFilter}`
      );

      if (
        typeof responseTelecom.data === 'number' &&
        typeof responseOrange.data === 'number' &&
        typeof responseOoredoo.data === 'number'
      ) {
        const labels = ['Telecom', 'Orange', 'Ooredoo'];
        const series = [
          responseTelecom.data,
          responseOrange.data,
          responseOoredoo.data,
        ];

        this.setState({ chartData: { labels, series } });
        console.log(responseTelecom.data, "datagraphe");
      } else {
        console.error(
          "Les données de l'API ne sont pas valides :",
          responseTelecom.data,
          responseOrange.data,
          responseOoredoo.data
        );
        const labels = ['Telecom', 'Orange', 'Ooredoo'];
        const series = [10, 0, 0];
        this.setState({ chartData: { labels, series } });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données de l'API :", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    console.log(this.state.selectedFilter, this.state.chartData,this.props.dataProp,"passe les data  ");

    return (
      <div>
        <Card p='20px' align='center' direction='column' w='100%'>
          <Flex
            px={{ base: '0px', '2xl': '10px' }}
            justifyContent='space-between'
            alignItems='center'
            w='100%'
            mb='8px'
          >
            <Text fontSize='md' fontWeight='600' mt='4px'>
              Graphique
            </Text>
            <Select
              fontSize='sm'
              variant='subtle'
              defaultValue='week'
              value={this.state.selectedFilter}
              onChange={this.handleFilterChange}
              width='unset'
              fontWeight='700'
            >
              <option value='week'>Aujourd'hui</option>
              <option value='month'>Mois</option>
              <option value='year'>Année</option>
            </Select>
          </Flex>

          <PieChart
            h='100%'
            w='100%'
            // labels={this.state.chartData.labels}
            // series={this.props.dataProp}
            labels={this.state.chartData.labels}
            series={this.state.chartData.series}
          />

          {this.state.loading ? (
            <Text mt='20px'>Chargement en cours...</Text>
          ) : (
            <Card
              flexDirection='row'
              boxShadow='0px 18px 40px rgba(112, 144, 176, 0.12)'
              w='100%'
              p='15px'
              px='20px'
              mt='15px'
              mx='auto'
            >
              {this.state.chartData.labels.map((label, index) => (
                <Flex key={label} direction='column' py='5px' me='10px'>
                  <Flex align='center'>
                    <Box
                      h='8px'
                      w='8px'
                      bg='navy.700'
                      borderRadius='50%'
                      me='4px'
                    />
                    <Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
                      {label}
                    </Text>
                  </Flex>
                  <Text fontSize='lg' fontWeight='700'>
                    {this.state.chartData.series[index]}%
                  </Text>
                </Flex>
              ))}
            </Card>
          )}
        </Card>
      </div>
    );
  }
}

export default Conversion;
