import { showNotification } from "@mantine/notifications";
import { IoCloseOutline, IoCheckmarkOutline, IoInformationOutline } from "react-icons/io5";

export const successNotification = ({ title, message }) => {
  showNotification({
    title: title,
    message: message,
    autoClose: 3000,
    color: "green",
    icon: <IoCheckmarkOutline size={20} />,
    sx: { border: "1px solid #D3F9D8" },
  });
};

export const errorNotification = ({ title, message }) => {
  showNotification({
    title: title,
    message: message,
    autoClose: 3000,
    icon: <IoCloseOutline size={20} />,
    color: "red",
    sx: { border: "1px solid #FFDEEB" },
  });
};

export const infoNotification = ({ title, message }) => {
  showNotification({
    title: title,
    message: message,
    autoClose: 3000,
    icon: <IoInformationOutline size={20} />,
    color: "blue",
    sx: { border: "1px solid #D0EBFF" },
  });
};
