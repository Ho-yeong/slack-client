import React from "react";
import { MessagesQuery, MessagesQuerySubscription } from "../graphql/messages";

import { useQuery } from "@apollo/client";

import MessageResult from "../components/MessageResult";

const MessageContainer = ({ channelId }) => {
  const { subscribeToMore, ...result } = useQuery(MessagesQuery, {
    variables: { channelId },
  });

  return (
    <MessageResult
      {...result}
      subscribeToNewChat={() =>
        subscribeToMore({
          document: MessagesQuerySubscription,
          variables: { channelId },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;

            return {
              ...prev,
              messages: [...prev.messages, subscriptionData.newChannelMessage],
            };
          },
        })
      }
    />
  );
};

export default MessageContainer;
