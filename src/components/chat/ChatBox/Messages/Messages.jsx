import { Card, Text, ScrollArea } from "@mantine/core";
import { useRef, useEffect } from "react";
import Sent from "../../common/Sent";
import Received from "../../common/Received";

const Messages = (props) => {
  const scrollRef = useRef();
  const scrollRef2 = useRef();

  const scrollToBottom = () => {
    scrollRef2.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // scrollRef.current?.lastElementChild?.scrollTo();
    scrollToBottom();
  }, [props.selectedConversation, props.conversationMessages]);

  // if (props.conversationMessages.length === 0) {
  //   return (
  //     <Text weight={500} align="center" color="primary">
  //       You do not have any messages
  //     </Text>
  //   );
  // } else {
  return (
    // <Card p={0} m={10} sx={{ height: "70vh" }}>
    // <Card p={0} m={10} sx={{ height: "500px", overflow: "scroll" }}>
    <ScrollArea offsetScrollbars sx={{ height: "500px" }}>
      {props.conversationMessages.map((message) => {
        if (message.sender._id === props.myProfile._id) {
          return <Sent key={message._id} message={message} />;
        } else {
          return <Received key={message._id} message={message} />;
        }
      })}
      <div ref={scrollRef2}></div>
    </ScrollArea>
    // </Card>
  );
  // }
};

export default Messages;
