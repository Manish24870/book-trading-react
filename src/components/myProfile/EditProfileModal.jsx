import { useEffect } from "react";
import { Box, Modal, Button, Group, TextInput, Flex, MultiSelect } from "@mantine/core";
import { useForm, joiResolver } from "@mantine/form";
import Joi from "joi";
import { CiEdit } from "react-icons/ci";
import isEmpty from "../../utils/isEmpty";

import EditProfilePicture from "./EditProfilePicture";

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
  image: Joi.allow(null),
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
});

const EditProfileModal = (props) => {
  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      photo: null,
      name: "",
      username: "",
      email: "",
      favoriteCategories: [],
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
      // let profileData = new FormData();
      // Object.keys(form.values).forEach((value) => {
      //   if (value === "image") {
      //     profileData.append("image", form.values.image[0]);
      //   } else if (value === "preferences") {
      //     profileData.append([value], JSON.stringify(form.values[value]));
      //   } else {
      //     profileData.append([value], form.values[value]);
      //   }
      // });
      // props.completeProfile(profileData, navigate, "/profile");
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
