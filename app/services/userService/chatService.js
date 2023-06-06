import { chats as chatroom } from "../../../database";
import { RandomNumberHelper } from "../../utils";

/**
* Class contains methods for interacting with the user model.
*/
class ChatService {
    constructor() {
    }

    /**
    * Method to retrieve user by email from the database.
    * @param {text} email email to search for in the database
    * @returns {Promise<boolean>} user model
    */
    async getChats({id}) {
        try {
            let chats = []
            if (id === "chat_room") {
                chats = chatroom.all
            }
            if (id !== "chat_room" && chatroom.hasOwnProperty(id)) {
                const getRandomNumber = new RandomNumberHelper()
                const num = getRandomNumber.numberInRange(1, (chatroom[id].length) - 1)
                chats = chatroom[id][num]
            }
            return chats;
        } catch (error) {
            logger.error("ERROR: An error occurred while retrieving chats in userService.js", error);
            throw new Error("An error occurred. we're looking into it.");
        }
    }
}

export default ChatService;
