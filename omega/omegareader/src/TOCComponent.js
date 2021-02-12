import React from 'react';
import Config from './Config';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

class TOCComponent extends React.Component{

    constructor(props){
        super(props);
        this.config = new Config();
        this.url = this.config.VTOC_URL;
        this.state = {
            toc:[]
        }

    }

    getToc(){
        return fetch(this.url,{
            method:'get',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
    }

    componentDidMount(){
        this.getToc().then((data)=>{
            this.setState({toc:data.bookList});
            console.log(this.state.toc);

        });
    }

    render(){
        return(
            <Container fluid="true">      
            <div>
                
                 <Accordion>
                     {
                    this.state.toc.map(element =>
                        
                        <div>
                            <Card>
                                <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey={element.playOrder}>
                                    <h5>{element.title}</h5>
                                    
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={element.playOrder}>
                                <Card.Body><h4>
                                   {
                                    element.sectionList.map(chapterelements =>
                                       
                                       
                                            <Badge variant="secondary">
                                                <span onClick={() => this.props.onclickhandler(element.id,
                                                    chapterelements.url,chapterelements.title,chapterelements.sectionTotal)}>
                                                {chapterelements.title}
                                                </span>
                                            </Badge>
                                            
                                    )}</h4>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            
                            
                        </div>)
                     }
                    
                    </Accordion>
                
                    
                
            </div>
            </Container>
        )
    }


}

export default TOCComponent;