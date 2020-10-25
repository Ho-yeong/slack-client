import React, { useEffect } from "react";
import { MessagesQuery, MessagesQuerySubscription } from "../graphql/messages";

import { useQuery } from "@apollo/client";

import MessageResult from "../components/MessageResult";

const MessageContainer = ({ channelId }) => {

  const { subscribeToMore, ...result } = useQuery(MessagesQuery, {
    variables: { channelId },
  });

  const subscribe = (channelId) => {
    subscribeToMore({
      document: MessagesQuerySubscription,
      variables:  {channelId} ,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return {
          ...prev,
          messages: [
            ...prev.messages,
            subscriptionData.data.newChannelMessage,
          ],
        };
      },
    })
  }

  useEffect(() => {
    let unsubscribe
  
    if (channelId) {
      console.log(channelId)
      unsubscribe = subscribeToMore({
        document: MessagesQuerySubscription,
        variables:  {channelId} ,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev
          return {
            ...prev,
            messages: [
              ...prev.messages,
              subscriptionData.data.newChannelMessage,
            ],
          };
        },
      })
    }
  
      // Unsubscribe here
    if (unsubscribe) return () => {
      unsubscribe()}
  }, [channelId, subscribeToMore])
  

  return (
    <MessageResult
      {...result}
      subscribeToNewChat={() =>
        subscribe(channelId)
      }
      channelId={channelId}
    />
  );
};

export default MessageContainer;
