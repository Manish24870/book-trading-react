import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { MdOutlinePhotoCameraFront, MdOutlineClose } from "react-icons/md";
import { BiUpload } from "react-icons/bi";

const EditProfilePicture = (props) => {
  let idleContent;
  if (props.prevImageLink && !props.profilePicture) {
    idleContent = (
      <img
        alt="Profile Picture"
        src={process.env.REACT_APP_BASE_IMAGE_URL + props.prevImageLink}
        style={{
          height: "100px",
          width: "100px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    );
  } else if (!props.profilePicture) {
    idleContent = <MdOutlinePhotoCameraFront size={26} />;
  } else {
    const url = URL.createObjectURL(props.profilePicture[0]);
    idleContent = (
      <img
        alt="Profile Picture"
        src={url}
        style={{
          height: "100px",
          width: "100px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    );
  }

  return (
    <Dropzone
      accept={IMAGE_MIME_TYPE}
      radius="xl"
      onDrop={props.onProfilePictureDrop}
      onReject={props.onProfilePictureReject}
      sx={{
        borderRadius: "50%",
        height: 100,
        width: 100,
        margin: "8px auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Dropzone.Idle>{idleContent}</Dropzone.Idle>
      <Dropzone.Reject>
        <MdOutlineClose size={28} />
      </Dropzone.Reject>
      <Dropzone.Accept>
        <BiUpload size={28} />
      </Dropzone.Accept>
    </Dropzone>
  );
};

export default EditProfilePicture;
