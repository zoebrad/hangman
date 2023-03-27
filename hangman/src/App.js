import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Alphabet from './components/alphabet';
import Word from './components/word';
import UncoverWord from './components/uncoverWord';
import WrongGuess from './components/wrongGuess';
import Restart from './components/restart';

function App() {

  return ( 
    <div id="app" className="App">
      <Word />
      <Restart />
      <UncoverWord />
      <WrongGuess />
      <Alphabet />
    </div>
  );
}

export default App;
