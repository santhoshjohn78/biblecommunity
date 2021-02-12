import React, {useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Config from './Config';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

class Search extends React.Component{
    constructor(props){
      super(props);
      this.config = new Config();
      this.state = {searchText:'',lgShow:false, searchResultsTotal:0, searchHits:[]};
      
    }

    handleChange = (event) => {
      //console.log(event.target.value);
      this.setState({[event.target.name]: event.target.value});
    }
    
    handleSubmit = (event) => {
      
      fetch(this.config.SEARCH_URL+this.state.searchText).then((response) => { return response.json()}).then((data)=>{
        return data.hits;})
        .then((data)=>{ this.setState({searchResultsTotal:data.totalHits.value}); return data.hits;})
        .then((data) => { this.setState({searchHits:data}); this.setState({lgShow:true});});
        
        
      event.preventDefault();
  }

    render(){
     
     return ( 
       <div>
        <Form inline>
          <FormControl type="text"  placeholder="Search Bible" 
           value={this.state.searchTextValue} name="searchText" onChange={this.handleChange}  className="mr-sm-2" />
          <Button onClick={this.handleSubmit} variant="outline-info">Search</Button>
        </Form>

        <Modal
        size="lg"
        show={this.state.lgShow}
        onHide={() => this.setState({lgShow:false})}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
          {this.state.searchText}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
           this.state.searchHits.map(element =>
            <div>
              <span><b>
                {element.sourceAsMap.bookName} {element.sourceAsMap.chapterNumber}:{element.sourceAsMap.verseNumber}</b>
              </span>
              <p>
                {element.sourceAsMap.verseText}
              </p>
            </div>
           )}
          <h3>Total: {this.state.searchResultsTotal}</h3>
        </Modal.Body>
      </Modal>
      </div>
     )}
}

export default Search;
