import io from "socket.io-client";

const SOCKET_URL = import.meta.env.MODE === "development" ? "https://tinder-clone-backend-six.vercel.app" : "/";

let socket = null;

export const initializeSocket = (userId) => {
	if (socket && socket.connected) {
		return; // already connected
	}

	socket = io(SOCKET_URL, {
		auth: { userId },
		reconnection: true,
	});

	socket.on("connect", () => {
		console.log("✅ Socket connected:", socket.id);
	});
};


export const getSocket = () => {
	if (!socket) {
		throw new Error("Socket not initialized");
	}
	return socket;
};

export const disconnectSocket = () => {
	if (socket) {
		socket.disconnect();
		socket = null;
	}
};