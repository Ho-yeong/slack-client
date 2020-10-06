import React from "react";
import { Comment } from "semantic-ui-react";
import Messages from "../components/Messages";

class MessageResult extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructor");
  }

  componentDidMount() {
    this.props.subscribeToNewChat();
    console.log("componentDidMount");
  }

  render() {
    const { data } = this.props;
    if (data) {
      return (
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
    } else {
      return <p>no data</p>;
    }
  }
}

export default MessageResult;
