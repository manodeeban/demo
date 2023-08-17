import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Avatar, IconButton } from "@material-ui/core";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import GroupAdd from "@material-ui/icons/GroupAdd";
import Sidebarchat from "./Sidebarchat";
import "./Sidebar.css";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import { Menu, Dropdown } from "antd";
import { Input } from "antd";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { isEmpty } from "lodash";

function Sidebar() {
	const [rooms, setRooms] = useState([]);
	const [dataSource, setDataSource] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [{ user }] = useStateValue();
	const [open, setOpen] = useState(false);
	const [textinput, setTextinput] = useState("");

	const { Search } = Input;

	useEffect(() => {
		const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
			setRooms(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			)
		);

		return () => {
			unsubscribe();
		};
	}, []);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const createChat = () => {
		const person = textinput;
		setOpen(false);

		if (person) {
			db.collection("rooms").add({
				name: person,
			});
		}
	};

	const handleClose = () => {
		setOpen(false);
	};
	const HandleonSearch = (event) => {
		setSearchValue(event.target.value);
	};

	const menu = (
		<Menu>
			<Menu.Item key="0">Setting</Menu.Item>
			<Menu.Item key="1">More</Menu.Item>
			<Menu.Item key="2">Logout</Menu.Item>
		</Menu>
	);

	useEffect(() => {
		if (searchValue) {
			const filtered = rooms.filter((item) =>
				item?.data?.name.toLowerCase().includes(searchValue.toLowerCase())
			);
			setDataSource(filtered);
		} else if (isEmpty(searchValue)) {
			setDataSource(rooms);
		}
		return () => {};
	}, [searchValue]);
	useEffect(() => {
		if (rooms) {
			setDataSource(rooms);
		}
	}, [rooms]);

	return (
		<div className="Sidebar">
			<div className="Sidebar_header">
				<Avatar src={user?.photoURL} />
				<div className="Sidebar_headerRight">
					<IconButton onClick={handleClickOpen} className="add new chat">
						<GroupAdd />
					</IconButton>
					<IconButton>
						<Dropdown
							overlayStyle={{ width: "150px" }}
							overlay={menu}
							trigger={["click"]}
							placement="bottomRight"
						>
							<MoreVertIcon />
						</Dropdown>
					</IconButton>
					<Dialog open={open} onClose={handleClose}>
						<DialogTitle>Create Room</DialogTitle>
						<DialogContent>
							<DialogContentText>
								please enter name for chat room
							</DialogContentText>
							<TextField
								onChange={(e) => {
									setTextinput(e.target.value);
								}}
								autoFocus
								margin="dense"
								id="name"
								label="Give a good name"
								type="text"
								fullWidth
								variant="standard"
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose}>Cancel</Button>
							<Button onClick={createChat}>Create</Button>
						</DialogActions>
					</Dialog>
				</div>
			</div>
			<div className="Sidebar_search">
				<div className="Sidebar_searchContainer">
					<Search onChange={HandleonSearch} />
				</div>
			</div>
			<div className="Sidebar_chats">
				<Sidebarchat addNewChat />
				{dataSource.map((room) => (
					<Sidebarchat key={room.id} id={room.id} name={room.data.name} />
				))}
			</div>
		</div>
	);
}

export default Sidebar;
