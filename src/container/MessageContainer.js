import React from "react";
import { Comment } from "semantic-ui-react";
import Messages from "../components/Messages";
import { MessagesQuery } from "../graphql/messages";

import { useQuery } from "@apollo/client";

const MessageContainer = ({ channelId }) => {
  const { loading, error, data } = useQuery(MessagesQuery, {
    variables: { channelId },
  });
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Message Error</p>;
  return loading ? null : (
    <Messages>
      <Comment.Group>
        {data.messages.map((m) => (
          <Comment key={`${m._id}-message`}>
            <Comment.Content>
              <Comment.Author as="a">{m.user.username}</Comment.Author>
              <Comment.Metadata>
                <div>{m.createdAt}</div>
              </Comment.Metadata>
              <Comment.Text>{m.text}</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
    </Messages>
  );
};

export default MessageContainer;
