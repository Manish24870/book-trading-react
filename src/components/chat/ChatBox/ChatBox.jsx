import {
  Card,
  Avatar,
  Flex,
  Box,
  Text,
  Divider,
  useMantineTheme,
  Button,
  ScrollArea,
  TextInput,
} from "@mantine/core";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { MdCallEnd } from "react-icons/md";
import Peer from "simple-peer";

import Messages from "./Messages/Messages";
import SendMessage from "../SendMessage";
import Loading from "../../common/Loading";
import { fetchConversationMessages } from "../../../features/chat/chatSlice";

const ChatBox = (props) => {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const { conversationMessages, conversationMessagesLoading, fetchConversationMessagesSuccess } =
    useSelector((state) => state.chat);

  // Video call sates
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      myVideo.current.srcObject = stream;
    });

    props.socket.current.on("me", (id) => {
      setMe(id);
    });
    props.socket.current.on("toCallUser", (toCall) => {
      if (props.myProfile._id !== toCall?.userId) {
        console.log("TO CALL", toCall);
        setIdToCall(toCall.socketId);
      }
    });

    props.socket.current.on("callEnded", () => {
      console.log("ENDED");
      setCallEnded(true);
      connectionRef.current.destroy();
    });

    props.socket.current.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    props.socket.current.emit("startingCall", id);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (data) => {
      props.socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    props.socket.current.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (data) => {
      props.socket.current.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    props.socket.current.emit("endCall");
  };

  // Fetch current conversation messages
  useEffect(() => {
    if (props.selectedConversation) {
      dispatch(fetchConversationMessages(props.selectedConversation._id));
    }
  }, [props.selectedConversation]);

  let renderMessages = <Loading />;

  if (conversationMessagesLoading) {
    renderMessages = <Loading />;
  } else if (!props.selectedConversation) {
    renderMessages = (
      <ScrollArea offsetScrollbars sx={{ height: "600px" }}>
        <Text weight={500} size="md" align="center" color="primary">
          Select a conversation
        </Text>
      </ScrollArea>
    );
  } else if (conversationMessages && fetchConversationMessagesSuccess) {
    const friendInfo = props.selectedConversation.members.find(
      (member) => member._id !== props.myProfile._id
    );
    renderMessages = (
      <div>
        <Flex gap={10} align="center" p="xs">
          <Avatar
            radius="xl"
            size="md"
            src={process.env.REACT_APP_BASE_IMAGE_URL + friendInfo.photo}
          />
          <Box>
            <Text color="primary">{friendInfo.name}</Text>
            <Text size="xs" color="dimmed">
              {friendInfo.email}
            </Text>
          </Box>
          {/* <TextInput value={idToCall} onChange={(e) => setIdToCall(e.target.value)} /> */}
          {receivingCall && !callAccepted ? (
            <Flex align="center">
              <Text mr={16}>{name} Call</Text>
              <Button onClick={answerCall} size="xs">
                Answer
              </Button>
            </Flex>
          ) : null}
          <Box
            color="primary"
            sx={{ marginLeft: "auto", cursor: "pointer" }}
            onClick={() => callUser(idToCall)}
          >
            <HiOutlineVideoCamera color={theme.colors.primary[6]} size={26} />
          </Box>
        </Flex>
        <Divider />
        {/* <Flex direction="column" justify="space-between" sx={{ height: "70vh" }}> */}
        {/* <Flex direction="column" justify="space-between" sx={{ height: "70vh" }}> */}
        <Flex direction="column" justify="space-between">
          {stream && callAccepted && !callEnded ? (
            <Box sx={{ textAlign: "center" }}>
              {/* <video playsInline muted ref={myVideo} autoPlay style={{ width: "50%" }} /> */}
              <video playsInline ref={userVideo} autoPlay style={{ width: "90%" }} />
              <Button color="red" onClick={leaveCall} leftIcon={<MdCallEnd size={20} />}>
                End Call
              </Button>
            </Box>
          ) : (
            <Messages
              myProfile={props.myProfile}
              conversationMessages={conversationMessages}
              selectedConversation={props.selectedConversation}
            />
          )}

          <SendMessage
            selectedConversation={props.selectedConversation}
            socket={props.socket}
            myProfile={props.myProfile}
            conversations={props.conversations}
          />
        </Flex>
      </div>
    );
  }

  return (
    <Box py={10} mt={2}>
      {/* <Text>{me}</Text> */}
      {/* {stream && callAccepted && !callEnded ? (
        <div>
          <video playsInline muted ref={myVideo} autoPlay style={{ width: "200px" }} />
          <video playsInline muted ref={userVideo} autoPlay style={{ width: "200px" }} />
        </div>
      ) : null} */}
      {renderMessages}
    </Box>
  );
};

export default ChatBox;
