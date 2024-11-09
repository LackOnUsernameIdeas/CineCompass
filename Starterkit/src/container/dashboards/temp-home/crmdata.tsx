import { Component, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import chroma from "chroma-js";
import face4 from "../../../assets/images/faces/4.jpg";
import face15 from "../../../assets/images/faces/15.jpg";
import face11 from "../../../assets/images/faces/11.jpg";
import face8 from "../../../assets/images/faces/8.jpg";
import face9 from "../../../assets/images/faces/9.jpg";
import {
  AverageBoxOfficeAndScores,
  CountryData,
  MovieData
} from "../home-types";
import { parseBoxOffice } from "../helper_functions";
import { Link } from "react-router-dom";

//
interface spark3 {
  options?: ApexOptions;
  width?: string | number;
  height?: string | number;
  series?: ApexOptions["series"];
  [key: string]: any;
  label?: XAxisAnnotations;
  endingShape?: string;
}

export function generateData(count: any, yrange: any) {
  let i = 0;
  const series = [];
  while (i < count) {
    const x = "w" + (i + 1).toString();
    const y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({
      x: x,
      y: y
    });
    i++;
  }
  return series;
}

export class Totalcustomers extends Component<{}, spark3> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      series: [
        {
          name: "Value",
          data: [20, 14, 19, 10, 23, 20, 22, 9, 12]
        }
      ],
      options: {
        colors: ["rgb(132, 90, 223)"],
        chart: {
          type: "line",
          height: 40,
          width: 100,
          sparkline: {
            enabled: true
          },
          events: {
            mounted: (chart: any) => {
              chart.windowResizeHandler();
            }
          }
        },
        stroke: {
          show: true,
          curve: "smooth",
          lineCap: "butt",
          colors: undefined,
          width: 1.5,
          dashArray: 0
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.9,
            opacityTo: 0.9,
            stops: [0, 98]
          }
        },
        yaxis: {
          min: 0,
          show: false,
          axisBorder: {
            show: false
          }
        },
        xaxis: {
          // show: false,
          axisBorder: {
            show: false
          }
        },
        tooltip: {
          enabled: false
        }
      }
    };
  }

  render() {
    return (
      <div>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={40}
          width={100}
        />
      </div>
    );
  }
}
//
export class Totalrevenue extends Component<{}, spark3> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      series: [
        {
          name: "Value",
          data: [20, 14, 20, 22, 9, 12, 19, 10, 25]
        }
      ],
      options: {
        colors: ["rgb(35, 183, 229)"],
        chart: {
          type: "line",
          height: 40,
          width: 100,
          sparkline: {
            enabled: true
          },
          events: {
            mounted: (chart: any) => {
              chart.windowResizeHandler();
            }
          }
        },
        stroke: {
          show: true,
          curve: "smooth",
          lineCap: "butt",
          colors: undefined,
          width: 1.5,
          dashArray: 0
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.9,
            opacityTo: 0.9,
            stops: [0, 98]
          }
        },
        yaxis: {
          min: 0,
          show: false,
          axisBorder: {
            show: false
          }
        },
        xaxis: {
          axisBorder: {
            show: false
          }
        },
        tooltip: {
          enabled: false
        }
      }
    };
  }

  render() {
    return (
      <div>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={40}
          width={100}
        />
      </div>
    );
  }
}

