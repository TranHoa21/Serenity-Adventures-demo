
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store/store";
import { setNotification } from "@/app/store/actions/messActions";
import { io, Socket } from "socket.io-client";


interface Notification {
	senderId: string;
	createdAt: Date;
	message: string;
	unread: boolean;
	receiverId: string;
	unreadCount: number;
	notificationId: string;
}

const useListenMessages = () => {
	const dispatch = useDispatch();
	const { messages } = useSelector((state: RootState) => state.mess);

	const socket = useRef<Socket | null>(null);

	useEffect(() => {
		socket.current = io("https://serenity-adventures-demo.onrender.com");

		return () => {
			if (socket.current) {
				socket.current.disconnect();
			}
		};
	}, []);


	useEffect(() => {
		const handleNewNotification = (newNotification: Notification) => {
			const updatedMessages = [...messages, newNotification];
			dispatch(setNotification(updatedMessages));

			const conversationId = newNotification.senderId;
		};

		if (socket.current) {
			socket.current.on("newNotification", handleNewNotification);
		}

		return () => {
			if (socket.current) {
				socket.current.off("newNotification", handleNewNotification);
			}
		};
	}, [dispatch, messages]);

	return null;
}

export default useListenMessages;
