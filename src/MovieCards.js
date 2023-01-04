import React from "react";
import { Button, Card, Image } from "semantic-ui-react";

import { Link } from "react-router-dom";

// show the moviecards, at the bottom, there is a link to see the details about this film

const MovieCards = ({ movie }) => {
  console.log("movie" + movie.Title);
  return (
    <div className="moviecards">
      <Card color="grey">
        <Card.Content>
          <Image className="cardsimage" src={movie.Poster} />
          <Card.Header className="cardstitle">{movie.Title}</Card.Header>
          <Card.Meta className="cardstype">{movie.Type}</Card.Meta>
          <Card.Description className="cardsyear">
            {movie.Year}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/movie/${movie.Title}`}> Details </Link>
        </Card.Content>
      </Card>
    </div>
  );
};

export default MovieCards;
