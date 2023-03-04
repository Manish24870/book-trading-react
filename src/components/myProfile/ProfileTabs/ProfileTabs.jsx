import { useState } from "react";
import { Tabs, Card } from "@mantine/core";

import WalletTab from "./WalletTab/WalletTab";
import PostsTab from "./PostsTab/PostsTab";
import ReviewsTab from "./ReviewsTab/Reviews";

const ProfileTabs = (props) => {
  const [activeTab, setActiveTab] = useState("first");

  return (
    <Card withBorder shadow="md" mt={10}>
      <Tabs variant="pills" color="secondary" value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value={"first"}>Wallet</Tabs.Tab>
          <Tabs.Tab value={"second"}>My Posts</Tabs.Tab>
          <Tabs.Tab value={"third"}>Reviews</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="first">
          <WalletTab />
        </Tabs.Panel>
        <Tabs.Panel value="second">
          <PostsTab />
        </Tabs.Panel>
        <Tabs.Panel value="third">
          <ReviewsTab />
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
};

export default ProfileTabs;
