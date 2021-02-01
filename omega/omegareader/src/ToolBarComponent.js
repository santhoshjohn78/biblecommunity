import React,{useState} from 'react';

class ToolBarComponent extends React.Component{
    
    constructor(props){
        super(props);
    }

    
    
    render() {
        console.log(this.props);
        const { name } = this.props;

        return <div>
        <span onClick={this.props.onclickhandler}>
            <i className={this.props.icon}></i>
            {name}
        </span>
            {this.props.children}
        </div>
  }

}

export default ToolBarComponent;