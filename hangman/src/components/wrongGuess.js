import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import state1 from '../hangmandrawings/state1.GIF';
import state2 from '../hangmandrawings/state2.GIF';
import state3 from '../hangmandrawings/state3.GIF';
import state4 from '../hangmandrawings/state4.GIF';
import state5 from '../hangmandrawings/state5.GIF';
import state6 from '../hangmandrawings/state6.GIF';
import state7 from '../hangmandrawings/state7.GIF';
import state8 from '../hangmandrawings/state8.GIF';
import state9 from '../hangmandrawings/state9.GIF';
import state10 from '../hangmandrawings/state10.gif';
import state11 from '../hangmandrawings/state11.GIF';

/* change imagery of hanging man */

const WrongGuess = () => {

    const select = useSelector(state => state.hangman);
    const wrongLetters = select.incorrectLetters;
    
    //create state which will be changed and used in the image source
    const [src, setSrc] = useState("");
    
    //update state for source everytime incorrect letters changes
    useEffect(() => {
        const length = wrongLetters.length;

        //use length of incorrect letters array to determine which image to use
        switch(length) {
            case 0:
                setSrc(state1);
                break;
            case 1:
                setSrc(state2);
                break;
            case 2: 
                setSrc(state3);
                break;
            case 3: 
                setSrc(state4);
                break;
            case 4: 
                setSrc(state5);
                break;
            case 5:
                setSrc(state6);
                break;
            case 6:
                setSrc(state7);
                break;
            case 7:
                setSrc(state8);
                break;
            case 8:
                setSrc(state9);
                break;
            case 9:
                setSrc(state10);
                break;
            default: 
                setSrc(state11);
                break;
        }
    
    }, [wrongLetters])

    return (
        <div className="img-box">
            <img alt="hangman-drawing" src={src} />
        </div>
    )
}

export default WrongGuess;