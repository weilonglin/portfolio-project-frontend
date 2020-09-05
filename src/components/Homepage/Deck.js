import React, { useState } from "react";
import "./Deck.css";
import TinderCard from "react-tinder-card";
import { useQuery } from "@apollo/react-hooks";

import { GET_ALL_DOG_IMAGE } from "../../graphql/queries";

export default function Deck() {
  const { loading, error, data } = useQuery(GET_ALL_DOG_IMAGE);

  if (loading) return "Loading...";
  if (error) return <p>Error! ${error.message}</p>;
  console.log("data", data.allDogs);

  const db = data;
  const characters = db;

  const swiped = (direction, nameToDelete) => {
    console.log("Nope" + nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log("Like" + name);
  };

  return (
    <div>
      <div className="cardContainer">
        {data.allDogs.map((character) => (
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
              {/* <img width="100%" height="80%" src={character.imageUrl} /> */}
              <h4>{character.name}</h4>
              <h4>{character.tagLine}</h4>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}
