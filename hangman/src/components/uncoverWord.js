import { uncoverWord, wrongLetters } from '../store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

//play the hangman game and uncover the word

const UncoverWord = () => {

    const dispatch = useDispatch();
    const select = useSelector(state => state.hangman);

    const word = select.word;
    const hiddenWord = select.hiddenWord;
    const letter = select.letter;

    let hideWord = [...hiddenWord];

    //update word and state everytime a new letter is clicked
    useEffect(() => {

        function findIndexes() {
            
            if (word.includes(letter)) {
                for (let i = 0; i < word.length; i++) {
                    if (letter === word[i]) {
                        hideWord.splice(i, 1, letter)
                    }
                }
            } else if (!(letter == "")) {
                dispatch(wrongLetters(letter));
            } else {
                return hideWord;
            }

            dispatch(uncoverWord(hideWord));
            return hideWord;
        }

        findIndexes();

    }, [letter])


    return (
        <div className="word">
            <h1 className="word">{hideWord}</h1>
        </div>
    )
}

export default UncoverWord;