import { Card, Text, ScrollArea } from "@mantine/core";
import { useRef } from "react";

import MessagesList from "./MessagesList";

const Messages = (props) => {
  const scrollRef = useRef();

  return (
    <Card withBorder shadow="md" sx={{ flexGrow: 1 }}>
      <ScrollArea offsetScrollbars sx={{ height: "70%" }}>
        <MessagesList />
      </ScrollArea>
    </Card>
  );
};

export default Messages;