//
export class Conversionratio extends Component<{}, spark3> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      series: [
        {
          name: "Value",
          data: [20, 20, 22, 9, 14, 19, 10, 25, 12]
        }
      ],
      options: {
        colors: ["rgb(38, 191, 148)"],
        chart: {
          type: "line",
          height: 40,
          width: 100,
          sparkline: {
            enabled: true
          },
          events: {
            mounted: (chart: any) => {
              chart.windowResizeHandler();
            }
          }
        },
        stroke: {
          show: true,
          curve: "smooth",
          lineCap: "butt",
          colors: undefined,
          width: 1.5,
          dashArray: 0
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.9,
            opacityTo: 0.9,
            stops: [0, 98]
          }
        },

        yaxis: {
          min: 0,
          show: false,
          axisBorder: {
            show: false
          }
        },
        xaxis: {
          axisBorder: {
            show: false
          }
        },
        tooltip: {
          enabled: false
        }
      }
    };
  }

  render() {
    return (
      <div>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={40}
          width={100}
        />
      </div>
    );
  }
}
//
export class Totaldeals extends Component<{}, spark3> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      series: [
        {
          name: "Value",
          data: [20, 20, 22, 9, 12, 14, 19, 10, 25]
        }
      ],
      options: {
        colors: ["rgb(245, 184, 73)"],
        chart: {
          type: "line",
          height: 40,
          width: 100,
          sparkline: {
            enabled: true
          },
          events: {
            mounted: (chart: any) => {
              chart.windowResizeHandler();
            }
          }
        },
        stroke: {
          show: true,
          curve: "smooth",
          lineCap: "butt",
          colors: undefined,
          width: 1.5,
          dashArray: 0
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.9,
            opacityTo: 0.9,
            stops: [0, 98]
          }
        },
        yaxis: {
          min: 0,
          show: false,
          axisBorder: {
            show: false
          }
        },
        xaxis: {
          // show: false,
          axisBorder: {
            show: false
          }
        },
        tooltip: {
          enabled: false
        }
      }
    };
  }

  render() {
    return (
      <div>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={40}
          width={100}
        />
      </div>
    );
  }
}

interface RevenueAnalyticsProps {
  genrePopularityOverTime: {
    [key: string]: {
      [genre: string]: { genre_en: string; genre_count: number };
    };
  };
}

export class Revenueanalytics extends Component<
  RevenueAnalyticsProps,
  { series: any; options: any }
> {
  constructor(props: RevenueAnalyticsProps) {
    super(props);

    const { genrePopularityOverTime } = this.props;

    // Prepare data for the chart series
    const genres = new Set<string>();
    // Collect all genres from genrePopularityOverTime
    Object.values(genrePopularityOverTime).forEach((yearData) => {
      Object.keys(yearData).forEach((genre) => {
        genres.add(genre);
      });
    });

    // Prepare the chart series data for all genres
    const series = Array.from(genres).map((genre) => {
      return {
        type: "line",
        name: genre, // Use genre name
        data: Object.keys(genrePopularityOverTime).map((year) => {
          const genreData = genrePopularityOverTime[year][genre];
          return genreData ? genreData.genre_count : 0;
        })
      };
    });

    this.state = {
      series: series,
      options: {
        chart: {
          height: 350,
          animations: {
            speed: 500
          },
          dropShadow: {
            enabled: true,
            top: 8,
            left: 0,
            blur: 3,
            color: "#000",
            opacity: 0.1
          },
          toolbar: {
            show: false
          }
        },
        colors: [
          "rgb(132, 90, 223)",
          "rgba(35, 183, 229, 0.85)",
          "rgba(119, 119, 142, 0.05)"
        ],
        dataLabels: {
          enabled: false
        },
        grid: {
          borderColor: "#f1f1f1",
          strokeDashArray: 3
        },
        stroke: {
          curve: "smooth",
          width: [2, 2, 0],
          dashArray: [0, 5, 0]
        },
        xaxis: {
          categories: Object.keys(genrePopularityOverTime), // Years (1944, 1947, 1950, ...)
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          labels: {
            formatter: function (value: number) {
              return value;
            }
          }
        },
        tooltip: {
          y: [
            {
              formatter: function (e: number) {
                return void 0 !== e ? e.toFixed(0) : e;
              }
            }
          ]
        },
        markers: {
          hover: {
            sizeOffset: 5
          }
        }
      }
    };
  }

  render() {
    return (
      <div>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
        />
      </div>
    );
  }
}
//
//ProfitEarned
export class Profitearned extends Component<{}, spark3> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      series: [
        {
          name: "Profit Earned",
          data: [44, 42, 57, 86, 58, 55, 70]
        },
        {
          name: "Total Sales",
          data: [34, 22, 37, 56, 21, 35, 60]
        }
      ],
      options: {
        chart: {
          type: "bar",
          height: 180,
          toolbar: {
            show: false
          },
          events: {
            mounted: (chart: any) => {
              chart.windowResizeHandler();
            }
          }
        },
        grid: {
          borderColor: "#f1f1f1",
          strokeDashArray: 3
        },
        colors: ["rgb(132, 90, 223)", "#e4e7ed"],
        plotOptions: {
          bar: {
            colors: {
              ranges: [
                {
                  from: -100,
                  to: -46,
                  color: "#ebeff5"
                },
                {
                  from: -45,
                  to: 0,
                  color: "#ebeff5"
                }
              ]
            },
            columnWidth: "60%",
            borderRadius: 5
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: undefined
        },
        legend: {
          show: false,
          position: "top"
        },
        yaxis: {
          title: {
            style: {
              color: "#adb5be",
              fontSize: "13px",
              fontFamily: "poppins, sans-serif",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-label"
            }
          },
          labels: {
            formatter: function (y) {
              return y.toFixed(0) + "";
            }
          }
        },
        xaxis: {
          categories: ["S", "M", "T", "W", "T", "F", "S"],
          axisBorder: {
            show: true,
            color: "rgba(119, 119, 142, 0.05)",
            offsetX: 0,
            offsetY: 0
          },
          axisTicks: {
            show: true,
            borderType: "solid",
            color: "rgba(119, 119, 142, 0.05)",
            offsetX: 0,
            offsetY: 0
          },
          labels: {
            rotate: -90
          }
        }
      }
    };
  }

  render() {
    return (
      <div>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={180}
        />
      </div>
    );
  }
}
//Leads by Source
interface AwardsDonutChartProps {
  awardsData: {
    totalAwardsWins: number;
    totalAwardsNominations: number;
    totalOscarWins: number;
    totalOscarNominations: number;
  };
}

