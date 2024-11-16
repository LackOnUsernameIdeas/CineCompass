import React, { FC, useState } from "react";
import { FaStar } from "react-icons/fa";
import { SiRottentomatoes } from "react-icons/si";
export interface Rating {
  Source: string;
  Value: string;
}

const fakeMovieData = [
  {
    title: "Birdman or (The Unexpected Virtue of Ignorance)",
    bgName: "Бърдмен или неочакваната добродетел на невежеството",
    description:
      "Следи забравен актьор, известен с ролята си на популярен супергерой, който се опитва да възстанови кариерата си чрез участие в постановка на Бродуей.",
    reason:
      "Филмът предлага комплексно разглеждане на идентичността и славата, представено чрез бавноразвиващ се сценарий, който ще отговори на вашата любознателност и стремеж за по-дълбоки истории.",
    year: "2014",
    rated: "R",
    released: "14 Nov 2014",
    runtime: "119 min",
    runtimeGoogle: "1ч 59м",
    genre: "Comedy, Drama",
    director: "Alejandro G. Iñárritu",
    writer: "Alejandro G. Iñárritu, Nicolás Giacobone, Alexander Dinelaris",
    actors: "Michael Keaton, Zach Galifianakis, Edward Norton",
    plot: "Actor Riggan Thomson, most famous for his role as the comic book superhero Birdman, struggles to reclaim artistic integrity through a daring Broadway production.",
    language: "English",
    country: "United States",
    awards: "Won 4 Oscars. 192 wins & 294 nominations total",
    poster:
      "https://m.media-amazon.com/images/M/MV5BODAzNDMxMzAxOV5BMl5BanBnXkFtZTgwMDMxMjA4MjE@._V1_SX300.jpg",
    ratings: [
      { Source: "Internet Movie Database", Value: "7.7/10" },
      { Source: "Rotten Tomatoes", Value: "91%" },
      { Source: "Metacritic", Value: "87/100" }
    ],
    metascore: "87",
    imdbRating: "7.7",
    imdbVotes: "674,508",
    imdbID: "tt2562232",
    type: "movie",
    boxOffice: "$42,340,598"
  },
  {
    title: "The Grand Budapest Hotel",
    bgName: "Гранд Будапеща хотел",
    description:
      "История за легендарен консиерж и младия му протеже, които се замесват в кражба на ценна картина и наследствено богатство.",
    reason:
      "Филмът предлага визуално пиршество с уникален хумор и дълбоки тематични послания за приятелството и лоялността.",
    year: "2014",
    rated: "R",
    released: "28 Mar 2014",
    runtime: "99 min",
    runtimeGoogle: "1ч 39м",
    genre: "Adventure, Comedy, Crime",
    director: "Wes Anderson",
    writer: "Stefan Zweig, Wes Anderson, Hugo Guinness",
    actors: "Ralph Fiennes, F. Murray Abraham, Mathieu Amalric",
    plot: "A concierge teams up with a lobby boy to protect a priceless painting and unravel a conspiracy at a famed European hotel.",
    language: "English",
    country: "United States, Germany",
    awards: "Won 4 Oscars. 140 wins & 222 nominations total",
    poster: "https://m.media-amazon.com/images/I/91YaBstiDEL._SX342_.jpg",
    ratings: [
      { Source: "Internet Movie Database", Value: "8.1/10" },
      { Source: "Rotten Tomatoes", Value: "91%" },
      { Source: "Metacritic", Value: "88/100" }
    ],
    metascore: "28",
    imdbRating: "8.1",
    imdbVotes: "831,520",
    imdbID: "tt2278388",
    type: "movie",
    boxOffice: "$59,302,468"
  },
  {
    title: "Whiplash",
    bgName: "Камшичен удар",
    description:
      "Млад барабанист попада под строгия и манипулативен контрол на легендарен учител, който го изправя на границата на способностите му.",
    reason:
      "Филмът изследва темите на амбицията и жертвата, подкрепени от впечатляващо актьорско представяне и интензивно развитие.",
    year: "2014",
    rated: "R",
    released: "15 Oct 2014",
    runtime: "106 min",
    runtimeGoogle: "1ч 46м",
    genre: "Drama, Music",
    director: "Damien Chazelle",
    writer: "Damien Chazelle",
    actors: "Miles Teller, J.K. Simmons, Melissa Benoist",
    plot: "A determined music student strives to achieve greatness under the ruthless instruction of an abusive conductor.",
    language: "English",
    country: "United States",
    awards: "Won 3 Oscars. 94 wins & 144 nominations total",
    poster:
      "https://m.media-amazon.com/images/I/51FZj452qJL._SX300_SY300_QL70_FMwebp_.jpg",
    ratings: [
      { Source: "Internet Movie Database", Value: "8.5/10" },
      { Source: "Rotten Tomatoes", Value: "94%" },
      { Source: "Metacritic", Value: "88/100" }
    ],
    metascore: "59",
    imdbRating: "8.5",
    imdbVotes: "797,314",
    imdbID: "tt2582802",
    type: "movie",
    boxOffice: "$13,092,000"
  }
];

