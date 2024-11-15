import { FC, Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  GenrePopularityOverTime,
  Profitearned,
  BoxOfficeVsIMDBRating,
  MovieBarChart,
  CountryBarChart,
  MovieProsperityBubbleChart,
  Treemap,
  TopRecommendationsBarChart
} from "./crmdata";
import { DataType, FilteredTableData } from "../home-types";
import {
  fetchData,
  filterTableData,
  handleProsperityTableClick,
  isDirector,
  isActor,
  isWriter,
  generateHeatmapSeriesData,
  generateScatterSeriesData,
  paginateBarChartData,
  getTotalBarChartPages,
  handleBarChartPageChange,
  handleDropdownClickAverages,
  handleDropdownClickAwards,
  handleMoviesAndSeriesSortCategory,
  handleTopStatsSortCategory
} from "../helper_functions";
import { useMediaQuery } from "react-responsive";

interface CrmProps {}

const Home: FC<CrmProps> = () => {
  // States for holding fetched data
  const [data, setData] = useState<DataType>({
    usersCount: [],
    topRecommendations: [],
    topGenres: [],
    genrePopularityOverTime: {},
    topActors: [],
    topDirectors: [],
    topWriters: [],
    oscarsByMovie: [],
    totalAwardsByMovieOrSeries: [],
    totalAwards: [],
    sortedDirectorsByProsperity: [],
    sortedActorsByProsperity: [],
    sortedWritersByProsperity: [],
    sortedMoviesByProsperity: [],
    sortedMoviesAndSeriesByMetascore: [],
    sortedMoviesAndSeriesByIMDbRating: [],
    sortedMoviesAndSeriesByRottenTomatoesRating: [],
    averageBoxOfficeAndScores: [],
    topCountries: []
  });

  const [displayedNameAwards, setDisplayedNameAwards] = useState(
    "Общ брой спечелени награди"
  );
  const [displayedValueAverages, setDisplayedValueAverages] =
    useState<number>(0);
  const [displayedNameAverages, setDisplayedNameAverages] =
    useState("Среден Боксофис");

  const [isAveragesMenuOpen, setIsAveragesMenuOpen] = useState(false);
  const [isAwardsMenuOpen, setIsAwardsMenuOpen] = useState(false);

  const [displayedValueAwards, setDisplayedValueAwards] = useState<number>(0);
  // Table data filtering and pagination
  const [filteredTableData, setFilteredTableData] = useState<FilteredTableData>(
    []
  );
  const pageSize = 5; // Number of entries per page for the chartaa
  const [currentChartPage, setCurrentChartPage] = useState(1); // Current page for the chart
  const [currentTopChartPage, setCurrentTopChartPage] = useState(1); // Current page for the chart
  const [seriesDataForMovieBarChart, setSeriesDataForMovieBarChart] = useState<
    any[]
  >([]);
  const [seriesDataForTopStatsBarChart, setSeriesDataForTopStatsChart] =
    useState<any[]>([]);
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const itemsPerTablePage = 5;
  const [currentTableItems, setCurrentTableItems] = useState<FilteredTableData>(
    []
  );
  const [prosperitySortCategory, setProsperitySortCategory] =
    useState("Directors");

  const [moviesAndSeriesSortCategory, setMoviesAndSeriesSortCategory] =
    useState("IMDb");

  const [topStatsSortCategory, setTopStatsSortCategory] = useState("Actors");
  // User data state
  const [userData, setUserData] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    email: ""
  });

  // Pagination logic
  const totalItems = filteredTableData.length;
  const totalTablePages = Math.ceil(totalItems / itemsPerTablePage);

  // Data fetching for user and platform stats (combined into one useEffect)
  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      fetchData(
        token,
        prosperitySortCategory,
        setUserData,
        setData,
        setFilteredTableData
      );
      console.log("fetching");
    }
  }, [prosperitySortCategory]);

  useEffect(() => {
    if (
      data.totalAwards.length > 0 &&
      data.averageBoxOfficeAndScores.length > 0
    ) {
      setDisplayedValueAwards(data.totalAwards[0].total_awards_wins);
      setDisplayedValueAverages(
        data.averageBoxOfficeAndScores[0].average_box_office
      );
      console.log(
        "BAR CHART RECOMMENDATIONS SHIT ---->",
        data.topRecommendations
      );
    }
  }, [data]);

  // Updated useEffect to sort data based on selected category
  useEffect(() => {
    const sortedData =
      moviesAndSeriesSortCategory === "IMDb"
        ? data.sortedMoviesAndSeriesByIMDbRating
        : moviesAndSeriesSortCategory === "Metascore"
        ? data.sortedMoviesAndSeriesByMetascore
        : data.sortedMoviesAndSeriesByRottenTomatoesRating;

    const paginatedDataForMovieBarChart = paginateBarChartData(
      sortedData,
      currentChartPage,
      pageSize,
      moviesAndSeriesSortCategory
    );
    const paginatedDataForTopStats = paginateBarChartData(
      data.topRecommendations,
      currentTopChartPage,
      pageSize
    );
    setSeriesDataForMovieBarChart(paginatedDataForMovieBarChart);
    setSeriesDataForTopStatsChart(paginatedDataForTopStats);
  }, [
    currentChartPage,
    currentTopChartPage,
    moviesAndSeriesSortCategory,
    topStatsSortCategory,
    data
  ]);

  // Fetch filtered table data based on category
  useEffect(() => {
    const newItems = filterTableData(
      filteredTableData,
      prosperitySortCategory,
      currentTablePage,
      itemsPerTablePage
    );
    setCurrentTableItems(newItems);
  }, [currentTablePage, prosperitySortCategory, filteredTableData]);

  // Generate the seriesData for heatmap
  const seriesDataForHeatmap = generateHeatmapSeriesData(
    data.genrePopularityOverTime
  );
  const seriesDataForScatterChart = generateScatterSeriesData(
    data.sortedMoviesByProsperity
  );

  const awardOptions = [
    {
      label: "Общ брой спечелени награди",
      value: data.totalAwards?.[0]?.total_awards_wins || 0
    },
    {
      label: "Общ брой номинации за награди",
      value: data.totalAwards?.[0]?.total_awards_nominations || 0
    },
    {
      label: "Общ брой спечелени Оскари",
      value: data.totalAwards?.[0]?.total_oscar_wins || 0
    },
    {
      label: "Общ брой номинации за Оскари",
      value: data.totalAwards?.[0]?.total_oscar_nominations || 0
    }
  ];

  const averagesOptions = [
    {
      label: "Среден Боксофис",
      value: data.averageBoxOfficeAndScores?.[0]?.average_box_office || 0
    },
    {
      label: "Среден Метаскор",
      value: data.averageBoxOfficeAndScores?.[0]?.average_metascore || 0
    },
    {
      label: "Среден IMDb Рейтинг",
      value: data.averageBoxOfficeAndScores?.[0]?.average_imdb_rating || 0
    },
    {
      label: "Среден Rotten Tomatoes Рейтинг",
      value: data.averageBoxOfficeAndScores?.[0]?.average_rotten_tomatoes || 0
    }
  ];
  // Total number of pages for pagination
  const totalChartPages = getTotalBarChartPages(
    data.sortedMoviesAndSeriesByIMDbRating.length,
    pageSize
  );

  const totalTopChartPages = getTotalBarChartPages(
    data.topRecommendations.length,
    pageSize
  );

  const handlePrevChartPage = () => {
    handleBarChartPageChange(
      "prev",
      currentChartPage,
      pageSize,
      data.sortedMoviesAndSeriesByIMDbRating.length,
      setCurrentChartPage
    );
  };

  const handleNextChartPage = () => {
    handleBarChartPageChange(
      "next",
      currentChartPage,
      pageSize,
      data.sortedMoviesAndSeriesByIMDbRating.length,
      setCurrentChartPage
    );
  };

  const handlePrevTopChartPage = () => {
    handleBarChartPageChange(
      "prev",
      currentTopChartPage,
      pageSize,
      data.topRecommendations.length,
      setCurrentTopChartPage
    );
  };

  const handleNextTopChartPage = () => {
    handleBarChartPageChange(
      "next",
      currentTopChartPage,
      pageSize,
      data.topRecommendations.length,
      setCurrentTopChartPage
    );
  };

  const handleNextTablePage = () => {
    if (currentTablePage < totalTablePages) {
      setCurrentTablePage((prev) => prev + 1);
    }
  };

  // Handle Previous Page Logic
  const handlePrevTablePage = () => {
    if (currentTablePage > 1) {
      setCurrentTablePage((prev) => prev - 1);
    }
  };

  const handleCategoryChange = (category: string) => {
    // Switch the filtered data based on the selected category
    setFilteredTableData(data[`sorted${category}ByProsperity`]);
    setProsperitySortCategory(category);
  };

  const toggleAwardsMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsAwardsMenuOpen((prev) => !prev);
  };

  const toggleAveragesMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsAveragesMenuOpen((prev) => !prev);
  };

  const tableCategoryDisplayNames: Record<
    "Directors" | "Actors" | "Writers",
    string
  > = {
    Directors: "Режисьори",
    Actors: "Актьори",
    Writers: "Сценаристи"
  };

  const moviesAndSeriesCategoryDisplayNames: Record<
    "IMDb" | "Metascore" | "RottenTomatoes",
    string
  > = {
    IMDb: "IMDb Рейтинг",
    Metascore: "Метаскор",
    RottenTomatoes: "Rotten Tomatoes Рейтинг"
  };

  const is1803 = useMediaQuery({ query: "(max-width: 1803px)" });
  const is1441 = useMediaQuery({ query: "(max-width: 1441px)" });
  const is1461 = useMediaQuery({ query: "(max-width: 1461px)" });
  const is1546 = useMediaQuery({ query: "(max-width: 1546px)" });
  const is1675 = useMediaQuery({ query: "(max-width: 1675px)" });

  console.log("seriesDataForScatterChart: ", seriesDataForScatterChart);
  return (
    <Fragment>
      <div className="md:flex block items-center justify-between my-[1.5rem] page-header-breadcrumb">
        <div>
          <p className="font-semibold text-[1.125rem] text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-0 ">
            Здравейте, {userData.first_name} {userData.last_name}!
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-6">
        {!is1803 ? (
          <>
            <div className="xxl:col-span-3 xl:col-span-3 col-span-12">
              <div className="box custom-box">
                <div className="box-body">
                  <div className="flex flex-wrap items-start justify-between">
                    <div className="flex-grow">
                      <p className="mb-0 text-[#8c9097] dark:text-white/50">
                        Общ брой потребители
                      </p>
                      <div className="flex items-center">
                        <span className="text-[1.25rem] font-semibold">
                          {data.usersCount?.[0]?.user_count || 0}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="avatar avatar-md !rounded-full bg-primary/10 !text-secondary text-[1.125rem]">
                        <i className="bi bi-person text-primary text-[1rem]"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xxl:col-span-3 xl:col-span-3 col-span-12">
              <div className="box custom-box">
                <div className="box-body">
                  <div className="flex flex-wrap items-start justify-between">
                    <div className="flex-grow">
                      <p className="mb-0 text-[#8c9097] dark:text-white/50">
                        Най-препоръчан жанр
                      </p>
                      <div className="flex items-center">
                        <span className="text-[1.25rem] font-semibold">
                          {data.topGenres[0]?.genre_bg}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="avatar avatar-md !rounded-full bg-primary/10 !text-secondary text-[1.125rem]">
                        <i className="bi bi-film text-primary text-[1rem]"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xxl:col-span-3 xl:col-span-3 col-span-12">
              <div className="box custom-box">
                <div className="box-body">
                  <div className="flex flex-wrap items-start justify-between">
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-start">
                        <div className="flex items-center space-x-2">
                          <p className="mb-0 text-[#8c9097] dark:text-white/50">
                            {displayedNameAverages}
                          </p>
                          <div className="hs-dropdown ti-dropdown">
                            <Link
                              to="#"
                              className="flex items-center px-1 py-0.5 text-xs font-medium text-primary border border-primary rounded-sm hover:bg-primary/10 transition-all"
                              onClick={toggleAveragesMenu}
                              aria-expanded={
                                isAveragesMenuOpen ? "true" : "false"
                              }
                            >
                              Сортирай по
                              <i
                                className={`ri-arrow-${
                                  isAveragesMenuOpen ? "up" : "down"
                                }-s-line align-middle ms-1 inline-block`}
                              ></i>
                            </Link>
                            <ul
                              className={`hs-dropdown-menu ti-dropdown-menu ${
                                isAveragesMenuOpen ? "block" : "hidden"
                              }`}
                              role="menu"
                            >
                              {averagesOptions.map(({ label, value }) => (
                                <li key={label}>
                                  <Link
                                    onClick={() =>
                                      handleDropdownClickAverages(
                                        setDisplayedNameAverages,
                                        setDisplayedValueAverages,
                                        label,
                                        value
                                      )
                                    }
                                    className={`ti-dropdown-item ${
                                      displayedNameAverages === label
                                        ? "active"
                                        : ""
                                    } ${
                                      displayedNameAverages === label
                                        ? "disabled"
                                        : ""
                                    }`}
                                    to="#"
                                  >
                                    {label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-[1.25rem] font-semibold">
                          {displayedValueAverages}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="avatar avatar-md !rounded-full bg-primary/10 !text-secondary text-[1.125rem]">
                        <i
                          className={`bi bi-${
                            displayedNameAverages == "Среден Боксофис"
                              ? "ticket-perforated"
                              : "bi bi-clipboard-data"
                          } text-[1rem] text-primary`}
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xxl:col-span-3 xl:col-span-3 col-span-12">
              <div className="box custom-box">
                <div className="box-body">
                  <div className="flex flex-wrap items-start justify-between">
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-start">
                        <div className="flex items-center space-x-2">
                          <p className="mb-0 text-[#8c9097] dark:text-white/50">
                            {displayedNameAwards}
                          </p>
                          <div className="hs-dropdown ti-dropdown">
                            <Link
                              to="#"
                              className="flex items-center px-1 py-0.5 text-xs font-medium text-primary border border-primary rounded-sm hover:bg-primary/10 transition-all"
                              onClick={toggleAwardsMenu}
                              aria-expanded={
                                isAveragesMenuOpen ? "true" : "false"
                              }
                            >
                              Сортирай по
                              <i
                                className={`ri-arrow-${
                                  isAwardsMenuOpen ? "up" : "down"
                                }-s-line align-middle ms-1 inline-block`}
                              ></i>
                            </Link>
                            <ul
                              className={`hs-dropdown-menu ti-dropdown-menu ${
                                isAwardsMenuOpen ? "block" : "hidden"
                              }`}
                              role="menu"
                            >
                              {awardOptions.map(({ label, value }) => (
                                <li key={label}>
                                  <Link
                                    onClick={() =>
                                      handleDropdownClickAwards(
                                        setDisplayedNameAwards,
                                        setDisplayedValueAwards,
                                        label,
                                        value
                                      )
                                    }
                                    className={`ti-dropdown-item ${
                                      displayedNameAwards === label
                                        ? "active"
                                        : ""
                                    } ${
                                      displayedNameAwards === label
                                        ? "disabled"
                                        : ""
                                    }`}
                                    to="#"
                                  >
                                    {label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-[1.25rem] font-semibold">
                          {displayedValueAwards}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="avatar avatar-md !rounded-full bg-primary/10 !text-secondary text-[1.125rem]">
                        <i className="bi bi-trophy text-[1rem] text-primary"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="xxl:col-span-3 xl:col-span-3 col-span-12">
              <div className="box custom-box">
                <div className="box-body h-[5.5rem]">
                  <div className="flex items-center justify-between">
                    <div className="flex-grow">
                      <p className="mb-0 text-[#8c9097] dark:text-white/50 text-xs">
                        Общ брой потребители
                      </p>
                      <div className="flex items-center">
                        <span className="text-[1.125rem] font-semibold">
                          {data.usersCount?.[0]?.user_count || 0}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="avatar avatar-md !rounded-full bg-primary/10 !text-secondary text-[1.125rem]">
                        <i className="bi bi-person text-primary text-[0.875rem]"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="xxl:col-span-3 xl:col-span-3 col-span-12">
              <div className="box custom-box">
                <div className="box-body h-[5.5rem]">
                  <div className="flex items-center justify-between">
                    <div className="flex-grow">
                      <p className="mb-0 text-[#8c9097] dark:text-white/50 text-xs">
                        Най-препоръчан жанр
                      </p>
                      <div className="flex items-center">
                        <span className="text-[1.125rem] font-semibold">
                          {data.topGenres[0]?.genre_bg}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="avatar avatar-md !rounded-full bg-primary/10 !text-secondary text-[1.125rem]">
                        <i className="bi bi-film text-primary text-[0.875rem]"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="xxl:col-span-3 xl:col-span-3 col-span-12">
              <div className="box custom-box">
                <div className="box-body h-[5.5rem]">
                  <div className="flex items-center justify-between">
                    <div className="flex-grow">
                      <div className="flex items-center space-x-2">
                        <p className="mb-0 text-[#8c9097] dark:text-white/50 truncate overflow-hidden max-w-[130px] whitespace-nowrap text-xs">
                          {displayedNameAverages}
                        </p>
                        <div className="hs-dropdown ti-dropdown">
                          <Link
                            to="#"
                            className="flex items-center px-0.5 py-0.25 text-[0.70rem] font-medium text-primary border border-primary rounded-sm hover:bg-primary/10 transition-all"
                            onClick={toggleAveragesMenu}
                            aria-expanded={
                              isAveragesMenuOpen ? "true" : "false"
                            }
                          >
                            {is1441 ? (
                              <i
                                className={`ri-arrow-${
                                  isAveragesMenuOpen ? "up" : "down"
                                }-s-line text-sm`}
                              ></i>
                            ) : (
                              <>
                                <span>Сортирай по</span>
                                <i
                                  className={`ri-arrow-${
                                    isAveragesMenuOpen ? "up" : "down"
                                  }-s-line ml-0.5 text-sm`}
                                ></i>
                              </>
                            )}
                          </Link>
                          <ul
                            className={`hs-dropdown-menu ti-dropdown-menu ${
                              isAveragesMenuOpen ? "block" : "hidden"
                            }`}
                            role="menu"
                          >
                            {averagesOptions.map(({ label, value }) => (
                              <li key={label}>
                                <Link
                                  onClick={() =>
                                    handleDropdownClickAverages(
                                      setDisplayedNameAverages,
                                      setDisplayedValueAverages,
                                      label,
                                      value
                                    )
                                  }
                                  className={`ti-dropdown-item ${
                                    displayedNameAverages === label
                                      ? "active"
                                      : ""
                                  } ${
                                    displayedNameAverages === label
                                      ? "disabled"
                                      : ""
                                  }`}
                                  to="#"
                                >
                                  {label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-[1.125rem] font-semibold">
                          {displayedValueAverages}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="avatar avatar-md !rounded-full bg-primary/10 !text-secondary text-[1.125rem]">
                        <i
                          className={`bi bi-${
                            displayedNameAverages == "Среден Боксофис"
                              ? "ticket-perforated"
                              : "bi bi-clipboard-data"
                          } text-[0.875rem] text-primary`}
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xxl:col-span-3 xl:col-span-3 col-span-12">
              <div className="box custom-box">
                <div className="box-body h-[5.5rem]">
                  <div className="flex items-center justify-between">
                    <div className="flex-grow">
                      <div className="flex items-center space-x-1">
                        <p className="mb-0 text-[#8c9097] dark:text-white/50 truncate overflow-hidden max-w-[130px] whitespace-nowrap text-xs">
                          {displayedNameAwards}
                        </p>
                        <div className="hs-dropdown ti-dropdown">
                          <Link
                            to="#"
                            className="flex items-center px-0.5 py-0.25 text-[0.70rem] font-medium text-primary border border-primary rounded-sm hover:bg-primary/10 transition-all"
                            onClick={toggleAwardsMenu}
                          >
                            {is1441 ? (
                              <i
                                className={`ri-arrow-${
                                  isAwardsMenuOpen ? "up" : "down"
                                }-s-line text-sm`}
                              ></i>
                            ) : (
                              <>
                                <span>Сортирай по</span>
                                <i
                                  className={`ri-arrow-${
                                    isAwardsMenuOpen ? "up" : "down"
                                  }-s-line ml-0.5 text-sm`}
                                ></i>
                              </>
                            )}
                          </Link>
                          <ul
                            className={`hs-dropdown-menu ti-dropdown-menu ${
                              isAwardsMenuOpen ? "block" : "hidden"
                            }`}
                            role="menu"
                          >
                            {awardOptions.map(({ label, value }) => (
                              <li key={label}>
                                <Link
                                  onClick={() =>
                                    handleDropdownClickAwards(
                                      setDisplayedNameAwards,
                                      setDisplayedValueAwards,
                                      label,
                                      value
                                    )
                                  }
                                  className={`ti-dropdown-item ${
                                    displayedNameAwards === label
                                      ? "active"
                                      : ""
                                  } ${
                                    displayedNameAwards === label
                                      ? "disabled"
                                      : ""
                                  }`}
                                  to="#"
                                >
                                  {label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-[1.125rem] font-semibold">
                          {displayedValueAwards}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="avatar avatar-md !rounded-full bg-primary/10 !text-secondary text-[1.125rem]">
                        <i className="bi bi-trophy text-[0.875rem] text-primary"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="xxl:col-span-6 col-span-12">
          <div className="xxl:col-span-6 col-span-12">
            <div className="xl:col-span-6 col-span-12">
              <div className="box custom-box h-[28rem]">
                <div className="box-header">
                  <div className="box-title">
                    Най-успешни филми по IMDb Рейтинг и Боксофис
                  </div>
                </div>
                <div className="box-body">
                  <div id="bubble-simple">
                    <MovieProsperityBubbleChart
                      sortedMoviesByProsperity={data.sortedMoviesByProsperity}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
              <div className="box">
                <div className="box-header !gap-0 !m-0 justify-between">
                  <div className="box-title">
                    Популярност на жанровете през времето
                  </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                  <div className="box custom-box">
                    <div className="box-body">
                      <div id="heatmap-colorrange">
                        <GenrePopularityOverTime
                          seriesData={seriesDataForHeatmap}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:col-span-6 col-span-12">
              <div className="box custom-box">
                <div className="custom-box-header justify-between">
                  <div
                    className="box-title"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth:
                        window.innerWidth < 1400
                          ? "100%"
                          : is1675
                          ? is1461
                            ? "200px"
                            : "250px"
                          : "100%"
                    }}
                  >
                    Филми{" "}
                    {!(moviesAndSeriesSortCategory === "Metascore") &&
                      "и сериали"}{" "}
                    по{" "}
                    {
                      moviesAndSeriesCategoryDisplayNames[
                        moviesAndSeriesSortCategory as keyof typeof moviesAndSeriesCategoryDisplayNames
                      ]
                    }
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <div
                      className="inline-flex rounded-md shadow-sm"
                      role="group"
                      aria-label="Sort By"
                    >
                      {["IMDb", "Metascore", "RottenTomatoes"].map(
                        (category, index) => (
                          <button
                            key={category}
                            type="button"
                            className={`ti-btn-group !border-0 !text-xs !py-2 !px-3 ${
                              category === moviesAndSeriesSortCategory
                                ? "ti-btn-primary-full text-white"
                                : "text-[#CC3333] bg-[#be1313] bg-opacity-10"
                            } ${
                              index === 0
                                ? "rounded-l-md"
                                : index === 2
                                ? "rounded-r-md"
                                : ""
                            }`}
                            onClick={() =>
                              handleMoviesAndSeriesSortCategory(
                                category,
                                setMoviesAndSeriesSortCategory
                              )
                            }
                          >
                            {
                              moviesAndSeriesCategoryDisplayNames[
                                category as keyof typeof moviesAndSeriesCategoryDisplayNames
                              ]
                            }
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="box-body h-[21.75rem]">
                  <div id="bar-basic">
                    <MovieBarChart
                      seriesData={seriesDataForMovieBarChart}
                      category={moviesAndSeriesSortCategory}
                    />
                  </div>
                </div>
                <div className="box-footer">
                  <div className="sm:flex items-center">
                    <div
                      className={`text-defaulttextcolor dark:text-defaulttextcolor/70 text-[${
                        is1546 ? "0.65rem" : "0.70rem"
                      }]`}
                    >
                      Показване на резултати от{" "}
                      <b>
                        {currentChartPage === 1
                          ? 1
                          : (currentChartPage - 1) * 5 + 1}{" "}
                      </b>
                      до{" "}
                      <b>
                        {currentChartPage === totalChartPages
                          ? data.sortedMoviesAndSeriesByIMDbRating.length
                          : currentChartPage * 5}{" "}
                      </b>
                      от общо{" "}
                      <b>{data.sortedMoviesAndSeriesByIMDbRating.length}</b>{" "}
                      (Страница <b>{currentChartPage}</b> )
                      <i className="bi bi-arrow-right ms-2 font-semibold"></i>
                    </div>
                    <div className="ms-auto">
                      <nav
                        aria-label="Page navigation"
                        className="pagination-style-4"
                      >
                        <ul className="ti-pagination mb-0">
                          <li
                            className={`page-item ${
                              currentChartPage === 1 ? "disabled" : ""
                            }`}
                          >
                            <Link
                              className="page-link"
                              to="#"
                              onClick={handlePrevChartPage}
                              style={{
                                padding: "0.25rem 0.5rem",
                                fontSize: "0.8rem",
                                lineHeight: "1.25"
                              }}
                            >
                              Предишна
                            </Link>
                          </li>
                          {[...Array(totalChartPages)].map((_, index) => (
                            <li
                              key={index}
                              className={`page-item ${
                                currentChartPage === index + 1 ? "active" : ""
                              }`}
                            >
                              <Link
                                className="page-link"
                                to="#"
                                onClick={() => setCurrentChartPage(index + 1)}
                                style={{
                                  padding: "0.25rem 0.5rem",
                                  fontSize: "0.8rem",
                                  lineHeight: "1.25"
                                }}
                              >
                                {index + 1}
                              </Link>
                            </li>
                          ))}
                          <li
                            className={`page-item ${
                              currentChartPage === totalChartPages
                                ? "disabled"
                                : ""
                            }`}
                          >
                            <Link
                              className="page-link"
                              to="#"
                              onClick={handleNextChartPage}
                              style={{
                                padding: "0.25rem 0.5rem",
                                fontSize: "0.8rem",
                                lineHeight: "1.25"
                              }}
                            >
                              Следваща
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="xxl:col-span-6 xl:col-span-12  col-span-12">
          <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
            <div className="box custom-card">
              <div className="box-header justify-between">
                <div className="box-title">
                  {
                    tableCategoryDisplayNames[
                      prosperitySortCategory as keyof typeof tableCategoryDisplayNames
                    ]
                  }{" "}
                  по просперитет
                </div>
                <div className="flex flex-wrap gap-2">
                  <div
                    className="inline-flex rounded-md shadow-sm"
                    role="group"
                    aria-label="Sort By"
                  >
                    {["Directors", "Actors", "Writers"].map(
                      (category, index) => (
                        <button
                          key={category}
                          type="button"
                          className={`ti-btn-group !border-0 !text-xs !py-2 !px-3 ${
                            category === prosperitySortCategory
                              ? "ti-btn-primary-full text-white"
                              : "text-[#CC3333] bg-[#be1313] bg-opacity-10"
                          } ${
                            index === 0
                              ? "rounded-l-md"
                              : index === 2
                              ? "rounded-r-md"
                              : ""
                          }`}
                          onClick={() => handleCategoryChange(category)} // Change this line
                        >
                          {
                            tableCategoryDisplayNames[
                              category as keyof typeof tableCategoryDisplayNames
                            ]
                          }
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="box-body">
                <div className="overflow-x-auto">
                  <table
                    key={prosperitySortCategory}
                    className="table min-w-full whitespace-nowrap table-hover border table-bordered"
                  >
                    <thead>
                      <tr className="border border-inherit border-solid dark:border-defaultborder/10">
                        <th
                          scope="col"
                          className="!text-start !text-[0.85rem] w-[40px]"
                        >
                          #
                        </th>
                        <th scope="col" className="!text-start !text-[0.85rem]">
                          {
                            tableCategoryDisplayNames[
                              prosperitySortCategory as keyof typeof tableCategoryDisplayNames
                            ]
                          }
                        </th>
                        <th scope="col" className="!text-start !text-[0.85rem]">
                          Просперитетен рейтинг
                        </th>
                        <th scope="col" className="!text-start !text-[0.85rem]">
                          IMDb рейтинг
                        </th>
                        <th scope="col" className="!text-start !text-[0.85rem]">
                          Боксофис
                        </th>
                        <th scope="col" className="!text-start !text-[0.85rem]">
                          Брой филми
                        </th>
                        <th scope="col" className="!text-start !text-[0.85rem]">
                          Общо препоръки
                        </th>
                        <th scope="col" className="!text-start !text-[0.85rem]">
                          Победи на награди
                        </th>
                        <th scope="col" className="!text-start !text-[0.85rem]">
                          Номинации за награди
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTableItems.map((item, index) => (
                        <tr
                          key={index}
                          className="border border-inherit border-solid hover:bg-gray-100 dark:border-defaultborder/10 dark:hover:bg-light"
                        >
                          <td>{(currentTablePage - 1) * 5 + index + 1}</td>
                          <td>
                            {isDirector(item)
                              ? item.director_bg
                              : isActor(item)
                              ? item.actor_bg
                              : isWriter(item)
                              ? item.writer_bg
                              : ""}
                          </td>
                          <td>{item.prosperityScore}</td>
                          <td>{item.avg_imdb_rating}</td>
                          <td>{item.total_box_office}</td>
                          <td>{item.movie_count}</td>
                          <td>{item.total_recommendations}</td>
                          <td>{item.total_wins}</td>
                          <td>{item.total_nominations}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="box-footer">
                <div className="sm:flex items-center">
                  <div
                    className={`text-defaulttextcolor dark:text-defaulttextcolor/70 text-[${
                      is1546 ? "0.6rem" : "0.75rem"
                    }]`}
                  >
                    Показване на резултати от{" "}
                    <b>
                      {currentTablePage === 1
                        ? 1
                        : (currentTablePage - 1) * 5 + 1}{" "}
                    </b>
                    до{" "}
                    <b>
                      {currentTablePage === totalTablePages
                        ? totalItems
                        : currentTablePage * 5}{" "}
                    </b>
                    от общо <b>{totalItems}</b> ( Страница{" "}
                    <b>{currentTablePage}</b> )
                    <i className="bi bi-arrow-right ms-2 font-semibold"></i>
                  </div>
                  <div className="ms-auto">
                    <nav
                      aria-label="Page navigation"
                      className="pagination-style-4"
                    >
                      <ul className="ti-pagination mb-0">
                        <li
                          className={`page-item ${
                            currentTablePage === 1 ? "disabled" : ""
                          }`}
                          style={{ marginRight: "0.25rem" }} // Adjust space between items
                        >
                          <Link
                            className="page-link"
                            to="#"
                            onClick={handlePrevTablePage}
                            style={{
                              padding: "0.25rem 0.5rem",
                              fontSize: "0.8rem",
                              lineHeight: "1.25"
                            }}
                          >
                            Предишна
                          </Link>
                        </li>
                        {[...Array(totalTablePages)].map((_, index) => (
                          <li
                            key={index}
                            className={`page-item ${
                              currentTablePage === index + 1 ? "active" : ""
                            }`}
                            style={{ marginRight: "0.25rem" }} // Adjust space between items
                          >
                            <Link
                              className="page-link"
                              to="#"
                              onClick={() => setCurrentTablePage(index + 1)}
                              style={{
                                padding: "0.25rem 0.5rem",
                                fontSize: "0.8rem",
                                lineHeight: "1.25"
                              }}
                            >
                              {index + 1}
                            </Link>
                          </li>
                        ))}
                        <li
                          className={`page-item ${
                            currentTablePage === totalTablePages
                              ? "disabled"
                              : ""
                          }`}
                          style={{ marginRight: "0.25rem" }} // Adjust space between items
                        >
                          <Link
                            className="page-link"
                            to="#"
                            onClick={handleNextTablePage}
                            style={{
                              padding: "0.25rem 0.5rem",
                              fontSize: "0.8rem",
                              lineHeight: "1.25"
                            }}
                          >
                            Следваща
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:col-span-6 col-span-12">
            <div className="box custom-box]">
              <div className="custom-box-header">
                <div className="box-title">Най-често препоръчани филми</div>
              </div>
              <div className="box-body h-[22rem]">
                <div id="donut-simple">
                  <TopRecommendationsBarChart
                    seriesData={seriesDataForTopStatsBarChart}
                  />
                </div>
              </div>
              <div className="box-footer">
                <div className="sm:flex items-center">
                  <div
                    className={`text-defaulttextcolor dark:text-defaulttextcolor/70 text-[${
                      is1546 ? "0.65rem" : "0.70rem"
                    }]`}
                  >
                    Показване на резултати от{" "}
                    <b>
                      {currentTopChartPage === 1
                        ? 1
                        : (currentTopChartPage - 1) * 5 + 1}{" "}
                    </b>
                    до{" "}
                    <b>
                      {currentTopChartPage === totalTopChartPages
                        ? data.topRecommendations.length
                        : currentTopChartPage * 5}{" "}
                    </b>
                    от общо <b>{data.topRecommendations.length}</b> ( Страница{" "}
                    <b>{currentTopChartPage}</b> )
                    <i className="bi bi-arrow-right ms-2 font-semibold"></i>
                  </div>
                  <div className="ms-auto">
                    <nav
                      aria-label="Page navigation"
                      className="pagination-style-4"
                    >
                      <ul className="ti-pagination mb-0">
                        <li
                          className={`page-item ${
                            currentTopChartPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <Link
                            className="page-link"
                            to="#"
                            onClick={handlePrevTopChartPage}
                            style={{
                              padding: "0.25rem 0.5rem",
                              fontSize: "0.8rem",
                              lineHeight: "1.25"
                            }}
                          >
                            Предишна
                          </Link>
                        </li>
                        {[...Array(totalTopChartPages)].map((_, index) => (
                          <li
                            key={index}
                            className={`page-item ${
                              currentTopChartPage === index + 1 ? "active" : ""
                            }`}
                          >
                            <Link
                              className="page-link"
                              to="#"
                              onClick={() => setCurrentTopChartPage(index + 1)}
                              style={{
                                padding: "0.25rem 0.5rem",
                                fontSize: "0.8rem",
                                lineHeight: "1.25"
                              }}
                            >
                              {index + 1}
                            </Link>
                          </li>
                        ))}
                        <li
                          className={`page-item ${
                            currentTopChartPage === totalTopChartPages
                              ? "disabled"
                              : ""
                          }`}
                        >
                          <Link
                            className="page-link"
                            to="#"
                            onClick={handleNextTopChartPage}
                            style={{
                              padding: "0.25rem 0.5rem",
                              fontSize: "0.8rem",
                              lineHeight: "1.25"
                            }}
                          >
                            Следваща
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:col-span-6 col-span-12">
            <div className="box custom-box h-[30rem]">
              <div className="box-header justify-between">
                <div className="box-title">
                  {
                    tableCategoryDisplayNames[
                      topStatsSortCategory as keyof typeof tableCategoryDisplayNames
                    ]
                  }{" "}
                  по бройка
                </div>
                <div className="flex flex-wrap gap-2">
                  <div
                    className="inline-flex rounded-md shadow-sm"
                    role="group"
                    aria-label="Sort By"
                  >
                    {["Actors", "Directors", "Writers"].map(
                      (category, index) => (
                        <button
                          key={category}
                          type="button"
                          className={`ti-btn-group !border-0 !text-xs !py-2 !px-3 ${
                            category === topStatsSortCategory
                              ? "ti-btn-primary-full text-white"
                              : "text-[#CC3333] bg-[#be1313] bg-opacity-10"
                          } ${
                            index === 0
                              ? "rounded-l-md"
                              : index === 2
                              ? "rounded-r-md"
                              : ""
                          }`}
                          onClick={() =>
                            handleTopStatsSortCategory(
                              category,
                              setTopStatsSortCategory
                            )
                          }
                        >
                          {
                            tableCategoryDisplayNames[
                              category as keyof typeof tableCategoryDisplayNames
                            ]
                          }
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="box-body flex justify-center items-center">
                <div id="treemap-basic" className="w-full">
                  <Treemap
                    data={
                      topStatsSortCategory === "Actors"
                        ? data.topActors
                        : topStatsSortCategory === "Directors"
                        ? data.topDirectors
                        : data.topWriters
                    }
                    role={topStatsSortCategory}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="xxl:col-span-12 xl:col-span-6  col-span-12">
            <div className="box">
              <div className="box-header justify-between">
                <div className="box-title">
                  {" "}
                  Топ държави с най-много препоръки
                </div>
              </div>
              <div className="box-body">
                <CountryBarChart topCountries={data?.topCountries} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-6"></div>
      <div className="transition fixed inset-0 z-50 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 opacity-0 hidden"></div>
    </Fragment>
  );
};

export default Home;
