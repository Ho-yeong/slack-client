import React from "react";
import decode from "jwt-decode";

import Teams from "../components/Teams";
import Channels from "../components/Channels";
import AddChannelModal from "../components/AddChannelModal";

class Sidebar extends React.Component {
  state = {
    openAddChannelModal: false,
  };

  handleCloseChannelModal = () => {
    this.setState({ openAddChannelModal: false });
  };

  handleAddChannelClick = () => {
    this.setState({ openAddChannelModal: true });
  };

  render() {
    const { data, team } = this.props;

    let username = "";

    try {
      const token = localStorage.getItem("token");
      const { user } = decode(token);
      username = user.username;
      // eslint-disable-next-line
    } catch (err) {}

    return [
      <Teams key="team-sidebar" teams={data.allTeams} username={username} />,
      <Channels
        key="channels-sidebar"
        teamId={team._id}
        teamName={team.name}
        channels={team.channels}
        users={[
          { _id: 1, name: "slackbot" },
          { _id: 2, name: "user1" },
        ]}
        onAddChannelClick={this.handleAddChannelClick}
      />,
      <AddChannelModal
        key="sidebar-add-channel"
        teamId={team._id}
        channelOpen={this.state.openAddChannelModal}
        onClose={this.handleCloseChannelModal}
      />,
    ];
  }
}

export default Sidebar;