export const fetchFakeMovieDataForTesting = (
  setter: React.Dispatch<React.SetStateAction<any>>
) => {
  setter(fakeMovieData);
};

interface RecommendationsProps {
  recommendationList: any[];
}

export const Recommendations: FC<RecommendationsProps> = ({
  recommendationList
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [allowHideText, setAllowHideText] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!recommendationList.length) {
    return <div>No recommendations available.</div>;
  }

  const movie = recommendationList[currentIndex];
  const rottenTomatoesRating =
    movie.ratings?.find(
      (rating: { Source: string; Value: string }) =>
        rating.Source === "Rotten Tomatoes"
    )?.Value || "N/A";

  const plotPreviewLength = 150;
  const animationDuration = 800;

  const toggleExpand = () => {
    if (isExpanded) {
      setAllowHideText(false);
      setTimeout(() => setAllowHideText(true), animationDuration);
    }
    setIsExpanded((prev) => !prev);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === recommendationList.length - 1 ? 0 : prevIndex + 1
    );
    setIsExpanded(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? recommendationList.length - 1 : prevIndex - 1
    );
    setIsExpanded(false);
  };

  const shouldShowFullPlot =
    isExpanded || (!allowHideText && movie.plot?.length > plotPreviewLength);

  return (
    <div className="relative flex items-center justify-center bg-gray-800 text-white rounded-lg p-8 mt-4 max-w-5xl mx-auto">
      {/* Left Arrow */}
      <button
        onClick={handlePrevious}
        className="absolute left-0 transform -translate-x-1/2 bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition"
      >
        &#8592;
      </button>

      {/* Movie Details Card */}
      <div className="movie-details flex">
        {/* Poster Section */}
        <div className="flex-shrink-0">
          <img
            src={movie.poster}
            alt={`${movie.title || "Movie"} Poster`}
            className="rounded-lg w-64 h-auto"
          />
        </div>

        {/* Details Section */}
        <div className="flex-grow pl-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-1">
              {movie.bgName || "Title Not Available"}
            </h2>
            <p className="text-lg font-semibold text-gray-400">
              {movie.title || "Английско заглавие"}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              {movie.genre || "Genre Unknown"} | {movie.year || "Year Unknown"}{" "}
              | Rated: {movie.rated || "N/A"}
            </p>

            <div className="flex items-center space-x-8 mb-4">
              <div className="flex items-center space-x-2">
                <FaStar className="text-[#FFCC33] w-8 h-8" />
                <span className="text-[#FFCC33] font-bold text-lg">
                  {movie.imdbRating || "N/A"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`flex items-center justify-center rounded-md text-white ${
                    movie.metascore >= 60
                      ? "bg-[#54A72A]"
                      : movie.metascore >= 40
                      ? "bg-[#FFCC33]"
                      : "bg-[#FF0000]"
                  }`}
                  style={{ width: "35px", height: "35px" }}
                >
                  <span className="text-xl">{movie.metascore || "N/A"}</span>
                </div>
                <span className="text-white font-semibold">Metascore</span>
              </div>
              <div className="flex items-center space-x-2">
                <SiRottentomatoes className="text-[#FF0000] w-8 h-8" />
                <span className="text-red-400 font-semibold">
                  {rottenTomatoesRating}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Plot</h3>
            <div
              className={`transition-all duration-[800ms] ease-in-out overflow-hidden ${
                isExpanded
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-20 opacity-80"
              }`}
            >
              <p className="text-gray-300">
                {shouldShowFullPlot
                  ? movie.plot
                  : `${movie.plot?.substring(0, plotPreviewLength)}...`}
              </p>
            </div>
            {movie.plot?.length > plotPreviewLength && (
              <button
                onClick={toggleExpand}
                className="mt-2 text-blue-400 underline hover:text-blue-300 transition"
              >
                {isExpanded ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
          {/* Additional Details and Ratings */}
          <div className="flex">
            {/* Details */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Details</h3>
              <ul className="text-gray-300 space-y-1">
                <li>
                  <strong>Director:</strong> {movie.director || "Unknown"}
                </li>
                <li>
                  <strong>Writers:</strong> {movie.writer || "Unknown"}
                </li>
                <li>
                  <strong>Actors:</strong> {movie.actors || "Unknown"}
                </li>
                <li>
                  <strong>Awards:</strong> {movie.awards || "None"}
                </li>
                <li>
                  <strong>Box Office:</strong> {movie.boxOffice || "N/A"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-0 transform translate-x-1/2 bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition"
      >
        &#8594;
      </button>
    </div>
  );
};