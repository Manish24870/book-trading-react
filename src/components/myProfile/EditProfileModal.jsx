import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Modal,
  Button,
  Group,
  TextInput,
  Flex,
  PasswordInput,
  MultiSelect,
} from "@mantine/core";
import { useForm, joiResolver } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import { CiEdit } from "react-icons/ci";
import isEmpty from "../../utils/isEmpty";

import EditProfilePicture from "./EditProfilePicture";
import { editProfile, editMyProfileReset } from "../../features/profile/profileSlice";
import { errorNotification, successNotification } from "../../utils/notification/showNotification";

const bookCategories = [
  "Antiques & Collectibles",
  "Architecture",
  "Art",
  "Bibles",
  "Biography & Autobiography",
  "Body, Mind & Spirit",
  "Business & Economics",
  "Comics & Graphic Novels",
  "Computers",
  "Cooking",
  "Crafts & Hobbies",
  "Design",
  "Drama",
  "Education",
  "Family & Relationships",
  "Fiction",
  "Foreign Language Study",
  "Games & Activities",
  "Gardening",
  "Health & Fitness",
  "History",
  "House & Home",
  "Humor",
  "Juvenile Fiction",
  "Juvenile Nonfiction",
  "Language Arts & Disciplines",
  "Law",
  "Literary Collections",
  "Literary Criticism",
  "Mathematics",
  "Medical",
  "Music",
  "Nature",
  "Performing Arts",
  "Pets",
  "Philosophy",
  "Poetry",
  "Political Science",
  "Psychology",
  "Reference",
  "Religion",
  "Science",
  "Self-Help",
  "Social Science",
  "Sports & Recreation",
  "Study Aids",
  "Technology & Engineering",
  "Transportation",
  "Travel",
  "True Crime",
  "Young Adult Fiction",
  "Young Adult Nonfiction",
];

const schema = Joi.object({
  photo: Joi.allow(null),
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  username: Joi.string().required().messages({
    "string.empty": "Username is required",
  }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email is invalid",
    }),
  favoriteCategories: Joi.array(),
  password: Joi.string().allow(""),
  confirmPassword: Joi.string().allow(""),
});

const EditProfileModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isEditMyProfileError, isEditMyProfileSuccess, error, myProfile } = useSelector(
    (state) => state.profile
  );

  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      photo: null,
      name: "",
      username: "",
      email: "",
      favoriteCategories: [],
      password: "",
      confirmPassword: "",
    },
  });

  // Load initial form values
  useEffect(() => {
    if (!isEmpty(props.myProfile)) {
      form.setValues({
        ...form.values,
        name: props.myProfile.name,
        username: props.myProfile.username,
        email: props.myProfile.email,
        favoriteCategories: props.myProfile.favoriteCategories,
      });
    }
  }, [props.myProfile]);

  // Handle error and success
  useEffect(() => {
    if (isEditMyProfileError) {
      if (typeof error === "string") {
        errorNotification({ title: "Profile error", message: error });
      } else if (typeof error === "object") {
        form.setErrors({
          username: error.username,
          email: error.email,
          password: error.password,
        });
      }
    }

    if (isEditMyProfileSuccess && !isEmpty(myProfile)) {
      successNotification({
        title: "Profile success",
        message: "Profile edited successfully",
      });
      props.setModalOpened(false);
      navigate("/my-profile", { replace: true });
    }
    return () => {
      dispatch(editMyProfileReset());
    };
  }, [dispatch, isEditMyProfileError, isEditMyProfileSuccess, error]);

  const onProfilePictureDrop = (photo) => {
    form.setFieldValue("photo", photo);
  };

  const onProfilePictureReject = (a) => {
    console.log("File rejected");
  };

  // When the edit profile form is submitted
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      console.log(form.values);
      let profileData = new FormData();
      Object.keys(form.values).forEach((value) => {
        if (value === "photo" && form.values.photo) {
          profileData.append("photo", form.values.photo[0]);
        } else if (value === "favoriteCategories") {
          profileData.append([value], JSON.stringify(form.values[value]));
        } else {
          profileData.append([value], form.values[value]);
        }
      });
      dispatch(editProfile(profileData));
    }
  };

  return (
    <Modal
      centered
      title="Edit your profile"
      size="lg"
      opened={props.modalOpened}
      onClose={() => props.setModalOpened(false)}
    >
      <form onSubmit={formSubmitHandler}>
        <Flex direction="column">
          <EditProfilePicture
            profilePicture={form.values.photo}
            prevImageLink={props.myProfile.photo}
            onProfilePictureDrop={onProfilePictureDrop}
            onProfilePictureReject={onProfilePictureReject}
          />
          <TextInput
            label="Username"
            placeholder="Username"
            {...form.getInputProps("username")}
            mb={16}
          />
          <TextInput
            label="Fullname"
            placeholder="Your name"
            {...form.getInputProps("name")}
            mb={16}
          />
          <TextInput
            label="Email"
            placeholder="Your email"
            {...form.getInputProps("email")}
            mb={16}
          />
          <MultiSelect
            label="Genre preferences"
            placeholder="Your book genre preferences"
            data={bookCategories}
            searchable
            {...form.getInputProps("favoriteCategories")}
            transitionDuration={150}
            transition="pop-top-left"
            transitionTimingFunction="ease"
            mb={16}
          />
          <PasswordInput
            label="New Password"
            placeholder="New password"
            {...form.getInputProps("password")}
            mb={16}
          />
          <PasswordInput
            label="Confirm new password"
            placeholder="New password"
            {...form.getInputProps("confirmPassword")}
            mb={16}
          />
          <Button type="submit" mt={30} fullWidth leftIcon={<CiEdit size={20} />}>
            Edit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default EditProfileModal;
