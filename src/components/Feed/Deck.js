import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";
import { GET_ALL_DOGS, SEND_MESSAGE } from "../../graphql/queries";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import { Info, InfoCaption, InfoTitle } from "@mui-treasury/components/info";
import { useGalaxyInfoStyles } from "@mui-treasury/styles/info/galaxy";
import { useCoverCardMediaStyles } from "@mui-treasury/styles/cardMedia/cover";
import NoSsr from "@material-ui/core/NoSsr";
import GoogleFontLoader from "react-google-font-loader";
import Buttons from "./Buttons";

import "../Homepage/Deck.css";

const useStyles = makeStyles(() => ({
  card: {
    borderRadius: "1rem",
    boxShadow: "none",
    position: "relative",

    minWidth: 200,
    minHeight: 360,
    width: "25vw",
    height: "70vh",
    "&:after": {
      content: '""',
      display: "block",
      position: "absolute",
      width: "500px",
      height: "500px",
      bottom: 0,
    },
  },
  content: {
    position: "absolute",
    bottom: 0,
    textAlign: "left",
    width: "100%",
  },
  shadow: {
    color: "#fff",
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 1,
    textShadowColor: "#000",
  },
  icon: {
    position: "absolute",
    bottom: -90,
    margin: "auto",
    textAlign: "center",
    width: "100%",
  },
  root: {
    margin: "auto",

    width: "100%",
    height: "100%",
    alignItems: "center",
    justify: "center",
    position: "absolute",
    direction: "column",
  },
  container: {
    minHeight: "100vh",
  },
  text: {
    textAlign: "center",
  },
}));

export default function Deck() {
  const user = localStorage.getItem("user");
  const [lastDirection, setLastDirection] = useState();
  const [msgerrors, setmsgErrors] = useState({});
  const styles = useStyles();
  const userId = localStorage.getItem("user");
  const mediaStyles = useCoverCardMediaStyles({ bgPosition: "top" });

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: (err) =>
      setmsgErrors(err.graphQLErrors).then(console.log(msgerrors)),
  });

  const { loading, error, data } = useQuery(GET_ALL_DOGS);

  console.log("data", data);

  if (loading) return "Loading...";

  if (error) return <p>Error! ${error.message}</p>;

  const swiped = (direction, nameToDelete, userName, ownerId) => {
    setLastDirection(direction);
    if (direction === "right") {
      sendMessage({
        variables: {
          userId: parseInt(user),
          message: `Hello ${userName}, I liked your dog ${nameToDelete}`,
          recipientId: parseInt(ownerId),
          recipientName: userName,
          imageUrl: localStorage.getItem("useImg"),
        },
      });
    }
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };
  const lefty =
    lastDirection === "left"
      ? "dislike"
      : lastDirection === "right"
      ? "Liked!"
      : "Swipe left to dislike and swipe right to like!";
  return (
    <>
      <Grid style={{ margin: "auto", width: "15%", paddingTop: "100px" }}>
        {data.allDogs.map((character) => {
          if (parseInt(character.ownerId) === parseInt(userId)) {
            return null;
          } else {
            return (
              <Card key={`tindercard-${character.id}`}>
                <TinderCard
                  className={"swipe"}
                  onSwipe={(dir) =>
                    swiped(
                      dir,
                      character.name,
                      character.owner.userName,
                      character.ownerId
                    )
                  }
                  onCardLeftScreen={() => outOfFrame(character.name)}
                >
                  <NoSsr>
                    <GoogleFontLoader
                      fonts={[
                        { font: "Spartan", weights: [300] },
                        { font: "Montserrat", weights: [200, 400, 700] },
                      ]}
                    />
                  </NoSsr>
                  <Card className={styles.card}>
                    <CardMedia
                      classes={mediaStyles}
                      image={character.imageUrl}
                    />
                    <Box py={3} px={2} className={styles.content}>
                      <Info useStyles={useGalaxyInfoStyles}>
                        <InfoTitle>{character.name}</InfoTitle>

                        <InfoCaption className={styles.content}>
                          {character.tagLine}
                        </InfoCaption>
                      </Info>
                    </Box>
                  </Card>
                </TinderCard>
              </Card>
            );
          }
        })}
        <Buttons dir={lefty} />
      </Grid>
    </>
  );
}
