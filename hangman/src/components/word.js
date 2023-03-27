import txt from '../dictionary.txt';
import { updateWord, uncoverWord } from '../store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

/* generate word for game */

const Word = () => {
    const dispatch = useDispatch();
    const select = useSelector(state => state.hangman)
    const word = select.word;

    /* when called, fetch text, split into array, generate a random number and grab word
       at that index, turn into an array with capital letters and update state */
    function getWord() {
        fetch(txt)
            .then(response => response.text())
            .then(result => result.split('\n'))
            .then(res => res[Math.floor(Math.random() * (res.length) + 1)])
            .then(r => r.toUpperCase().split(''))
            .then(w => dispatch(updateWord(w)))

            .catch((error) => console.log("Oops! Something went wrong: " + error))
    }

    //runs when state word updates
    useEffect(() => {
        //if there is no word stored, fetch a word
        if (word.length < 1)  {
            getWord();
        } else {
            /* if there is a word stored, copy it and change each letter to _ to hide
               the word, unless it isn't a letter, update state */
            const hiddenWord = word.map((l) => {
                const regex = /\w/;
                if (l.match(regex)) {
                    return "_"
                } else {
                    return l
                }
            })
            dispatch(uncoverWord(hiddenWord));
            console.log("Generated Word: " + word)
        }
    }, [word])

}

export default Word;