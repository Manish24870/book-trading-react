import { useState } from "react";
import { Tabs, Card, Title, Container } from "@mantine/core";

import ManageUsers from "./ManageUsers/ManageUsers";
import ManageBooks from "./ManageBooks/ManageBooks";

const Admin = (props) => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <Container size="lg">
      {/* <Card sx={{ overflowX: "scroll", minWidth: 850 }}> */}
      <Card sx={{ overflowX: "scroll" }}>
        <Title order={4}>Admin Panel</Title>
        <Tabs
          value={activeTab}
          onTabChange={setActiveTab}
          sx={{ overflowX: "scroll", minWidth: 850 }}
        >
          <Tabs.List>
            <Tabs.Tab value="users">Users</Tabs.Tab>
            <Tabs.Tab value="books">Books</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="users">
            <ManageUsers />
          </Tabs.Panel>
          <Tabs.Panel value="books">
            <ManageBooks />
          </Tabs.Panel>
        </Tabs>
      </Card>
    </Container>
  );
};

export default Admin;
