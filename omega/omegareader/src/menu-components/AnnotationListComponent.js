import React, {useState,useEffect} from 'react';

import Config from '../Config';
import {useSelector,useDispatch} from 'react-redux';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { BsFillTrashFill } from "react-icons/bs";
import styled from 'styled-components';

import { gotoPageAction } from '../actions'; 
function AnnotationListComponent(props){
    
    const config = new Config();
    const fontFamilyValue = useSelector(state=>state.fontFamily);
    const [annotationList,setAnnotationList] = useState([]);
    const url = config.ANNOTATION_URL+config.DEFAULT_USER_ID;
    const dispatch = useDispatch();

    const styles = {
      iconStyle: {
          paddingRight:"50%",
          paddingTop:"5px",
          fontSize:"50px",
          color:"#fff"
      }
    }
    
    const getAnnotationRequestOption = {
        method: 'GET',
        headers: {'Content-Type':'application/json'}
    }

    const deleteAnnotationRequestOption = {
      method: 'DELETE',
      headers: {'Content-Type':'application/json'}
    }

    useEffect(() =>{
        fetch(url,getAnnotationRequestOption).then(res => res.json())
          .then((data)=>{setAnnotationList(data);console.log(data);});
    },[]);
    
    const handleOnDeleteClick = (annotationId) =>{
      console.log("Delete Annotation "+annotationId);
      
      fetch(url+"/"+annotationId,deleteAnnotationRequestOption)
        .then(res => console.log(res.status));
      
      fetch(url,getAnnotationRequestOption).then(res => res.json())
      .then((data)=>{setAnnotationList(data);console.log(data);});
      
  }
    
  const handleGotoPage = (bookId,bookName,pageurl,chapterid,nofChapters) =>{
   
        fetch(config.BASE_PAGE_URL+pageurl)
                     .then((response) => { 
                         return response.json()
                        })
                       .then((data)=>{
                             return data.body;
                        })
                          .then((data) => {
                            dispatch(gotoPageAction(pageurl,bookId,bookName,chapterid,data,data.paragraphs,-1,{},chapterid));
                            });
   
  }
    
    return ( 
      <Container fluid="true">  
          {
            annotationList.map((element,i) =>
              <div key={i} style={{paddingLeft:50}}>
                <Card>
                    
                    <Card.Body>
                      <Card.Title>
                        <span onClick={()=>handleOnDeleteClick(element.id)}>
                          <BsFillTrashFill></BsFillTrashFill>
                        </span>
                        </Card.Title>
                        <span onClick={()=>handleGotoPage(element.bookId,element.bookName,element.pageUrl,element.pageNumber,element.chapterId)}>
                          <blockquote className="blockquote mb-0">
                            <h5>{element.bookName} {element.chapterId}</h5>
                            <p>
                              {element.verseNumber}  {element.verseText}
                            </p>
                            <p>
                              {element.commentText}
                            </p>
                            <footer className="blockquote-footer">
                                {element.formattedAnnotationDate}
                            </footer>
                            </blockquote>
                          </span>
                    </Card.Body>
                </Card>     
              
              </div>            
            )
          }
    
      </Container>
    );
}

export default AnnotationListComponent;
