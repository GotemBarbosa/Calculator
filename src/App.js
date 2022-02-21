import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import PadButton from "./components/padButton";
import { FiDelete } from "react-icons/fi";

function App() {
  const isFirstRender = useRef(true);
  const afterResponse = useRef(false);
  const onOperation = useRef(false);
  const throwedError = useRef(false);
  const [displayText, setDisplayText] = useState("");
  const [outputDisplayText, setOutputDisplayText] = useState("");
  const [currentOperation, setCurrentOperation] = useState("");
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    //when a response is provided
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      if (response.toString().length > 7) {
        throwError();
      } else {
        setDisplayText(response);
        setCurrentOperation("");
        afterResponse.current = true;
        onOperation.current = false;
      }
    }
  }, [response]);

  //happens when a prerequisite not met
  //works similar as the AC button
  function throwError() {
    setDisplayText("ERR");
    setOutputDisplayText("");
    setCurrentOperation("");
    setFirstValue("");
    setSecondValue("");
    setResponse("");
    isFirstRender.current = true;
    afterResponse.current = false;
    onOperation.current = false;
    throwedError.current = true;
  }

  //Add text to display
  function addText(val) {
    if (afterResponse.current === true) {
      afterResponse.current = false;
      setDisplayText("" + val);
      setOutputDisplayText("");
      setFirstValue("");
      setSecondValue("");
      setCurrentOperation("");
    }
    //Happens when something is typed after an operation
    if ((firstValue !== "") & (secondValue === "")) {
      setDisplayText("" + val);
      setSecondValue(val);
      setOutputDisplayText(response);
      onOperation.current = false;
    } else {
      if (throwedError.current === true) {
        setDisplayText("" + val);
        throwedError.current = false;
      } else {
        // A number like "034" would appear if AC button is clicked and right after something is typed, to avoid this, it happens.
        if (displayText === "0") {
          setDisplayText("" + val);
        } else {
          //It is not allowed a number with more than 8 digits
          if (displayText.length <= 7) {
            //Checking if there is a decimal number in the input, and applying de limit
            if (displayText.indexOf(".") !== -1) {
              if (
                displayText.length - displayText.indexOf(".") <= 3 &&
                val !== "."
              ) {
                setDisplayText(displayText + val);
              }
            } else {
              setDisplayText(displayText + val);
            }
          }
        }
      }
    }
  }

  //Change the display number sign
  function handleChangeSign() {
    if (displayText !== "") setDisplayText(parseFloat(displayText) * -1);
  }

  //Handle the operations
  function handleOperation(val) {
    if (afterResponse.current === true) {
      afterResponse.current = false;
      setFirstValue(response);
      setSecondValue("");
      setCurrentOperation(val);
    } else {
      onOperation.current = true;
      setCurrentOperation(val);
      setFirstValue(displayText);
    }
  }

  function handleCleanAll() {
    setDisplayText("0");
    setOutputDisplayText("");
    setCurrentOperation("");
    setFirstValue("");
    setSecondValue("");
    setResponse("");
    isFirstRender.current = true;
    afterResponse.current = false;
    onOperation.current = false;
  }

  //Calculate the numbers with the given values
  function handleCalculate(prevVal, laterValue) {
    if (displayText !== "") {
      if (prevVal[prevVal.length] === ".")
        prevVal = prevVal.substring(0, prevVal.length - 1);
      if (laterValue[laterValue.length] === ".")
        laterValue = laterValue.substring(0, laterValue.length - 1);

      let result;
      setSecondValue(displayText);

      switch (currentOperation) {
        case "/":
          result = parseFloat(prevVal) / parseFloat(laterValue);
          break;

        case "*":
          result = parseFloat(prevVal) * parseFloat(laterValue);
          break;

        case "+":
          result = parseFloat(prevVal) + parseFloat(laterValue);
          break;

        case "-":
          result = parseFloat(prevVal) - parseFloat(laterValue);
          break;

        default:
          break;
      }
      //Checking if is a decimal number
      //if it is, the result will be limited to 2 numbers after the dot.
      if (!Number.isInteger(result)) {
        result = result.toFixed(2);
      }
      setResponse(result);
    }
  }

  return (
    <div className="App">
      <h1 className="title">Calculator</h1>

      <div className="calculator">
        <div className="calculator-content">
          <div className="display">
            <input
              type="text"
              className="display-text"
              value={displayText}
              disabled
            />
            <input
              type="text"
              className="display-currentOperation"
              value={currentOperation}
              disabled
            />
          </div>
          <div className="output-display">
            <input
              type="text"
              className="output-display-text"
              value={outputDisplayText}
              disabled
            />
          </div>
          <div className="pad-area">
            <PadButton
              className="function-pad"
              color={"#c6f0e4"}
              hoverColor={"#b1d7cc"}
              onClick={() => {
                handleCleanAll();
              }}
            >
              AC
            </PadButton>
            <PadButton
              className="function-pad"
              color={"#dbe8ce"}
              hoverColor={"#c4d3b4"}
              onClick={() => {
                setDisplayText("");
              }}
            >
              C
            </PadButton>
            <PadButton
              className="function-pad"
              color={"#dbe8ce"}
              hoverColor={"#c4d3b4"}
              onClick={() => {
                handleChangeSign();
              }}
            >
              +/-
            </PadButton>
            <PadButton
              className="function-pad"
              color={"#dbe8ce"}
              hoverColor={"#c4d3b4"}
              onClick={() => handleOperation("/")}
            >
              ÷
            </PadButton>

            <PadButton
              className="number-pad"
              color={"#fffffb"}
              hoverColor={"#f8f8f8"}
              onClick={() => {
                addText("7");
              }}
            >
              7
            </PadButton>
            <PadButton
              className="number-pad"
              color={"#fffffb"}
              hoverColor={"#f8f8f8"}
              onClick={() => {
                addText("8");
              }}
            >
              8
            </PadButton>
            <PadButton
              className="number-pad"
              color={"#fffffb"}
              hoverColor={"#f8f8f8"}
              onClick={() => {
                addText("9");
              }}
            >
              9
            </PadButton>
            <PadButton
              className="function-pad"
              color={"#dbe8ce"}
              hoverColor={"#c4d3b4"}
              onClick={() => handleOperation("*")}
            >
              x
            </PadButton>

            <PadButton
              className="number-pad"
              color={"#fffffb"}
              hoverColor={"#f8f8f8"}
              onClick={() => {
                addText("4");
              }}
            >
              4
            </PadButton>
            <PadButton
              className="number-pad"
              color={"#fffffb"}
              hoverColor={"#f8f8f8"}
              onClick={() => {
                addText("5");
              }}
            >
              5
            </PadButton>
            <PadButton
              className="number-pad"
              color={"#fffffb"}
              hoverColor={"#f8f8f8"}
              onClick={() => {
                addText("6");
              }}
            >
              6
            </PadButton>
            <PadButton
              className="function-pad"
              color={"#dbe8ce"}
              hoverColor={"#c4d3b4"}
              onClick={() => handleOperation("-")}
            >
              -
            </PadButton>

            <PadButton
              className="number-pad"
              color={"#fffffb"}
              hoverColor={"#f8f8f8"}
              onClick={() => {
                addText("1");
              }}
            >
              1
            </PadButton>
            <PadButton
              className="number-pad"
              color={"#fffffb"}
              hoverColor={"#f8f8f8"}
              onClick={() => {
                addText("2");
              }}
            >
              2
            </PadButton>
            <PadButton
              className="number-pad"
              color={"#fffffb"}
              hoverColor={"#f8f8f8"}
              onClick={() => {
                addText("3");
              }}
            >
              3
            </PadButton>
            <PadButton
              className="function-pad"
              color={"#dbe8ce"}
              hoverColor={"#c4d3b4"}
              onClick={() => handleOperation("+")}
            >
              +
            </PadButton>

            <PadButton
              className="number-pad"
              color={"#fffffb"}
              hoverColor={"#f8f8f8"}
              onClick={() => {
                addText("0");
              }}
            >
              0
            </PadButton>
            <PadButton
              className="number-pad"
              color={"#fffffb"}
              hoverColor={"#f8f8f8"}
              onClick={() => {
                addText(".");
              }}
            >
              .
            </PadButton>
            <PadButton
              className="number-pad"
              color={"#fffffb"}
              hoverColor={"#f8f8f8"}
              onClick={() => {
                setDisplayText(
                  displayText.substring(0, displayText.length - 1)
                );
              }}
            >
              <FiDelete />
            </PadButton>
            <PadButton
              className="function-pad"
              color={"#dbe8ce"}
              hoverColor={"#c4d3b4"}
              onClick={() => {
                handleCalculate(firstValue, displayText);
              }}
            >
              =
            </PadButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
