import { v4 } from "uuid";

/**
* A utility class for generating both new and consistent random numbers
*/
class RandomNumberHelper {
    constructor() {
        this.consistentRandomNumber = null;
        if (this.consistentRandomNumber === null) {
            this.consistentRandomNumber = v4();
        }
    }

    /**
    * Method for generating new random number
    * @returns {string} randomNumber
    */
    static generateRandomNumber = () => {
        const randomNumber = v4();
        return randomNumber;
    };

    /**
    * Method for generating consistent random number
    * @returns {string} randomNumber
    */
    get getConsistentRandomNumber() {
        return this.consistentRandomNumber;
    }

    numberInRange(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }
}

export default RandomNumberHelper;
