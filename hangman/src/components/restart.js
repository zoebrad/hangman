import { restarted, uncoverWord, hasFinished } from '../store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

/*restart button, change and reset game classes dependent on if the restart button is clicked
  or the game is lost or won*/
const Restart = () => {
    const dispatch = useDispatch();
    const select = useSelector(state => state.hangman);
    const [msg, setMsg] = useState("");
    const [btn, setBtn] = useState("");
    
    const incorrect = select.incorrectLetters;
    const word = select.word;
    const hiddenWord = select.hiddenWord;
    const finished = select.finished;

    const alphabet = document.querySelectorAll('.alphabet-button');
    const restart = document.getElementById('restart');

    //when restart button is clicked
    function clicked() {
        //enable alphabet buttons
        alphabet.forEach((elem) => {
            elem.disabled = false;
        })

        //reset classes of button
        restart.classList.toggle('btn-light');
        if (restart.classList.contains('btn-success')) {
            restart.classList.toggle('btn-success');
        } else {
            restart.classList.toggle('btn-danger');
        }
        dispatch(restarted());
    }

    //if game is won, change restart button and message, will check everytime the word is changed
    useEffect (() => {
        const w = [...word].join('') === [...hiddenWord].join('');

        if (!finished && w && word.length > 0) {

            setMsg(<h2 className="end-message won">Yay! You Won</h2>);
            setBtn("Play Again");
            restart.classList.toggle('btn-light');
            restart.classList.toggle('btn-success');

            //disable all alphabet buttons to stop game
            alphabet.forEach((elem) => {
                elem.disabled = true;
            })
        }
    }, [hiddenWord])

    //if game is lost, change restart button and message, will check everytime the incorrect letters change
    useEffect(() => {
        if (incorrect.length < 10) {
            setMsg("");
            setBtn('Restart');
        } else {
            setMsg(<h2 className="end-message lost">Better Luck Next Time!</h2>);
            setBtn('Try Again');
            const hiddenWord = [...word];

            //update states to show completed word when game is lost
            dispatch(hasFinished());
            dispatch(uncoverWord(hiddenWord));
    
            restart.classList.toggle('btn-light');
            restart.classList.toggle('btn-danger');

            //disable all alphabet buttons to stop game
            alphabet.forEach((elem) => {
                elem.disabled = true;
            })
    
        }
    }, [incorrect])

    //show pop up box containing all the rules when ? button is clicked
    function helpBox() {
        const element = document.getElementById("pop-up");
        element.classList.toggle("show");
    }

    return (
        <div className="header-box">
            <div className="help-box">
                <button onClick={() => helpBox()} className="help-button"><b>?</b></button>
                <div id="pop-up" className="pop-up">
                    <button className="close" onClick={() => helpBox()}>X</button>
                    <h1 className="center"><b>Hangman Rules</b></h1>
                    <br />
                    <ol>
                        <li>To guess the word, select a letter and see if its is included in the hidden word.</li>
                        <li>If it isn't include, you are one step closer to hanging.</li>
                        <li>If you guess a 10 wrong letters, you man will be hung and its game over.</li>
                        <li>To win, guess the hidden word with less than 10 wrong guesses.</li>
                    </ol>
                </div>
            </div>
            <div className="result-msg">
                {msg}
            </div>
            <div className="result-box center">
                <button id="restart" type="button" className="restart btn btn-light" onClick={() => clicked()}>{btn}</button>
            </div>
        </div>
    )
}

export default Restart;