import gql from "graphql-tag";

export const GET_USER = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      full_name
      userName
      email
      address
      city
      dogs {
        name
        gender
        imageUrl
        tagLine
        tag {
          name
        }
      }
      sender {
        message
        recipientId
        recipientName
      }
      recipient {
        message
        userId
      }
      dogLike {
        userId
        dogId
        liked
      }
      userLike {
        userId
        dogId
        liked
      }
    }
  }
`;

export const GET_ALL_MESSAGES = gql`
  query user($id: Int!) {
    user(id: $id) {
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

export const REGISTER_DOG = gql`
  mutation registerDog(
    $name: String!
    $gender: String!
    $tagLine: String!
    $imageUrl: String!
    $ownerId: Int!
  ) {
    registerDog(
      name: $name
      gender: $gender
      tagLine: $tagLine
      imageUrl: $imageUrl
      ownerId: $ownerId
    ) {
      name
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

export const SUB_MESSAGE = gql`
  subscription chatMessage($userId: Int!, $recipientId: Int!) {
    chatMessage(userId: $userId, recipientId: $recipientId) {
      id
      userId
      message
      recipientId
      recipientName
    }
  }
`;