export class AwardsDonutChart extends Component<AwardsDonutChartProps, spark3> {
  constructor(props: AwardsDonutChartProps) {
    super(props);

    // Use props to set series initially
    this.state = {
      series: [
        props.awardsData.totalAwardsWins,
        props.awardsData.totalAwardsNominations,
        props.awardsData.totalOscarWins,
        props.awardsData.totalOscarNominations
      ],
      options: {
        labels: [
          "Awards Wins",
          "Awards Nominations",
          "Oscar Wins",
          "Oscar Nominations"
        ],
        chart: {
          events: {
            mounted: (chart: any) => {
              chart.windowResizeHandler();
            }
          },
          height: 250,
          type: "donut"
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        stroke: {
          show: true,
          curve: "smooth",
          lineCap: "round",
          colors: ["#fff"],
          width: 0,
          dashArray: 0
        },
        plotOptions: {
          pie: {
            expandOnClick: false,
            donut: {
              size: "82%",
              labels: {
                show: false,
                name: {
                  show: true,
                  fontSize: "20px",
                  color: "#495057",
                  offsetY: -4
                },
                value: {
                  show: true,
                  fontSize: "18px",
                  offsetY: 8,
                  formatter: (val: string) => `${Number(val)}%`
                }
              }
            }
          }
        },
        colors: [
          "rgb(132, 90, 223)",
          "rgb(35, 183, 229)",
          "rgb(245, 184, 73)",
          "rgb(38, 191, 148)"
        ]
      }
    };
  }

  componentDidUpdate(prevProps: AwardsDonutChartProps) {
    // Update the chart series when props change
    if (prevProps.awardsData !== this.props.awardsData) {
      this.setState({
        series: [
          this.props.awardsData.totalAwardsWins,
          this.props.awardsData.totalAwardsNominations,
          this.props.awardsData.totalOscarWins,
          this.props.awardsData.totalOscarNominations
        ]
      });
    }
  }

  render() {
    return (
      <div>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          height={250}
        />
      </div>
    );
  }
}

export class Profit extends Component<{}, spark3> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      series: [48],
      options: {
        chart: {
          height: 127,
          width: 100,
          type: "radialBar",
          events: {
            mounted: (chart: any) => {
              chart.windowResizeHandler();
            }
          }
        },
        colors: ["rgba(255,255,255,0.9)"],
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: "55%",
              background: "#fff"
            },
            dataLabels: {
              name: {
                offsetY: -10,
                color: "#4b9bfa",
                fontSize: ".625rem",
                show: false
              },
              value: {
                offsetY: 5,
                color: "#4b9bfa",
                fontSize: ".875rem",
                show: true,
                fontWeight: 600
              }
            }
          }
        },
        stroke: {
          lineCap: "round"
        },
        labels: ["Status"]
      }
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="radialBar"
          width={100}
          height={127}
        />
      </div>
    );
  }
}
// Deals Statistics

