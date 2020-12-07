import React from "react";
import { useQuery } from "@apollo/client";
import { meQuery } from "../graphql/team";
import findIndex from "lodash/findIndex";

import ApplyLayout from "../components/ApplyLayout";
import SendMessage from "../components/SendMessage";
import Sidebar from "../container/Sidebar";
import MessageContainer from "../container/MessageContainer";

import { Redirect } from "react-router-dom";

const DirectMessages = ({ match : { params : { teamId, userId }, }, }) => {
    const { loading, error, data } = useQuery(meQuery);
    if (loading) return <p>Loading...</p>;
    if (error) { console.log(error); return (<p>Error :( Please Login</p>)};

    console.log(data);
    const { teams, username } = data.me;
    // loged in but when there is no team, redirect to create-team page
    if (!teams.length) {
        return <Redirect to="/create-team"></Redirect>;
    }

    // '!!' makes string to boolean
    const teamIdx = !!teamId ? findIndex(teams, ["_id", teamId]) : 0;
    const team = teamIdx === -1 ? teams[0] : teams[teamIdx];

    // if wrong teamid is written
    if (!team) {
        return <Redirect to="/create-team"></Redirect>;
    }

    return (
        <ApplyLayout>
            <Sidebar username={username} data={teams} team={team} />
            {/*<MessageContainer channelId={channel._id}/>*/}
            <SendMessage onSubmit placeholer={userId} />
        </ApplyLayout>
    );
};

export default DirectMessages;
