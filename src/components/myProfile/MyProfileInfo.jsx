import { useEffect } from "react";
import { Title, Text, Avatar, Group, Card } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../common/Loading";
import { getUserProfile } from "../../features/profile/profileSlice";
import { errorNotification, successNotification } from "../../utils/notification/showNotification";

const MyProfileInfo = (props) => {
  const dispatch = useDispatch();

  const { userProfile, userProfileLoading, error, isError, isSuccess } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  useEffect(() => {
    if (isError) {
      errorNotification({ title: "Profile error", message: error });
    }
  }, [dispatch, isError, isSuccess, userProfile]);

  let renderProfileInfo = <Loading />;

  if (userProfileLoading) {
    renderProfileInfo = <Loading />;
  } else if (isSuccess && userProfile && !userProfileLoading) {
    renderProfileInfo = (
      <Group sx={{ alignItems: "center" }} spacing="xs">
        <Avatar
          src={
            "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=581&q=80"
          }
          radius="lg"
          size={160}
        />
        <Group direction="column" spacing={0} sx={{ maxWidth: 400 }}>
          <Title order={3}>{userProfile.name}</Title>
          <Text size="sm" color="secondary">
            @{userProfile.username}
          </Text>
          <Text size="sm" color="secondary">
            {userProfile.email}
          </Text>
        </Group>
      </Group>
    );
  }

  return (
    <Card withBorder shadow="md">
      {renderProfileInfo}
    </Card>
  );
};

export default MyProfileInfo;
