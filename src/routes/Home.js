import React from "react";
import { gql, useQuery } from "@apollo/client";

function Home() {
  const { loading, error, data } = useQuery(allUsersQuery);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.allUser.map((u) => (
    <div key={u._id}>
      <h1>{u.email}</h1>
    </div>
  ));
}

const allUsersQuery = gql`
  {
    allUser {
      _id
      email
    }
  }
`;

export default Home;
