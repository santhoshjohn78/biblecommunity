import React from 'react';
import TOCAPICallService from './TOCAPICallService'

class TOCComponent extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            toc:[]
        }

    }

    componentDidMount(){
        TOCAPICallService.getToc().then((data)=>{
            this.setState({toc:data.bookList});
            console.log(this.state.toc);

        });
    }

    render(){
        return(
            <div>
                {
                    this.state.toc.map(element =>
                        <div>
                            <span onClick={() => this.props.onclickhandler(element.url)}>
                            {element.title}
                            </span>
                            
                        </div>)
                }
            </div>
        )
    }


}

export default TOCComponent;