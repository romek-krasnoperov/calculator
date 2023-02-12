const numberButton = document.querySelectorAll("[data-number]")
const operationButton = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")
const currentOperandTextElement = document.querySelector("[data-current-operand]")
const previousOperandTExtElement = document.querySelector("[data-previous-operand]")

class Calculator {
    constructor(previousOperandTExtElement, currentOperandTextElement) {
        this.previousOperandTExtElement = previousOperandTExtElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString()+number.toString()
    }

    chooseOperation(operation) {
        if(this.currentOperand === "")return
        if(this.currentOperand !== "") {
            this.compute
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = "" 
    }

    compute() {
        let computation
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation) {
            case "+":
                computation = previous + current
                break
            case "-":
                computation = previous - current
                break
            case "*":
                computation = previous * current
                break
            case "÷":
                computation = previous / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ""
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        if(this.operation != null){
            this.previousOperandTExtElement.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTExtElement.innerText = ""
        }
    }
}

const calculator = new Calculator(previousOperandTExtElement, currentOperandTextElement)

numberButton.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButton.forEach(button => {
    button.addEventListener("click", () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener("click", () =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener("click", ()=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()
})