import { useDispatch } from "react-redux";
import { letterButton } from '../store/reducer.js';

//create alphabet buttons
const Alphabet = () => {

    const dispatch = useDispatch();

    const buttons = () => {
        let letter;
        let alphabet = [];
        
        //create an array of all the alphabet
        for (let i = 65; i <= 90; i++) {
            letter = String.fromCharCode(i);
            alphabet.push(letter);
        }

        //create the buttons from the alphabet array
        let alphabetButtons = alphabet.map((letter) => (
            <button type="button" key={letter} id={letter} className="alphabet-button" value={letter} onClick={(e) => {buttonClicked(e)}}>{letter}</button>  
        ))

        return alphabetButtons;
    }

    //when button is clicked, disable the button and change state of letter to the value of the button
    const buttonClicked = (e) => {
        e.target.setAttribute('disabled', true)
        dispatch(letterButton(e.target.value))
    }

    //when a alphabet key is pressed on keyboard, update letter from its numerical code
    document.addEventListener("keypress", (e) => {
        const code = e.which;
        
        //if the key pressed is an alphabet key
        if (code >= 97 && code <= 122) {
            //get the letter from the code, change to upperCase
            const letter = String.fromCharCode(code);
            const l = letter.toUpperCase();

            //get alphabet button by ID and disable it, then update state
            const alphaButton = document.getElementById(l);
            alphaButton.setAttribute('disabled', true);
            dispatch(letterButton(l));
        }

    })


    return (
        <div className="alphabet-box">
            {buttons()}
        </div>
    )

}

export default Alphabet;