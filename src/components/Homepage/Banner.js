import React from "react";
import { render } from "react-dom";
import { Card, CardWrapper } from "react-swipeable-cards";
import { useQuery } from "@apollo/react-hooks";

import { GET_USER, GET_ALL_DOGS } from "../../graphql/queries";

export default function Banner() {
  const { loading, error, data } = useQuery(GET_ALL_DOGS);

  if (loading) return "Loading...";
  if (error) return <p>Error! ${error.message}</p>;

  console.log("data", data.allDogs);

  return (
    <div>
      <h1>Match. Chat. Date</h1>
      <button>Sign up</button>
      <button>Log in </button>
      <CardWrapper>
        <Card>
          Hello World!
          <img
            width="100%"
            height="100%"
            src="https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d"
          />
        </Card>
        <Card>
          Hello World!
          <img
            width="100%"
            height="100%"
            src="https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d"
          />
        </Card>
        <Card>
          Hello World!
          <img
            width="100%"
            height="100%"
            src="https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d"
          />
        </Card>
        <Card>
          Hello World!
          <img
            width="100%"
            height="100%"
            src="https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d"
          />
        </Card>
        <Card>
          Hello World!
          <img
            width="100%"
            height="100%"
            src="https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d"
          />
        </Card>
      </CardWrapper>
    </div>
  );
}
