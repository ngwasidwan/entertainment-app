import { useState } from "react";
import { useSearch } from "./customHook";
import { NavigationIcons, FilmIcon, SearchIcon } from "./icon";
import { data } from "./data";
import img from "./img/img.jpg";

const App = function () {
  return (
    <div className="app">
      <Sidebar />
    </div>
  );
};
export default App;

const Sidebar = function () {
  const [activeIcon, setActiveIcon] = useState(0);

  const [movieType, setMovieType] = useState(data);

  const series = data.filter((movie) => movie.Type === "series");

  const movies = data.filter((movie) => movie.Type === "movie");

  const bookmarkedData = data.filter((movie) => movie.Bookmarked === true);

  return (
    <div className="main-section">
      <div className="sidebar">
        <FilmIcon />

        <NavigationIcons
          title="home "
          movies={data}
          setMovieType={setMovieType}
          icon={0}
          setActiveIcon={setActiveIcon}
          activeIcon={activeIcon}
        >
          <path d="M216,56v60a4,4,0,0,1-4,4H136V44a4,4,0,0,1,4-4h60A16,16,0,0,1,216,56ZM116,40H56A16,16,0,0,0,40,56v60a4,4,0,0,0,4,4h76V44A4,4,0,0,0,116,40Zm96,96H136v76a4,4,0,0,0,4,4h60a16,16,0,0,0,16-16V140A4,4,0,0,0,212,136ZM40,140v60a16,16,0,0,0,16,16h60a4,4,0,0,0,4-4V136H44A4,4,0,0,0,40,140Z"></path>
        </NavigationIcons>

        <NavigationIcons
          title="movies"
          movies={movies}
          setMovieType={setMovieType}
          icon={1}
          setActiveIcon={setActiveIcon}
          activeIcon={activeIcon}
        >
          <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM184,56h32V72H184ZM72,200H40V184H72ZM72,72H40V56H72Zm48,128H88V184h32Zm0-128H88V56h32Zm48,128H136V184h32Zm0-128H136V56h32Zm48,128H184V184h32v16Z"></path>
        </NavigationIcons>

        <NavigationIcons
          title="series"
          movies={series}
          setMovieType={setMovieType}
          icon={2}
          setActiveIcon={setActiveIcon}
          activeIcon={activeIcon}
        >
          <path d="M216,64H147.31l34.35-34.34a8,8,0,1,0-11.32-11.32L128,60.69,85.66,18.34A8,8,0,0,0,74.34,29.66L108.69,64H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64Zm0,136H160V80h56V200Zm-16-84a12,12,0,1,1-12-12A12,12,0,0,1,200,116Zm0,48a12,12,0,1,1-12-12A12,12,0,0,1,200,164Z"></path>
        </NavigationIcons>

        <NavigationIcons
          title="bookmarks"
          movies={bookmarkedData}
          setMovieType={setMovieType}
          icon={3}
          setActiveIcon={setActiveIcon}
          activeIcon={activeIcon}
        >
          <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Z"></path>
        </NavigationIcons>

        <AvatarImage />
      </div>

      <DisplayMovies
        bookmarkArr={bookmarkedData}
        activeIcon={activeIcon}
        movieType={movieType}
        setMovieType={setMovieType}
      />
    </div>
  );
};
const AvatarImage = function () {
  return <img src={img} alt="avatar" className="avatar" />;
};

const Movie = function ({ movie }) {
  const { Poster, Year, Type, Title } = movie;

  return (
    <div className="movie-box">
      <img src={Poster} alt={`${Title} Poster`} className="img" />
      <span>{Year}</span>
      <span>{Type}</span>
      <span>18+</span>
      <p>{Title}</p>
    </div>
  );
};

const DisplayMovies = function ({
  bookmarkArr,
  activeIcon,
  movieType,
  setMovieType,
  setBookmarkedMovies,
}) {
  const sliceVal = activeIcon ? 0 : 3;

  const [inputVal, setInputVal] = useState("");

  const movieTypeArr = activeIcon === 3 ? bookmarkArr : movieType;

  return (
    <div className="movies-section">
      <div className={`home-movies`}>
        <SearchBar
          setMovieType={setMovieType}
          inputVal={inputVal}
          setInputVal={setInputVal}
        />

        {!inputVal && activeIcon === 1 && <h3>Movies</h3>}
        {!inputVal && activeIcon === 2 && <h3>Tv Series</h3>}
        {!inputVal && activeIcon === 3 && <h3>Bookmarked movies</h3>}
        {!inputVal && <h3 className={`${activeIcon && "hidden"}`}>Trending</h3>}

        <div className={`trending-movies `}>
          {movieTypeArr.slice(0, sliceVal).map((movie) => (
            <div className="box" key={movie.id}>
              <Bookmark
                movie={movie}
                setBookmarkedMovies={setBookmarkedMovies}
              />
              <Movie movie={movie} />
            </div>
          ))}
        </div>

        {!inputVal && (
          <h3 className={`recommended ${activeIcon && "hidden"}`}>
            Recommended for you
          </h3>
        )}

        <div className="recommended-movies">
          {movieTypeArr.slice(sliceVal).map((movie) => (
            <div className="box" key={movie.id}>
              <Bookmark
                movie={movie}
                setBookmarkedMovies={setBookmarkedMovies}
              />
              <Movie movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SearchBar = function ({ setMovieType, inputVal, setInputVal }) {
  const activeEl = useSearch();

  const handleInput = function (e) {
    const search = inputVal.toLowerCase();

    const searchMovie = data.filter((movie) =>
      movie.Title.toLowerCase().includes(search)
    );

    setInputVal(e.target.value);
    setMovieType(searchMovie);
  };
  return (
    <div className="input">
      <button className="search-icon">
        <SearchIcon />
      </button>
      <input
        type="text"
        placeholder="Search for movies and TV series"
        value={inputVal}
        onChange={handleInput}
        ref={activeEl}
      />
    </div>
  );
};

const Bookmark = function ({ movie }) {
  const [bookmarkActive, setBookmarkActive] = useState(false);

  const handleBookmark = function () {
    movie.Bookmarked = !movie.Bookmarked;

    setBookmarkActive(!bookmarkActive);
  };
  return (
    <svg
      className={movie.Bookmarked ? "bookmark-active" : "bookmark"}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 256 256"
      onClick={() => handleBookmark(movie.id)}
    >
      <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Z"></path>
    </svg>
  );
};
