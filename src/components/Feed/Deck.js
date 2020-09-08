import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import { useQuery } from "@apollo/react-hooks";
import Button from "react-bootstrap/Button";

import { GET_ALL_DOGS } from "../../graphql/queries";

export default function Deck() {
  const [lastDirection, setLastDirection] = useState();
  const { loading, error, data } = useQuery(GET_ALL_DOGS);

  if (loading) return "Loading...";
  if (error) return <p>Error! ${error.message}</p>;

  const db = data;
  const characters = db;

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div>
      <div className="cardContainer">
        {data.allDogs.map((character) => (
          <div className="feedContainer">
            <TinderCard
              className="swipe"
              key={character.id}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <div
                style={{
                  backgroundImage: "url(" + character.imageUrl + ")",
                }}
                className="card"
              >
                <h4>{character.name}</h4>
                <div className="dogBio">
                  <div>
                    <h4>{character.tagLine}</h4>
                  </div>
                  <div>
                    {character.tag.map((tags) => {
                      return (
                        <Button
                          key={tags.name}
                          type="button"
                          className="btn btn-outline-danger"
                        >
                          {tags.name}
                        </Button>
                      );
                    })}
                  </div>
                  <div></div>
                </div>
              </div>
            </TinderCard>
          </div>
        ))}
      </div>
    </div>
  );
}
