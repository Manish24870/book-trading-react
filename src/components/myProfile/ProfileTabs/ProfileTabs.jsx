import { useState } from "react";
import { Tabs, Card } from "@mantine/core";

import WalletTab from "./WalletTab/WalletTab";
import BooksTab from "./BooksTab/BooksTab";
import ReviewsTab from "./ReviewsTab/Reviews";

const ProfileTabs = (props) => {
  const [activeTab, setActiveTab] = useState("first");

  return (
    <Card withBorder shadow="md" mt={10}>
      <Tabs variant="pills" color="secondary" value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value={"first"}>Wallet</Tabs.Tab>
          <Tabs.Tab value={"second"}>My Books</Tabs.Tab>
          <Tabs.Tab value={"third"}>Reviews</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="first">
          <WalletTab />
        </Tabs.Panel>
        <Tabs.Panel value="second">
          <BooksTab />
        </Tabs.Panel>
        <Tabs.Panel value="third">
          <ReviewsTab />
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
};

export default ProfileTabs;
