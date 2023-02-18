import { Card, Text, ScrollArea } from "@mantine/core";
import { useRef } from "react";

import MessagesList from "./MessagesList";

const Messages = (props) => {
  const scrollRef = useRef();

  return (
    <Card p={0} m={10} sx={{ flexGrow: "1" }}>
      <ScrollArea offsetScrollbars sx={{ height: "100%" }}>
        <MessagesList />
      </ScrollArea>
    </Card>
  );
};

export default Messages;
