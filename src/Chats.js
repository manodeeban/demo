import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import SendIcon from "@material-ui/icons/Send";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./Chats.css";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import Picker from "emoji-picker-react";
import { Popover, Input } from "antd";

function Chat() {
	const [seed, setSeed] = useState("");
	const { roomId } = useParams();
	const [roomName, setRoomName] = useState("");
	const [messages, setMessage] = useState([]);
	const [{ user }] = useStateValue();
	const [text, setText] = useState("");
	const inputRef = useRef(null);
	const { Search } = Input;

	useEffect(() => {
		if (roomId) {
			db.collection("rooms")
				.doc(roomId)
				.onSnapshot((snapshot) => setRoomName(snapshot.data().name));

			db.collection("rooms")
				.doc(roomId)
				.collection("messages")
				.orderBy("timestamp", "asc")
				.onSnapshot((snapshot) =>
					setMessage(snapshot.docs.map((doc) => doc.data()))
				);
		}
	}, [roomId]);

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, [roomId]);

	const sendMessage = (e) => {
		e.preventDefault();
		console.log("you types >>>>", text);

		db.collection("rooms").doc(roomId).collection("messages").add({
			message: text,
			name: user.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		setText("");
	};

	const handleEmojiClick = (event, emojiObject) => {
		if (inputRef.current) {
			const selectionStart = inputRef.current.selectionStart; // Get the current cursor position
			const selectionEnd = inputRef.current.selectionEnd;

			const newText =
				text.slice(0, selectionStart) +
				emojiObject.emoji +
				text.slice(selectionEnd); // Replace selected text with emoji

			const updatedCursorPosition = selectionStart + emojiObject.emoji.length; // Calculate the updated cursor position

			setText(newText);

			// Restore the cursor position after updating the text
			setTimeout(() => {
				if (inputRef.current) {
					inputRef.current.setSelectionRange(
						updatedCursorPosition,
						updatedCursorPosition
					);
				}
			}, 0);
		}
	};

	return (
		<div className="chat">
			<div className="chat_header">
				<Avatar src={`http://avatars.dicebear.com/api/avataaars/${seed}.svg`} />

				<div id="chat_headerInfo">
					<h3>{roomName}</h3>
					<p>
						Last seen{""}
						{new Date(
							messages[messages.length - 1]?.timestamp?.toDate()
						).toUTCString()}
					</p>
				</div>

				<div id="chat_headerRight">
					<Popover
						placement="leftTop"
						content={
							<Search
								onSearch={(filter) => {
									console.log(filter);
								}}
							/>
						}
						trigger="click"
					>
						<IconButton>
							<SearchOutlined />
						</IconButton>
					</Popover>
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>
			<div id="chat_body">
				{messages.map((message) => (
					<p
						className={`chat_message
                ${message.name === user.displayName && "chat_reciever"}`}
					>
						<span className="chat_name">{message.name}</span>
						{message.message}
						<span className="chat_timestamp">
							{new Date(message.timestamp?.toDate()).toUTCString()}
						</span>
					</p>
				))}
			</div>

			<div className="chat_footer">
				<Popover
					placement="topLeft"
					content={
						<Picker onEmojiClick={handleEmojiClick} disableAutoFocus={true} />
					}
					trigger="click"
				>
					<IconButton>
						<InsertEmoticonIcon />
					</IconButton>
				</Popover>

				<form
					onSubmit={text.length >= 1 ? sendMessage : (e) => e.preventDefault()}
				>
					<input
						ref={inputRef}
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Type a message"
						type="text"
					/>
				</form>
				<IconButton>
					<SendIcon onClick={text.length >= 1 ? sendMessage : null} />
				</IconButton>
			</div>
		</div>
	);
}

export default Chat;
