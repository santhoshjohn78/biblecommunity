import React,{useState} from 'react';
import { BsBook } from "react-icons/bs";


class ToolBarComponent extends React.Component{
    
    constructor(props){
        super(props);
    }

    
    
    render() {
        console.log(this.props);
        const { name } = this.props;

        return <div>
        <span onClick={this.props.onclickhandler}>
            {/* <i className={this.props.icon}></i> */}

           <h5> <BsBook></BsBook>     {name}</h5>
        </span>
            {this.props.children}
        </div>
  }

}

export default ToolBarComponent;