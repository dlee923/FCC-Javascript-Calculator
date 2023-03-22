import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      algorithm: "0",
      input: "",
      expression: "",
      isEvaluatedBeforeEquals: false,
      output: "0"
    };
    this.clearDisplay = this.clearDisplay.bind(this);
    this.updateAlgorithm = this.updateAlgorithm.bind(this);
    this.replaceAlgorithmExpression = this.replaceAlgorithmExpression.bind(this);
    this.evaluate = this.evaluate.bind(this);
    this.equals = this.equals.bind(this);
    this.setInput = this.setInput.bind(this);
    this.setExpression = this.setExpression.bind(this);
  }

  calculatorBtnPress(withValue) {
    let newOutput = ""
    let newAlgoValue = ""
    if (this.state.output === "0" && withValue === 0) {
      // do nothing
    } else if (withValue === ".") {
      if (!this.state.output.includes(".")) {
        newOutput = String(this.state.output) + String(withValue);
        newAlgoValue = withValue
        this.updateAlgorithm(newAlgoValue);
        this.updateOutput(newOutput);
      }
    } else if (this.state.output === "0" || this.state.algorithm.includes("=") || this.state.isEvaluatedBeforeEquals || this.state.output === "+" || this.state.output === "*" || this.state.output === "/" || this.state.output === "-") {
        if (!this.state.isEvaluatedBeforeEquals && this.state.expression !== "-" && this.state.output === "-") {
          newOutput = String(-withValue);
        } else {
          newOutput = String(withValue);
        }        
        newAlgoValue = String(withValue);
        this.updateAlgorithm(newAlgoValue);
        this.updateOutput(newOutput);
        this.setState({
          isEvaluatedBeforeEquals: false
        });
    } else {
      newOutput = String(this.state.output) + String(withValue);
      newAlgoValue = withValue
      this.updateAlgorithm(newAlgoValue);
      this.updateOutput(newOutput);
    }
  }

  clearDisplay() {
    this.setState({
      algorithm: "0",
      input: "",
      output: "0"
    });
  }

  updateOutput(withValue) {
    this.setState({
      output: withValue
    });
  }

  updateAlgorithm(withValue) {
    var newAlgorithm;
    if (this.state.algorithm === "0" || this.state.algorithm.includes("=")) {
      newAlgorithm = String(withValue)
    } else {
      newAlgorithm = String(this.state.algorithm) + String(withValue)
    }
    this.setState({
      algorithm: newAlgorithm
    });
  }

  replaceAlgorithmExpression(withValue) {
    let newAlgorithm = this.state.algorithm.slice(0, -1);
    this.setState ({
      algorithm: newAlgorithm + withValue
    });
  }

  setInput() {    
    this.setState({
      input: this.state.output
    });
  }

  setExpression(withValue) {
    this.setState({
      expression: withValue
    });
  }

  evaluate(withExpression) {
    // set input to algorithm if none exists,
    // if an input exists, then set it equal to the last output,
    // evaluate for a result if input
    switch (this.state.algorithm.slice(-1)) {
      case "+":
      case "*":
      case "-":        
      case "/":
        if (withExpression === "-") {
          this.updateOutput(withExpression);
          this.updateAlgorithm(withExpression);
        } else {
          this.updateOutput(withExpression);
          this.replaceAlgorithmExpression(withExpression);
          this.setExpression(withExpression);
        }        
        break;
      default:
        this.setInput();
        this.updateOutput(withExpression);
        this.updateAlgorithm(withExpression);
        this.setExpression(withExpression);
        break;
    }

    const currentOutput = parseInt(this.state.output)
    
    if (this.state.expression !== "" && this.state.input !== "" && !this.state.isEvaluatedBeforeEquals && !isNaN(currentOutput)) {
      var tempOutput;
      switch (this.state.expression) {
        case "+":
          tempOutput = parseFloat(this.state.input) + parseFloat(this.state.output);
          break;
        case "-":
          tempOutput = parseFloat(this.state.input) - parseFloat(this.state.output);
          break;
        case "/":
          tempOutput = parseFloat(this.state.input) / parseFloat(this.state.output);
          break;
        case "*":
          tempOutput = parseFloat(this.state.input) * parseFloat(this.state.output);
          break;
        default: console.log("error")
      }

      this.setState({
        output: tempOutput,
        input: tempOutput,
        isEvaluatedBeforeEquals: true
      });
    }
  }

  equals() {
    let finalOutput = '';
    switch (this.state.expression) {
      case "+":
        finalOutput = parseFloat(this.state.input) + parseFloat(this.state.output);
        break;
      case "-":
        finalOutput = parseFloat(this.state.input) - parseFloat(this.state.output);
        break;
      case "/":
        finalOutput = parseFloat(this.state.input) / parseFloat(this.state.output);
        break;
      case "*":
        finalOutput = parseFloat(this.state.input) * parseFloat(this.state.output);
        break;
      default: console.log("error")
    }
    this.updateAlgorithm("=" + finalOutput);
    this.setState({
      output: finalOutput,
      input: "",
      expression: ""
    });
  }

  render() {
    return (
      <div className="App">
        <div className="calculator-container">
          <div className="calculator-display">
            <p className="calculator-display-algo" >{this.state.algorithm}</p>
            <p className="calculator-display-inputresult" id="display">{this.state.output}</p>
          </div>
          <div className="calculator-buttons">
            <div className="calculator-buttons-top-section">
              <button className="calculator-button-ac" id="clear" onClick={this.clearDisplay}>AC</button>
              <button className="calculator-button-function" id="divide" onClick={() => this.evaluate("/")}>/</button>
              <button className="calculator-button-function" id="multiply" onClick={() => this.evaluate("*")}>x</button>              
            </div>
            <div className="calculator-buttons-bottom-section">
              <div className="calculator-buttons-numbers">
                <div className="calculator-buttons-numbers-row">
                  <button className="calculator-button-number" value="7" id="seven" onClick={() => this.calculatorBtnPress(7)}>7</button>
                  <button className="calculator-button-number" value="8" id="eight" onClick={() => this.calculatorBtnPress(8)}>8</button>
                  <button className="calculator-button-number" value="9" id="nine" onClick={() => this.calculatorBtnPress(9)}>9</button>    
                </div>
                <div className="calculator-buttons-numbers-row">
                  <button className="calculator-button-number" value="4" id="four" onClick={() => this.calculatorBtnPress(4)}>4</button>
                  <button className="calculator-button-number" value="5" id="five" onClick={() => this.calculatorBtnPress(5)}>5</button>
                  <button className="calculator-button-number" value="6" id="six" onClick={() => this.calculatorBtnPress(6)}>6</button>              
                </div>
                <div className="calculator-buttons-numbers-row">
                  <button className="calculator-button-number" value="1" id="one" onClick={() => this.calculatorBtnPress(1)}>1</button>
                  <button className="calculator-button-number" value="2" id="two" onClick={() => this.calculatorBtnPress(2)}>2</button>
                  <button className="calculator-button-number" value="3" id="three" onClick={() => this.calculatorBtnPress(3)}>3</button>              
                </div>
                <div className="calculator-buttons-numbers-row">
                  <button className="calculator-button-number-zero" id="zero" onClick={() => this.calculatorBtnPress(0)}>0</button>
                  <button className="calculator-button-number" id="decimal" onClick={() => this.calculatorBtnPress(".")}>.</button>
                </div>
              </div>
              <div className="calculator-buttons-functions">
                <button className="calculator-button-function" id="subtract" onClick={() => this.evaluate("-")}>-</button>
                <button className="calculator-button-function" id="add" onClick={() => this.evaluate("+")}>+</button>
                <button className="calculator-button-equals" id="equals" onClick={this.equals}>=</button>
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
