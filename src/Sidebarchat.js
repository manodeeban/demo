import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import "./Sidebarchat.css";
import db from "./firebase";
import { Link } from "react-router-dom";

function Sidebarchat({ id, name, addNewChat }) {
	const [seed, setSeed] = useState("");
	const [messages, setMessages] = useState("");

	useEffect(() => {
		if (id) {
			db.collection("rooms")
				.doc(id)
				.collection("messages")
				.orderBy("timestamp", "desc")
				.onSnapshot((snapshot) =>
					setMessages(snapshot.docs.map((doc) => doc.data()))
				);
		}
	}, [id]);

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));

		// setSeed(Math.floor(Math.random() * 5000));
	}, [id]);
	// useEffect(() => {
	// 	setAvatar({seed});
	//      store.set('Ava',[avatar])
	// }, []);

	return !addNewChat ? (
		<Link to={`/rooms/${id}`}>
			<div className="Sidebarchat">
				<Avatar src={`http://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
				<div className="Sidebarchat_Info">
					<h2>{name}</h2>
					<p>{messages[0]?.message}</p>
				</div>
			</div>
		</Link>
	) : (
		<div></div>
	);
}

export default Sidebarchat;
