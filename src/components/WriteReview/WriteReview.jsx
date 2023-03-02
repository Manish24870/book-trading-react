import {
  Box,
  Card,
  TextInput,
  Flex,
  Text,
  Rating,
  Button,
  Modal,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { useForm, joiResolver } from "@mantine/form";
import Joi from "joi";
import {
  TbMoodCry,
  TbMoodEmpty,
  TbMoodSad,
  TbMoodSmile,
  TbMoodHappy,
  TbMoodCrazyHappy,
} from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { writeReview } from "../../features/user/userSlice";
import { errorNotification } from "../../utils/notification/showNotification";

const schema = Joi.object({
  text: Joi.string().required().messages({
    "string.empty": "Review text is required",
  }),
  reviewNumber: Joi.any(),
});

const WriteReview = (props) => {
  const dispatch = useDispatch();
  const { writeReviewLoading, writeReviewSuccess, isError, error } = useSelector(
    (state) => state.user
  );

  const theme = useMantineTheme();
  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      text: "",
      reviewNumber: "",
    },
  });

  useEffect(() => {
    if (writeReviewSuccess) {
      form.setValues({
        text: "",
        reviewNumber: "",
      });
      props.setOpened(false);
    }
  }, [writeReviewSuccess]);

  useEffect(() => {
    if (isError && !writeReviewSuccess) {
      errorNotification({ title: "Error", message: error });
    }
  }, [isError]);

  const getEmptyIcon = (value) => {
    const defaultProps = { size: 30, color: "gray" };
    switch (value) {
      case 1:
        return <TbMoodCry {...defaultProps} />;
      case 2:
        return <TbMoodSad {...defaultProps} />;
      case 3:
        return <TbMoodSmile {...defaultProps} />;
      case 4:
        return <TbMoodHappy {...defaultProps} />;
      case 5:
        return <TbMoodCrazyHappy {...defaultProps} />;
      default:
        return <TbMoodEmpty {...defaultProps} />;
    }
  };

  const getFullIcon = (value) => {
    const defaultProps = { size: 30 };

    switch (value) {
      case 1:
        return <TbMoodCry {...defaultProps} color={theme.colors.red[7]} />;
      case 2:
        return <TbMoodSad {...defaultProps} color={theme.colors.orange[7]} />;
      case 3:
        return <TbMoodSmile {...defaultProps} color={theme.colors.yellow[7]} />;
      case 4:
        return <TbMoodHappy {...defaultProps} color={theme.colors.lime[7]} />;
      case 5:
        return <TbMoodCrazyHappy {...defaultProps} color={theme.colors.green[7]} />;
      default:
        return <TbMoodEmpty {...defaultProps} />;
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const { hasErrors, errors } = form.validate();
    console.log(errors);
    if (!hasErrors) {
      if (props.type === "exchange") {
        const reviewData = {
          type: props.type,
          reviewText: form.values.text,
          reviewNumber: form.values.reviewNumber,
          reviewedFor: props.ownerId,
          reviewedBy: props.reviewedBy,
          transaction: props.exchangeId,
        };
        dispatch(writeReview(reviewData));
      } else if (props.type === "buy") {
      }
    }
  };

  return (
    <Modal
      centered
      opened={props.opened}
      onClose={() => props.setOpened(false)}
      title="Write a review"
    >
      <form onSubmit={formSubmitHandler}>
        <Textarea mb={20} placeholder="Review text" {...form.getInputProps("text")} />
        <Flex justify="space-between">
          <Rating
            placeholder="Review number"
            {...form.getInputProps("reviewNumber")}
            defaultValue={2}
            mb={20}
            size="lg"
            emptySymbol={getEmptyIcon}
            fullSymbol={getFullIcon}
            highlightSelectedOnly
          />
          <Text color="primary" weight={500}>
            {form.values.reviewNumber}
          </Text>
        </Flex>

        <Button loading={writeReviewLoading} type="submit">
          Review
        </Button>
      </form>
    </Modal>
  );
};

export default WriteReview;
