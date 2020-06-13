/*, { useState }*/  import React from 'react';
import './App.css';

//JSX Sintaxe de XML dentro do JavaScript
//import Header from './Header';
import Routes from './routes';

function App() {

  //const [ counter, setCounter ] = useState(0); //retorna array [valor do estado, function atualizar]
  //imutabilidade: soh edita o estado por uma funciona "set"

  /*function handleButtonClick(){
    setCounter(counter + 1);
  }*/

  return (
    /*<div>
      <Header title="Ecoleta"/>
      <h1>Conteudo da App {counter} </h1>
      <button type="button" onClick={handleButtonClick}>Aumentar</button>
    </div>*/
    <Routes/>
  );
}

export default App;
