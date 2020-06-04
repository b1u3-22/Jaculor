import React from "react";
import './RotatorySelector.scss';


class RotatorySelector extends React.Component{

    constructor(props) {
        super(props);
        this.state = {options: this.props.options, selected: 2, text: ""};
        this.arrowleft = "<";
        this.arrowright = ">";
        this.selectOption = this.selectOption.bind(this);
        this.ArrowOneFunction = this.ArrowOneFunction.bind(this);
        this.ArrowZeroFunction = this.ArrowZeroFunction.bind(this);
      }

    selectOption = function() {
        this.setState({text: this.state.options[this.state.selected % this.state.options.length]})
    }

    ArrowZeroFunction() {
        if (this.state.selected > 0) {
            this.setState({selected: this.state.selected - 1});
        } else {
            this.setState({selected: this.state.options.length - 1});
        }

        this.selectOption();

    }

    ArrowOneFunction() {
        if (this.state.selected <= 3){
            this.setState({selected: this.state.selected + 1});
        }else{
            this.setState({selected: 0})
        }

        this.selectOption();
    }

    componentDidMount() {
        this.selectOption();
    }

    render(){
        return(
            <div className="RotatorySelectorWrapper">
                <h1>{this.props.title}</h1>
                <div class="Options">
                    <span class="Arrow" onClick = {this.ArrowZeroFunction}>{this.arrowleft}</span>
                    <span class="Text">{this.state.text}</span>
                    <span class="Arrow" onClick = {this.ArrowOneFunction}>{this.arrowright}</span>
                </div>
            </div>
        )
    }

}

export default RotatorySelector;