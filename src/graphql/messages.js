import { gql } from "@apollo/client";

export const MessagesQuery = gql`
  query($channelId: String!) {
    messages(channelId: $channelId) {
      _id
      text
      user {
        username
      }
      createdAt
    }
  }
`;

export const idk = {};
