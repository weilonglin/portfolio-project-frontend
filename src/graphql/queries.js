import gql from "graphql-tag";

export const GET_USER = gql`
  query {
    user(id: 1) {
      full_name
    }
  }
`;

export const GET_ALL_DOGS = gql`
  query {
    allDogs {
      id
      name
      gender
      imageUrl
      tagLine
      tag {
        id
        name
      }
    }
  }
`;

export const GET_ALL_DOG_IMAGE = gql`
  query {
    allDogs {
      id
      name
      imageUrl
    }
  }
`;
