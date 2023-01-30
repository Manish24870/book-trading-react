import { useEffect, useState } from "react";
import { Title, Text, Avatar, Group, Card, Button, Box, Flex, Badge } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { MdPassword } from "react-icons/md";

import EditProfileModal from "./EditProfileModal";
import Loading from "../common/Loading";
import { getMyProfile, reset } from "../../features/profile/profileSlice";
import { errorNotification } from "../../utils/notification/showNotification";

const MyProfileInfo = (props) => {
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);

  const { myProfile, myProfileLoading, error, isError, isSuccess } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    dispatch(getMyProfile());
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      errorNotification({ title: "Profile error", message: error });
    }
  }, [dispatch, isError, isSuccess, myProfile]);

  let renderProfileInfo = <Loading />;

  if (myProfileLoading) {
    renderProfileInfo = <Loading />;
  } else if (isSuccess && myProfile && !myProfileLoading) {
    renderProfileInfo = (
      <Group sx={{ alignItems: "center" }} spacing="xs">
        <EditProfileModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          myProfile={myProfile}
        />
        <Avatar
          src={process.env.REACT_APP_BASE_IMAGE_URL + myProfile.photo}
          radius="lg"
          size={160}
        />
        <Flex direction="column" spacing={0} sx={{ maxWidth: 400 }}>
          <Title order={3}>{myProfile.name}</Title>
          <Text size="sm" color="secondary">
            @{myProfile.username}
          </Text>
          <Text size="sm" color="secondary" mb={6}>
            {myProfile.email}
          </Text>
          {myProfile.favoriteCategories &&
            myProfile.favoriteCategories.map((category) => (
              <Badge radius="sm" key={category}>
                {category}
              </Badge>
            ))}
        </Flex>
        <Box
          sx={{
            justifySelf: "flex-start",
            alignSelf: "flex-start",
            marginLeft: "auto",
            textAlign: "right",
          }}
        >
          <Button
            variant="light"
            size="xs"
            leftIcon={<CiEdit size={18} />}
            mb={10}
            onClick={() => setModalOpened(true)}
          >
            Edit
          </Button>
          <br></br>
          <Button variant="light" color="secondary" size="xs" leftIcon={<MdPassword size={18} />}>
            Change Password
          </Button>
        </Box>
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