export const Dealsstatistics = [
  {
    id: "1",
    src: face4,
    name: "Mayor Kelly",
    role: "Manufacture",
    mail: "mayorkelly@gmail.com",
    location: "Germany",
    date: "Sep 15 - Oct 12, 2023",
    color: "info",
    checked: ""
  },
  {
    id: "2",
    src: face15,
    name: "Andrew Garfield",
    role: "Development",
    mail: "andrewgarfield@gmail.com",
    location: "Canada",
    date: "Apr 10 - Dec 12, 2023",
    color: "primary",
    checked: "defaultChecked"
  },
  {
    id: "3",
    src: face11,
    name: "Simon Cowel",
    role: "Service",
    mail: "simoncowel234@gmail.com",
    location: "Europe",
    date: "Sep 15 - Oct 12, 2023",
    color: "danger",
    checked: ""
  },
  {
    id: "4",
    src: face8,
    name: "Mirinda Hers",
    role: "Marketing",
    mail: "mirindahers@gmail.com",
    location: "USA",
    date: "Apr 14 - Dec 14, 2023",
    color: "warning",
    checked: "defaultChecked"
  },
  {
    id: "5",
    src: face9,
    name: "Jacob Smith",
    role: "Social Plataform",
    mail: "jacobsmith@gmail.com",
    location: "Singapore",
    date: "Feb 25 - Nov 25, 2023",
    color: "success",
    checked: "defaultChecked"
  }
];

interface GenrePopularityOverTimeProps {
  seriesData: any[]; // Array of dynamic data for the heatmap
}

interface State {
  options: any; // Keeps chart configuration options
  series?: { name: string; data: (number | null)[] }[]; // Optional series for flexibility
}

//color range
export class GenrePopularityOverTime extends Component<
  GenrePopularityOverTimeProps,
  State
