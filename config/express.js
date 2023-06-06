import fs from "fs";
import express from "express";
import FileStreamRotator from "file-stream-rotator";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import cors from "cors";

import Router from "../routes";
import config from ".";
import { RandomNumberHelper } from "../app/utils";
import ApiError from "../app/exceptions/apiError";

/**
 * Class contains Express configurations
 *
 * @returns Express config
 */
class ExpressConfig {
    constructor() {
        // Generate a correlationId from RandomNumberHelper class for grouping logs
        this.correlationId = new RandomNumberHelper();

        // Make correlationId a global variable
        global.correlationId = this.correlationId.getConsistentRandomNumber;

        // Sets our log directory and creates the directory if it doesn't exist.
        this.logDirectory = "./log";
        this.checkLogDir = fs.existsSync(this.logDirectory) || fs.mkdirSync(this.logDirectory);

        this.router = new Router();
        this.ApiError = new ApiError();
    }

    /**
     * Method to configure application middleware
     * @param {object} app - express app
     */
    configureRoutes(app) {
        // enable cors
        app.use(cors());
        app.options("*", cors());

        // parse json request
        app.use(express.json());

        // parse urlencoded request
        app.use(express.urlencoded({ extended: true }));

        // configures our default routes path
        app.use(`/api/${config.API_VERSION}`, this.router.run());

        // Handles exceptions thrown in the application
        app.use(this.ApiError.appError);

        // handle all error instances and returns an errors response
        // eslint-disable-next-line no-unused-vars
        app.use(this.ApiError.genericError);
    }

    /**
     * Main Method that bootstraps and calls all the configuration methods
     * @param {object} app - express app
     */
    run(app) {
        // calls the method to configure our routes
        this.configureRoutes(app);

        // configure route for file upload
        app.use(fileUpload({
            limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
        }));
    }
}

// creates a singleton pattern so only one instance of the class exists
export default new ExpressConfig();
