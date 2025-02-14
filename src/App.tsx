import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [firstOperand, setFirstOperand] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit)
      setWaitingForSecondOperand(false)
    } else {
      setDisplay(display === '0' ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.')
      setWaitingForSecondOperand(false)
      return
    }
    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator)
      setDisplay(String(result))
      setFirstOperand(result)
    }

    setWaitingForSecondOperand(true)
    setOperator(nextOperator)
  }

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case '+':
        return first + second
      case '-':
        return first - second
      case '*':
        return first * second
      case '/':
        return first / second
      default:
        return second
    }
  }

  const performCalculation = () => {
    if (operator === null || firstOperand === null) return
    
    const inputValue = parseFloat(display)
    const result = calculate(firstOperand, inputValue, operator)
    setDisplay(String(result))
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  return (
    <div className="calculator-container">
      <h1 className="rainbow-title">
        <span>C</span>
        <span>a</span>
        <span>l</span>
        <span>c</span>
        <span>u</span>
        <span>l</span>
        <span>a</span>
        <span>t</span>
        <span>o</span>
        <span>r</span>
      </h1>
      <div className="calculator">
        <div className="display">{display}</div>
        <div className="keypad">
          <button onClick={() => clear()} className="clear">C</button>
          <button onClick={() => handleOperator('/')} className="operator">/</button>
          <button onClick={() => handleOperator('*')} className="operator">×</button>
          <button onClick={() => handleOperator('-')} className="operator">−</button>

          <button onClick={() => inputDigit('7')}>7</button>
          <button onClick={() => inputDigit('8')}>8</button>
          <button onClick={() => inputDigit('9')}>9</button>
          <button onClick={() => handleOperator('+')} className="operator plus">+</button>

          <button onClick={() => inputDigit('4')}>4</button>
          <button onClick={() => inputDigit('5')}>5</button>
          <button onClick={() => inputDigit('6')}>6</button>
          <button onClick={() => performCalculation()} className="equals">=</button>

          <button onClick={() => inputDigit('1')}>1</button>
          <button onClick={() => inputDigit('2')}>2</button>
          <button onClick={() => inputDigit('3')}>3</button>
          <button onClick={() => inputDigit('0')} className="zero">0</button>

          <button onClick={() => inputDecimal()}>.</button>
        </div>
      </div>
    </div>
  )
}

export default App
