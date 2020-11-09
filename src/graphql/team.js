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
      channels{
        _id
        name
      }
    }
  }
}
`;

export const idk = {};
