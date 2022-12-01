import React, { Component } from "react";
import './Calculator.css'
import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    value: [0,0],
    current: 0
}


export default class Calculator extends Component {

    state = { ...initialState }

    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory(){
        console.log('limpar')
        this.setState({ ...initialState})
    }
    setOperation(operation){
        if (this.state.current === 0){
            this.setState ({operation, current: 1, clearDisplay: true})
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const value = [ ...this.state.value]
            try{
                value[0] = eval(`${value[0]} ${currentOperation} ${value[1]}`)
                if (isNaN(value[0]) || !isFinite(value[0])) {
                    this.clearMemory()
                return
                }
            } catch(e){
                value[0] = this.state.value[0]
            }
            value[1] = 0
            this.setState({
                displayValue: value[0],
                operation: equals ? null : operation,
                current: equals ? 0: 1,
                clearDisplay: !equals,
                value
            })
        }
    }
    addDigit(n){
        if (n === '.' && this.state.displayValue.includes('.')){
            return
        }
        const clearDisplay = this.state.displayValue === '0' ||
        this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({displayValue, clearDisplay: false})
        if (n != '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const value = [...this.state.value]
            value[i] = newValue
            this.setState({ value })
            console.log(value)
        }
    }

    render() {
        return(
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" triple click={this.clearMemory}/>
                <Button label="/" operation click={this.setOperation}/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" operation click={this.setOperation}/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" operation click={this.setOperation}/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" operation click={this.setOperation}/>
                <Button label="0" double click={this.setOperation}/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" operation click={this.setOperation}/>

            </div>
        )
    }
}