import { createSlice } from "@reduxjs/toolkit";

export const hangmanSlice = createSlice ({
    name: "hangman",
    
    initialState: {
        letter: "",
        incorrectLetters: [],
        word: [],
        hiddenWord: [],
        finished: false
    },

    reducers: {

        letterButton: (state, action) => {
            return {
                ...state,
                letter: action.payload
            }
        },

        wrongLetters: (state, action) => {
            state.incorrectLetters.push(action.payload);
        },

        uncoverWord: (state, action) => {
            return {
                ...state,
                hiddenWord: action.payload
            }
        },

        updateWord: (state, action) => {
            return {
                ...state,
                word: action.payload
            }
        },
        
        restarted: (state) => {
            return {
                ...state,
                word: "",
                letter: "",
                incorrectLetters: [],
                hiddenWord: [],
                finished: false
            }
        },

        hasFinished: (state) => {
            return {
                ...state,
                finished: true
            }
        }
    }
})

export const { letterButton, updateWord, uncoverWord, wrongLetters, restarted, hasFinished } = hangmanSlice.actions;
export default hangmanSlice.reducer;