import express from "express";
import Response from "../app/utils/responseHandler";
import ChatRoute from "./v1/chatRoute";

/**
 * Main Router that contains Application routes
 * @returns {expressRouterObject} this.routes
 */

class Router {
    constructor() {
        this.router = express.Router();
        this.response = null;
        // instantiates the class where we define our authentication routes
        // and adds the authentication routes defined in the class to our routes
        this.chatRoute = new ChatRoute(this.router);
    }

    indexRoute() {
        this.router.get("/", (req, res) => {
            this.response = new Response(req, res);
            this.response.success({
                message: "Welcome.",
                data: []
            });
        });
    }

    run() {
        this.router.use("/chat_room", this.chatRoute.run());
        this.indexRoute();

        return this.router;
    }
}

export default Router;
