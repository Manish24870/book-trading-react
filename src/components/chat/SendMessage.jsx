import { Card, Flex, TextInput, Button, Input, useMantineTheme } from "@mantine/core";
import Joi from "joi";
import { useForm, joiResolver } from "@mantine/form";
import InputEmoji from "react-input-emoji";
import { BiSend } from "react-icons/bi";
import { useDispatch } from "react-redux";

import { sendMessage } from "../../features/chat/chatSlice";

const schema = Joi.object({
  message: Joi.string().required().messages({
    "string.empty": "Message is required",
  }),
});

const SendMessage = (props) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      message: "",
    },
  });

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const { hasErrors, errors } = form.validate();

    if (!hasErrors) {
      const message = {
        text: form.values.message,
        conversationId: props.selectedConversation._id,
      };
      dispatch(sendMessage(message));

      const receiverInfo = props.selectedConversation?.members.find(
        (member) => member._id !== props.myProfile._id
      );
      props.socket.current.emit("sendMessage", {
        senderInfo: props.myProfile,
        receiverInfo: receiverInfo,
        text: form.values.message,
      });
      form.setFieldValue("message", "");
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <Flex align="center">
        <Input
          placeholder="Enter your message"
          style={{ flex: 1 }}
          variant="filled"
          value={form.values.message}
          onChange={(val) => form.setFieldValue("message", val)}
          error={form.errors.message}
          component={InputEmoji}
          borderRadius={3}
          borderColor={theme.colors.primary[6]}
          styles={{ fontWeight: 600 }}
          height={100}
          fontFamily={"'Montserrat', sans-serif"}
          sx={{
            margin: 0,
          }}
        />
        <Button type="submit" rightIcon={<BiSend size={18} />} mr={20}>
          Send
        </Button>
      </Flex>
    </form>
  );
};

export default SendMessage;
