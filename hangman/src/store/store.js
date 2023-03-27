import { configureStore } from "@reduxjs/toolkit";
import hangmanReducer from "./reducer";

export default configureStore ({
    reducer: {
        hangman: hangmanReducer
    }
});