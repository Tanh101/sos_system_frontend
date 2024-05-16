import io from "socket.io-client";

import { ServerURL, socketMessage } from "../constants/config";

const socket = io(ServerURL);

const SocketService = () => {
    const sendEmergencyRequest = (requestData) => {
        socket.emit(socketMessage.CLIENT_REQUEST, requestData);
    };

    const receiveResponseFromRescuer = (callback) => {
        socket.on(socketMessage.RESPONSE_FROM_RESCUER, (data) => {
            callback(data);
        });
    };

    const notifyRescuerJoin = (rescuerId) => {
        socket.emit(socketMessage.RESCUER_JOIN, rescuerId);
    };

    const receiveEmergencyRequest = (callback) => {
        socket.on(socketMessage.NEW_REQUEST, (data) => {
            callback(data);
        });
    };

    const sendResponseToClient = (data) => {
        socket.emit(socketMessage.RESCUER_RESPONSE, data);
    };

    return {
        sendEmergencyRequest,
        receiveResponseFromRescuer,
        notifyRescuerJoin,
        sendResponseToClient,
        receiveEmergencyRequest,
    };
};

export default SocketService;