> {
  constructor(props: GenrePopularityOverTimeProps) {
    super(props);

    this.state = {
      options: {
        chart: {
          height: 350,
          type: "heatmap",
          events: {
            mounted: (chart: any) => {
              chart.windowResizeHandler();
            }
          }
        },
        plotOptions: {
          heatmap: {
            shadeIntensity: 0.5,
            radius: 0,
            useFillColorAsStroke: true,
            colorScale: {
              ranges: [
                {
                  from: -30,
                  to: 1,
                  name: "много нисък брой",
                  color: "#f28a8a"
                },
                {
                  from: 2,
                  to: 3,
                  name: "малък брой",
                  color: "#e05656"
                },
                {
                  from: 4,
                  to: 5,
                  name: "нисък до умерен брой",
                  color: "#d83838"
                },
                {
                  from: 6,
                  to: 10,
                  name: "умерен брой",
                  color: "#d01616"
                },
                {
                  from: 11,
                  to: 15,
                  name: "умерен до среден брой",
                  color: "#b81414"
                },
                {
                  from: 16,
                  to: 20,
                  name: "среден брой",
                  color: "#a11212"
                },
                {
                  from: 21,
                  to: 45,
                  name: "висок брой",
                  color: "#8a0f0f"
                },
                {
                  from: 46,
                  to: 55,
                  name: "много висок брой",
                  color: "#730d0d"
                }
              ]
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        grid: {
          borderColor: ""
        },
        stroke: {
          width: 1
        },
        title: {
          text: "HeatMap Chart with Color Range",
          align: "left",
          style: {
            fontSize: "13px",
            fontWeight: "bold",
            color: "#8c9097"
          }
        },
        xaxis: {
          labels: {
            show: true,
            style: {
              colors: "#8c9097",
              fontSize: "11px",
              fontWeight: 600,
              cssClass: "apexcharts-xaxis-label"
            }
          }
        },
        yaxis: {
          labels: {
            show: true,
            style: {
              colors: "#8c9097",
              fontSize: "11px",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-label"
            }
          }
        }
      }
    };
  }

  // Use dynamic data passed as props
  static getDerivedStateFromProps(
    nextProps: BoxOfficeVsIMDBRatingProps,
    prevState: State
  ) {
    if (nextProps.seriesData.length > 0) {
      const seriesData = [
        {
          name: "Жанрове",
          data: nextProps.seriesData.map((movie) => ({
            x:
              typeof movie.boxOffice === "string"
                ? parseFloat(movie.boxOffice.replace(/[\$,]/g, "")) / 1e6
                : movie.boxOffice / 1e6, // Convert to millions if it's a string
            y:
              typeof movie.imdbRating === "string"
                ? parseFloat(movie.imdbRating)
                : movie.imdbRating, // Use as is if it's a number
            name: movie.title_bg // Movie title
          }))
        }
      ];

      // Log the series data for debugging
      console.log("Series Data:", seriesData);

      return { ...prevState, series: seriesData };
    }
    return null;
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.options}
        series={this.props.seriesData}
        type="heatmap"
        height={350}
      />
    );
  }
}

interface BoxOfficeVsIMDBRatingProps {
  seriesData: MovieData[];
}

export class BoxOfficeVsIMDBRating extends Component<
  BoxOfficeVsIMDBRatingProps,
  State
> {
  constructor(props: BoxOfficeVsIMDBRatingProps) {
    super(props);

    this.state = {
      options: {
        chart: {
          height: 320,
          type: "scatter",
          zoom: {
            enabled: true,
            type: "x",
            autoScaleYaxis: false,
            zoomedArea: {
              fill: {
                color: "#90CAF9",
                opacity: 0.4
              },
              stroke: {
                color: "#0D47A1",
                opacity: 0.4,
                width: 1
              }
            }
          },
          events: {
            mounted: (chart: any) => {
              chart.windowResizeHandler();
            }
          }
        },
        grid: {
          borderColor: "#f2f5f7"
        },
        colors: ["#be1313"],
        xaxis: {
          title: {
            text: "Приходи от боксофиса (в милиони)"
          },
          tickAmount: 10,
          labels: {
            formatter: (val: any) => `$${Math.round(val)}M`, // Round box office for x-axis
            style: {
              colors: "#8c9097",
              fontSize: "11px",
              fontWeight: 600
            }
          }
        },
        yaxis: {
          title: {
            text: "IMDb Рейтинг"
          },
          tickAmount: 7,
          labels: {
            style: {
              colors: "#8c9097",
              fontSize: "11px",
              fontWeight: 600
            }
          }
        },
        tooltip: {
          shared: false,
          intersect: true,
          custom: function ({ seriesIndex, dataPointIndex, w }: any) {
            // Access the full movie data object directly from the series data
            const movieData = w.config.series[seriesIndex].data[dataPointIndex];

            if (movieData) {
              const movieTitleEn = movieData.title_en || "Unknown Movie";
              const movieTitleBg = movieData.title_bg || "Unknown Movie";
              const imdbRating =
                movieData.y !== undefined ? movieData.y : "N/A";
              const boxOffice =
                movieData.x !== undefined ? movieData.x * 1e6 : "N/A";
              const formattedBoxOffice =
                boxOffice !== "N/A" ? `$${boxOffice.toLocaleString()}` : "N/A";

              return `
                <div style="padding: 10px;">
                  <strong>${movieTitleBg} (${movieTitleEn})</strong><br />
                  IMDb Рейтинг: ${imdbRating}/10<br />
                  Боксофис: ${formattedBoxOffice}
                </div>
              `;
            }
            return ""; // Return empty if no data found
          }
        }
      },
      series: []
    };
  }

  static getDerivedStateFromProps(
    nextProps: BoxOfficeVsIMDBRatingProps,
    prevState: State
  ) {
    if (nextProps.seriesData.length > 0) {
      // Map over the movies to set up series data
      const seriesData = [
        {
          name: "Movies",
          data: nextProps.seriesData.map((movie) => ({
            x: parseBoxOffice(movie.boxOffice) / 1e6, // Box Office in millions for x-axis
            y: movie.imdbRating, // IMDb Rating for y-axis
            title_en: movie.title_en,
            title_bg: movie.title_bg
          }))
        }
      ];

      // Log the transformed series data for debugging
      console.log("Transformed Series Data:", seriesData);

      return { ...prevState, series: seriesData };
    }
    return null;
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type="scatter"
        height={320}
      />
    );
  }
}

