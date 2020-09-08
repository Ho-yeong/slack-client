import React from "react";

import ApplyLayout from "../components/ApplyLayout";
import Channels from "../components/Channels";
import Teams from "../components/Teams";
import Header from "../components/Header";
import Messages from "../components/Messages";
import SendMessage from "../components/SendMessage";

export default () => (
  <ApplyLayout>
    <Teams
      teams={[
        { id: 1, letter: "S" },
        { id: 2, letter: "Q" },
      ]}
    />
    <Channels
      teamName="Team Name"
      username="User Name"
      channels={[
        { id: 0, name: "yui" },
        { id: 2, name: "random" },
      ]}
      users={[
        { id: 1, name: "slackbot" },
        { id: 2, name: "user1" },
      ]}
    />
    <Header channelName="anomynous" />
    <Messages>
      <ul class="message-list">
        <li></li>
        <li></li>
      </ul>
    </Messages>
    <SendMessage channelName="anomynous" />
  </ApplyLayout>
);
