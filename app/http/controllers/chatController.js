/**
 * User controller class
 * contains all methods and properties for interacting  with chats
 *
 * @returns {object} chatController
 */

import ChatService from "../../services/userService";
import { ResponseHandler } from "../../utils";

class ChatController {
    constructor() {
        this.chatService = new ChatService();
    }

    getChats = async (req, res, next) => {
        try {
            const response = new ResponseHandler(req, res);
            const chats = await this.chatService.getChats(req.params);

            return response.success({
                message: "Chats fetched successfully",
                data: chats
            });
        } catch (error) {
            logger.error("Error: Error while fetching chats in chatController.js", error);
            return next(error);
        }
    };
}

export default ChatController;
