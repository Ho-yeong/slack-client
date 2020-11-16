import React from "react";
import decode from "jwt-decode";

import Header from "../components/Header";
import Teams from "../components/Teams";
import Channels from "../components/Channels";
import AddChannelModal from "../components/AddChannelModal";
import InvitePeopleModal from "../components/InvitePeopleModal";

class Sidebar extends React.Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false,
  };

  toggleAddChannelModal = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState((state) => ({
      openAddChannelModal: !state.openAddChannelModal,
    }));
  };

  // Invite People
  toggleInvitePeopleClick = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState((state) => ({
      openInvitePeopleModal: !state.openInvitePeopleModal,
    }));
  };

  render() {
    const { data, team, channelName, username } = this.props;

    return [
      <Teams key="team-sidebar" teams={data} username={username} />,
      <Channels
        key="channels-sidebar"
        teamId={team._id}
        teamName={team.name}
        channels={team.channels}
        isOwner={team.admin}
        users={[
          { _id: 1, name: "slackbot" },
          { _id: 2, name: "user1" },
        ]}
        onAddChannelClick={this.toggleAddChannelModal}
      />,
      <Header
        key="header"
        currentTeamId={team._id}
        channelName={channelName}
        isOwner={team.admin}
        onInvitePeopleClick={this.toggleInvitePeopleClick}
      />,
      <AddChannelModal
        key="sidebar-add-channel"
        teamId={team._id}
        channelOpen={this.state.openAddChannelModal}
        onClose={this.toggleAddChannelModal}
      />,
      <InvitePeopleModal
        key="header-invite-people"
        teamId={team._id}
        open={this.state.openInvitePeopleModal}
        onClose={this.toggleInvitePeopleClick}
      />,
    ];
  }
}

export default Sidebar;
