import React from "react";
import ReactApexChart from "react-apexcharts";

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartOptions: {
        labels: [], // Les étiquettes de vos secteurs
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      chartSeries: [], // Les données de votre graphique
    };
  }

  componentDidMount() {
    // Remplissez les données de votre graphique
    this.setState({
      chartOptions: {
        ...this.state.chartOptions,
        labels: this.props.labels,
      },
      chartSeries: this.props.series,
    });
  }

  render() {
    return (
      <div>
        <ReactApexChart
          options={this.state.chartOptions}
          series={this.state.chartSeries}
          type="pie"
          width="100%"
          height="200%"
        />
      </div>
    );
  }
}

export default PieChart;
