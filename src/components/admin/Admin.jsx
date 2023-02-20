import { useState } from "react";
import { Tabs, Card, Title, Container } from "@mantine/core";

import ManageUsers from "./ManageUsers/ManageUsers";

const Admin = (props) => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <Container size="lg">
      <Card sx={{ overflowX: "scroll", minWidth: 850 }}>
        <Title order={4}>Admin Panel</Title>
        <Tabs value={activeTab} onTabChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="users">Users</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="users">
            <ManageUsers />
          </Tabs.Panel>
        </Tabs>
      </Card>
    </Container>
  );
};

export default Admin;
