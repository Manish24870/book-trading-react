import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, Group, Text, Badge, ActionIcon } from "@mantine/core";
import { CgUnavailable } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";

import BookStatusModal from "./BookStatusModal";
import { changeBookAvailability } from "../../../features/book/booksSlice";

const BookRow = (props) => {
  const [opened, setOpened] = useState(false);
  const [availabilityValue, setAvailabilityValue] = useState("");
  const dispatch = useDispatch();
  const { changeAvailabilityLoading, changeAvailabilitySuccess } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    setAvailabilityValue(props.book.available);
  }, [props.book]);

  const changeAvailabilityHandler = () => {
    dispatch(
      changeBookAvailability({
        bookId: props.book._id,
        newAvailability: availabilityValue,
      })
    );
  };

  useEffect(() => {
    if (changeAvailabilitySuccess) {
      setOpened(false);
    }
  }, [changeAvailabilitySuccess, changeAvailabilityLoading]);

  return (
    <tr style={{ textAlign: "center" }}>
      <td>
        <Group>
          <Avatar
            component={Link}
            to={`/profile/${props.book._id}`}
            src={process.env.REACT_APP_BASE_IMAGE_URL + props.book.images[0].url}
          />
          <Text component={Link} to={`/profile/${props.book._id}`}>
            {props.book.title}
          </Text>
        </Group>
      </td>
      <td>
        <Badge radius="sm">{props.book.category}</Badge>{" "}
      </td>

      <td>
        <Text>{props.book.owner.name}</Text>
      </td>

      <td>
        {props.book.available ? (
          <Badge radius="sm" color="green">
            Available
          </Badge>
        ) : (
          <Badge radius="sm" color="red">
            Unavailable
          </Badge>
        )}
      </td>
      <td>
        <Group position="right">
          <ActionIcon color="primary" variant="light" onClick={() => setOpened(true)}>
            <CgUnavailable size={16} />
          </ActionIcon>
        </Group>
      </td>
      <BookStatusModal
        opened={opened}
        setOpened={setOpened}
        availabilityValue={availabilityValue}
        setAvailabilityValue={setAvailabilityValue}
        changeAvailabilityLoading={changeAvailabilityLoading}
        changeAvailabilityHandler={changeAvailabilityHandler}
      />
    </tr>
  );
};

export default BookRow;
