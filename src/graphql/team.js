import { gql } from "@apollo/client";

export const allTeamsQuery = gql`
  {
    allTeams {
      _id
      owner {
        _id
      }
      name
      channels {
        _id
        name
      }
    }
    inviteTeams {
      _id
      owner {
        _id
      }
      name
      channels {
        _id
        name
      }
    }
  }
`;

export const idk = {};