export class MovieBarChart extends Component<
  { seriesData: MovieData[]; category: string },
  State
> {
  constructor(props: { seriesData: MovieData[]; category: string }) {
    super(props);
    this.state = {
      series: [],
      options: {
        chart: { type: "bar", height: 320 },
        plotOptions: { bar: { borderRadius: 4, horizontal: true } },
        grid: { borderColor: "#f2f5f7" },
        dataLabels: { enabled: false },
        xaxis: {
          title: {
            text: []
          },
          categories: []
        },
        yaxis: { title: { text: "Заглавие" } }
      }
    };
  }

  static getDerivedStateFromProps(
    nextProps: { seriesData: MovieData[]; category: string },
    prevState: State
  ) {
    if (nextProps.seriesData && nextProps.seriesData.length > 0) {
      const sortCategory = nextProps.category;
      const sortedMovies =
        sortCategory === "IMDb"
          ? nextProps.seriesData.sort((a, b) => b.imdbRating - a.imdbRating)
          : sortCategory === "Metascore"
          ? nextProps.seriesData.sort((a, b) => b.metascore - a.metascore)
          : nextProps.seriesData.sort(
              (a, b) => b.rottenTomatoes - a.rottenTomatoes
            );

      return {
        series: [
          {
            name:
              sortCategory === "IMDb"
                ? "IMDb Рейтинг"
                : sortCategory === "Metascore"
                ? "Метаскор"
                : "Rotten Tomatoes Рейтинг",
            data: sortedMovies.map((movie) => ({
              x: `${movie.title_bg} (${movie.title_en})`,
              y:
                sortCategory === "IMDb"
                  ? movie.imdbRating
                  : sortCategory === "Metascore"
                  ? movie.metascore
                  : movie.rottenTomatoes,
              fillColor: movie.type === "movie" ? "#d01616" : "#f28a8a"
            }))
          }
        ],
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            title: {
              text:
                sortCategory === "IMDb"
                  ? "IMDb Рейтинг"
                  : sortCategory === "Metascore"
                  ? "Метаскор"
                  : "Rotten Tomatoes Рейтинг"
            },
            categories: sortedMovies.map(
              (movie) => `${movie.title_bg} (${movie.title_en})`
            )
          }
        }
      };
    }

    return null; // No update if no data
  }

  render() {
    return (
      <div>
        <div className="flex justify-center items-center">
          <div className="flex items-center mr-4">
            <span
              className="w-3 h-3 mr-1 rounded-full inline-block"
              style={{ backgroundColor: "#d01616" }}
            ></span>
            <span>Филм</span>
          </div>
          <div className="flex items-center">
            <span
              className="w-3 h-3 mr-1 rounded-full inline-block"
              style={{ backgroundColor: "#f28a8a" }}
            ></span>
            <span>Сериал</span>
          </div>
        </div>

        {this.state.series && this.state.series.length > 0 ? (
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={320}
          />
        ) : (
          <p>No data available</p>
        )}
      </div>
    );
  }
}

interface AverageScoresStackedBarChartProps {
  averageBoxOfficeAndScores: AverageBoxOfficeAndScores[];
}

export class AverageScoresStackedBarChart extends Component<
  AverageScoresStackedBarChartProps,
  State
