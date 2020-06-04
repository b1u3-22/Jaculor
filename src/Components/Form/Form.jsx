import React from "react";
import './Form.scss';
import RotatorySelector from '../RotatorySelector/RotatorySelector';

class Form extends React.Component{

    constructor(props) {
        super(props);
        this.state = {clicked: false, nickname: "", option0: 3, option1: 2}
        this.ColectData = this.ColectData.bind(this);
        this.HandleNicknameChange = this.HandleNicknameChange.bind(this);
      }

    ColectData(){
        this.setState({clicked: true, option0: this.RotatorySelector_0.state.selected, option1: this.RotatorySelector_1.state.selected})
    }

    HandleNicknameChange(e){
        this.setState({nickname: e.target.value})
    }

    render(){
        return(
            <form>
                <label for = "Nickname">
                    Your Nickname
                </label>
                <input type = "Text" id = "Nickname" value = {this.state.nickname} onChange = {this.HandleNicknameChange}/>
                <RotatorySelector ref = {(RotatorySelector_0) => {this.RotatorySelector_0 = RotatorySelector_0}} options = {["Masochistic", "Hard", "Normal", "Easy"]} title = {"Level of platforms"}/>
                <RotatorySelector ref = {(RotatorySelector_1) => {this.RotatorySelector_1 = RotatorySelector_1}} options = {["Easy", "Normal", "Hard", "Masochistic"]} title = {"Level of barriers"}/>
                <div className="Button" onClick = {this.ColectData}>Submit</div>
            </form>
        )
    }

}

export default Form;