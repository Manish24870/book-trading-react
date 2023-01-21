import { useEffect } from "react";
import { Box, Container } from "@mantine/core";

import MyProfileInfo from "./MyProfileInfo";

const MyProfile = (props) => {
  return (
    <Box mt={20}>
      <Container size="lg">
        <MyProfileInfo />
      </Container>
    </Box>
  );
};

export default MyProfile;
