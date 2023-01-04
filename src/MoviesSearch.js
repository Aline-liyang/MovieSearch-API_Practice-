import { useEffect, useState } from "react";

import SearchIcon from "./searchicon.jpg";
import MovieCards from "./MovieCards";
import { Button, Dropdown } from "semantic-ui-react";
import Notfound from "./Notfound";
import { Link } from "react-router-dom";

// OMDb Api key=b310fc2a

const API_URL = "http://www.omdbapi.com/?apikey=b310fc2a";

// component for Movie Searching

const MoviesSearch = () => {
  const [nom, setNom] = useState(""); // variable for the film's name
  const [movies, setMovies] = useState([]);
  //const [submovies, setSubmovies] = useState([]);
  const [type, setType] = useState(""); // film's type

  //connect to API, using the API search function, get the realted movie list, only searching the first 15 pages
  const searchMovies = (nom) => {
    setMovies([]);
    setType("");
    for (let i = 1; i < 10; i++) {
      nom === ""
        ? alert("film's name can't be empty")
        : fetch(`${API_URL}&s=${nom}&page=${i}`)
            .then((response) => response.json())
            .then((data) =>
              setMovies((prevMovies) => [...prevMovies, ...data.Search])
            )
            .catch((erreur) => console.log(erreur));
    }
  };

  //refresh the site
  useEffect(() => {
    searchMovies("Live");
  }, []);

  //show movie list in console
  console.log(movies);

  //setting year selection
  const countryOptions = [
    { key: "1900", value: "1900", text: "1900" },
    { key: "2020", value: "2020", text: "2020" },
    { key: "2021", value: "2021", text: "2021" },
    { key: "2022", value: "2022", text: "2022" },
  ];

  //layout
  return (
    <div className="App">
      <div className="title">
        <h1
          style={{
            fontSize: "48px",
          }}
        >
          Movie World
        </h1>
      </div>
      <div className="search">
        <input
          className="searchtext"
          placeholder="Search for movies"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        ></input>
        <img
          className="searchicon"
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchMovies(nom);
          }}
        ></img>
      </div>

      <div className="type">
        <p className="typetitle"> Type </p>

        <div className="typechoice">
          <Button.Group vertical color="black" className="choicebutton">
            <Button
              onClick={(e) => {
                setType("movie");
              }}
            >
              Movie
            </Button>
            <Button
              onClick={(e) => {
                setType("series");
              }}
            >
              Series
            </Button>
            <Button
              onClick={(e) => {
                setType("episode");
              }}
            >
              Episode
            </Button>
            <Button
              onClick={(e) => {
                setType("");
              }}
            >
              All
            </Button>
          </Button.Group>
        </div>
        <div className="yearchoice">
          <p className="yeartitle">
            Year <br />
          </p>
          <Dropdown
            className="yearselect"
            placeholder="Select "
            fluid
            selection
            options={countryOptions}
          />
        </div>
      </div>

      {/*show the searched movies cards, you can choose the type: movie,series,espisode */}
      {movies.length > 0 ? (
        <div className="moviesdisplay">
          {movies.map((movie) => {
            console.log("cccc" + type);
            return type === "" ? (
              <MovieCards movie={movie}></MovieCards>
            ) : movie.Type === type ? (
              <MovieCards movie={movie}></MovieCards>
            ) : undefined;
          })}
        </div>
      ) : undefined}
    </div>
  );
};

export default MoviesSearch;
