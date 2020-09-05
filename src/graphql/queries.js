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

export const GET_ALL_MESSAGES = gql`
  query {
    user(id: 1) {
      sender {
        userId
        message
      }
      recipient {
        recipientId
        recipientName
        message
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation {
    sendMessage(
      userId: 1
      message: "Hello"
      recipientId: 2
      recipientName: "leo77"
    ) {
      id
      userId
      message
      recipientId
      recipientName
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $full_name: String!
    $userName: String!
    $email: String!
    $password: String!
    $address: String!
    $city: String!
  ) {
    register(
      full_name: $full_name
      userName: $userName
      email: $email
      password: $password
      address: $address
      city: $city
    ) {
      userName
      email
    }
  }
`;

export const LOGIN_USER = gql`
  query login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      userName
      email
      token
    }
  }
`;
