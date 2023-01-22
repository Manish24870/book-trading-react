import { useEffect } from "react";
import { Box, Container } from "@mantine/core";

import MyProfileInfo from "./MyProfileInfo";
import ProfileTabs from "./ProfileTabs/ProfileTabs";

const MyProfile = (props) => {
  return (
    <Box mt={20}>
      <Container size="lg">
        <MyProfileInfo />
        <ProfileTabs />
      </Container>
    </Box>
  );
};

export default MyProfile;
