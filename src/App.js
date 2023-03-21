import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      algorithim: "aa",
      input: "ii",
      result: "rr",
      inputResult: "irir"
    }
  }

  render() {
    return (
      <div className="App">
        <div className="calculator-container">
          <div className="calculator-display">
            <p className="calculator-display-algo">{this.state.algorithim}</p>
            <p className="calculator-display-inputresult">{this.state.inputResult}</p>
          </div>
          <div className="calculator-buttons">
            <div className="calculator-buttons-top-section">
              <button className="calculator-button-ac">AC</button>
              <button className="calculator-button-function">/</button>
              <button className="calculator-button-function">x</button>              
            </div>
            <div className="calculator-buttons-bottom-section">
              <div className="calculator-buttons-numbers">
                <div className="calculator-buttons-numbers-row">
                  <button className="calculator-button-number" value="7">7</button>
                  <button className="calculator-button-number" value="8">8</button>
                  <button className="calculator-button-number" value="9">9</button>    
                </div>
                <div className="calculator-buttons-numbers-row">
                  <button className="calculator-button-number" value="4">4</button>
                  <button className="calculator-button-number" value="5">5</button>
                  <button className="calculator-button-number" value="6">6</button>              
                </div>
                <div className="calculator-buttons-numbers-row">
                  <button className="calculator-button-number" value="1">1</button>
                  <button className="calculator-button-number" value="2">2</button>
                  <button className="calculator-button-number" value="3">3</button>              
                </div>
                <div className="calculator-buttons-numbers-row">
                  <button className="calculator-button-number-zero">0</button>
                  <button className="calculator-button-number">.</button>
                </div>
              </div>
              <div className="calculator-buttons-functions">
                <button className="calculator-button-function">-</button>
                <button className="calculator-button-function">+</button>
                <button className="calculator-button-equals">=</button>
              </div>              
            </div>
            
          </div>
        </div>
        <p className="signature">Designed by Peter Weinberg and Coded by Daniel Lee</p>
      </div>
    );
  }
  
}

export default App;
