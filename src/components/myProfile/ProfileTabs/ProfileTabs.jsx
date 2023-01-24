import { useState } from "react";
import { Tabs, Card } from "@mantine/core";

import WalletTab from "./WalletTab/WalletTab";

const ProfileTabs = (props) => {
  const [activeTab, setActiveTab] = useState("first");

  return (
    <Card withBorder shadow="md" mt={10}>
      <Tabs variant="pills" color="secondary" value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value={"first"}>Wallet</Tabs.Tab>
          <Tabs.Tab value={"second"}>Second</Tabs.Tab>
          <Tabs.Tab value={"third"}>Third</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="first">
          <WalletTab />
        </Tabs.Panel>
        <Tabs.Panel value="second">
          <WalletTab />
        </Tabs.Panel>
        <Tabs.Panel value="third">
          <WalletTab />
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
};

export default ProfileTabs;