> {
  constructor(props: AverageScoresStackedBarChartProps) {
    super(props);

    this.state = {
      series: [
        { name: "Average Box Office", data: [null] },
        { name: "Average Metascore", data: [null] },
        { name: "Average IMDb Rating", data: [null] },
        { name: "Average Rotten Tomatoes", data: [null] }
      ],
      options: {
        chart: {
          type: "bar",
          height: 320,
          stacked: true,
          events: {
            mounted: (chart: any) => {
              chart.windowResizeHandler();
            }
          }
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        colors: ["#845adf", "#23b7e5", "#f5b849", "#38bf94"],
        grid: {
          borderColor: "#f2f5f7"
        },
        xaxis: {
          categories: ["Average Scores"],
          labels: {
            style: {
              colors: "#8c9097",
              fontSize: "11px",
              fontWeight: 600,
              cssClass: "apexcharts-xaxis-label"
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: "#8c9097",
              fontSize: "11px",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-label"
            }
          }
        },
        tooltip: {
          y: {
            formatter: function (val: number | null) {
              return val !== null ? val.toString() : ""; // Display only non-null values
            }
          }
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40
        }
      }
    };
  }

  static getDerivedStateFromProps(
    nextProps: AverageScoresStackedBarChartProps,
    prevState: State
  ) {
    if (
      !nextProps.averageBoxOfficeAndScores ||
      nextProps.averageBoxOfficeAndScores.length === 0
    ) {
      // If data is not yet available, return early to avoid unnecessary state updates
      return null;
    }

    const boxOfficeData = nextProps.averageBoxOfficeAndScores[0];
    const averageBoxOffice =
      parseFloat(boxOfficeData.average_box_office.replace(/[^0-9.-]+/g, "")) /
      1e6;
    const averageMetascore = parseFloat(boxOfficeData.average_metascore);
    const averageIMDbRating = parseFloat(boxOfficeData.average_imdb_rating);
    const averageRottenTomatoes = parseFloat(
      boxOfficeData.average_rotten_tomatoes.replace("%", "")
    );

    const updatedSeries = [
      { name: "Average Box Office (Millions)", data: [averageBoxOffice] },
      { name: "Average Metascore", data: [averageMetascore] },
      { name: "Average IMDb Rating", data: [averageIMDbRating] },
      { name: "Average Rotten Tomatoes (%)", data: [averageRottenTomatoes] }
    ];

    if (JSON.stringify(updatedSeries) !== JSON.stringify(prevState.series)) {
      return { series: updatedSeries };
    }
    return null;
  }

  render() {
    const { averageBoxOfficeAndScores } = this.props;

    // Check if data has been fetched
    if (!averageBoxOfficeAndScores || averageBoxOfficeAndScores.length === 0) {
      return <div>Loading...</div>; // Show loading indicator until data is available
    }

    return (
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        height={320}
      />
    );
  }
}

interface CountryBarProps {
  topCountries: CountryData[] | null; // Allow null until data is fetched
}

export const CountryBarChart: React.FC<CountryBarProps> = ({
  topCountries
}) => {
  if (!topCountries) {
    return <div>Loading...</div>;
  }

  const totalCount = topCountries.reduce(
    (sum, country) => sum + country.count,
    0
  );

  // Generate a color scale based on the number of countries
  const colorScale = chroma
    .scale(["#be1313", "#FF6347", "#FF4500", "#FF1493", "#FF69B4"])
    .mode("lab")
    .domain([0, topCountries.length - 1])
    .colors(topCountries.length)
    .map((color) => chroma(color).darken(0.3).hex());

  // Pagination state
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCountries = topCountries.slice(startIndex, endIndex);

  const totalPages = Math.ceil(topCountries.length / itemsPerPage);

  return (
    <div>
      <div className="flex w-full h-[0.3125rem] mb-6 rounded-full overflow-hidden">
        {topCountries.map((country, index) => {
          const widthPercentage = (country.count / totalCount) * 100;
          const color = colorScale[index]; // Get the color for each country

          return (
            <div
              key={country.country_en}
              className="flex flex-col justify-center overflow-hidden"
              style={{ width: `${widthPercentage}%`, backgroundColor: color }}
              aria-valuenow={widthPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
              title={`${country.country_bg}: ${country.count}`}
            ></div>
          );
        })}
      </div>

      {/* Total Count */}
      <div className="mb-4 text-sm text-gray-500">
        <strong>Общ брой на препоръки:</strong> {totalCount}
      </div>

      {/* External Legend */}
      <ul className="list-none mb-6 pt-2 crm-deals-status flex flex-col">
        {currentCountries.map((country, index) => {
          const color =
            currentPage === 1 ? colorScale[index] : colorScale[index + 5]; // Get the color for each country (based on current page)

          return (
            <li
              key={country.country_en}
              className="flex items-center text-sm mb-2"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }} // Set the correct color for the dots
                aria-label={country.country_en}
              ></div>
              <span className="ml-2">
                {country.country_bg}: {country.count} пъти
              </span>
            </li>
          );
        })}
      </ul>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <nav aria-label="Page navigation" className="pagination-style-4">
            <ul className="ti-pagination mb-0">
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <Link
                    className="page-link"
                    to="#"
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};
