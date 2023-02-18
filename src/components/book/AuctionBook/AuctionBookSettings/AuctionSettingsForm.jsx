import {
  Text,
  TextInput,
  Box,
  Container,
  Card,
  Title,
  Button,
  Flex,
  Group,
  Image,
  Badge,
  Checkbox,
  NumberInput,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import Joi from "joi";
import { joiResolver, useForm } from "@mantine/form";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../../../context/socket";

import { saveAuctionSettings } from "../../../../features/auction/auctionSlice";
import { successNotification } from "../../../../utils/notification/showNotification";

const AuctionSettingsForm = (props) => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const { saveAuctionSettingsLoading, saveAuctionSettingsSuccess } = useSelector(
    (state) => state.auction
  );

  const form = useForm({
    initialValues: {
      schedule: {
        isScheduled: false,
        date: null,
        endDate: null,
      },
    },
  });

  // Save auction settings handler
  const saveAuctionSettingsHandler = () => {
    dispatch(
      saveAuctionSettings({
        bookId: props.auction.book._id,
        data: form.values,
      })
    );
  };

  useEffect(() => {
    form.setValues({
      ...form.values,
      schedule: {
        isScheduled: props.auction.schedule.isScheduled,
        date: props.auction.schedule.isScheduled ? props.auction.schedule.date : null,
        endDate: props.auction.schedule.isScheduled ? props.auction.schedule.endDate : null,
      },
    });
  }, []);

  useEffect(() => {
    if (saveAuctionSettingsSuccess) {
      successNotification({ title: "Success", message: "Auction settings edited successfully" });

      // Create a new cron job for auction schedule
      socket.emit("createAuctionSchedule", props.auction);

      navigate(`/auction/${props.auction.book._id}`);
    }
  }, [saveAuctionSettingsSuccess]);

  return (
    <Box mt={40}>
      <Container size="sm">
        <Card withBorder mx="auto" shadow="xl" p={26}>
          <Flex justify="space-between">
            <Title order={4} mb={16}>
              Edit your auction
            </Title>
            <Button>Start Auction</Button>
          </Flex>

          <Card withBorder mb={12}>
            <Group spacing="xl">
              <Image
                src={process.env.REACT_APP_BASE_IMAGE_URL + props.auction.book.images[0].url}
                width={70}
                height={90}
                radius="sm"
                py={6}
              />
              <Flex direction="column">
                <Text weight={500}>{props.auction.book.title}</Text>
                <Text color="dimmed" size="sm">
                  {props.auction.book.isbn}
                </Text>
                {props.auction.book.category.map((el) => (
                  <Badge key={el} radius="sm">
                    {el}
                  </Badge>
                ))}
              </Flex>
            </Group>
          </Card>

          <form>
            <Flex direction="column">
              <Text mb={4}>Book added at</Text>
              <Flex justify="space-between" mb={10}>
                <DatePicker value={new Date(props.auction.createdAt)} disabled />
                <TimeInput value={new Date(props.auction.createdAt)} disabled format="12" />
              </Flex>

              <Text mt={18}>Schedule date and time</Text>
              <Checkbox
                label="Add Schedule"
                my={12}
                checked={form.values.schedule.isScheduled}
                onChange={(e) =>
                  form.setFieldValue("schedule.isScheduled", e.currentTarget.checked)
                }
              />
              {form.values.schedule.isScheduled ? (
                <>
                  <Flex justify="space-between" mb={16}>
                    <DatePicker
                      placeholder="Auction end date"
                      minDate={new Date()}
                      {...form.getInputProps("schedule.date")}
                      value={form.values.schedule.date ? new Date(form.values.schedule.date) : null}
                    />
                    <TimeInput
                      placeholder="Auction start time"
                      format="12"
                      {...form.getInputProps("schedule.date")}
                      value={form.values.schedule.date ? new Date(form.values.schedule.date) : null}
                    />
                  </Flex>
                  <Flex justify="space-between">
                    <DatePicker
                      placeholder="Auction end date"
                      minDate={new Date()}
                      {...form.getInputProps("schedule.endDate")}
                      value={
                        form.values.schedule.endDate ? new Date(form.values.schedule.endDate) : null
                      }
                      // value={new Date(form.values.schedule.endDate)}
                    />
                    <TimeInput
                      placeholder="Auction end time"
                      format="12"
                      {...form.getInputProps("schedule.endDate")}
                      value={
                        form.values.schedule.endDate ? new Date(form.values.schedule.endDate) : null
                      }
                      // value={new Date(form.values.schedule.endDate)}
                    />
                  </Flex>
                </>
              ) : null}

              <Flex justify="flex-end">
                {/* <Button>Start Auction</Button> */}
                <Button
                  onClick={saveAuctionSettingsHandler}
                  loading={saveAuctionSettingsLoading}
                  disabled={
                    form.values.schedule.isScheduled &&
                    (!form.values.schedule.date || !form.values.schedule.endDate)
                  }
                  mt={20}
                >
                  Save
                </Button>
              </Flex>
            </Flex>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export default AuctionSettingsForm;
