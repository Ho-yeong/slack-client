import { gql } from "@apollo/client";

export const meQuery = gql`
{
  me
  {
    _id
    username
    teams{
      _id
      name
      admin
      channels{
        _id
        name
      }
    }
  }
}
`;

export const idk = {};
