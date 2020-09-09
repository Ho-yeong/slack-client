import React from "react";

import ApplyLayout from "../components/ApplyLayout";
import Channels from "../components/Channels";
import Teams from "../components/Teams";
import Header from "../components/Header";
import Messages from "../components/Messages";
import SendMessage from "../components/SendMessage";

import Sidebar from "../container/Sidebar";

export default () => (
  <ApplyLayout>
    <Teams username="User Name" />
    <Sidebar currentTeamId="5f58db2bbfb3561e282d7d63"></Sidebar>
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
