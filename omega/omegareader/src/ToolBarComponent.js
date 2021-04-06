import React,{useState} from 'react';
import { BsBook } from "react-icons/bs";

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import TOCComponent from './menu-components/TOCComponent';
import BookMarksComponent from './menu-components/BookMarksComponent';
import AnnotationListComponent from './menu-components/AnnotationListComponent';

import { BsPencil } from "react-icons/bs";
import { BsBookmarks } from "react-icons/bs";

import Scrollbar from 'react-scrollbars-custom';

function ToolBarComponent(props){

    console.log("ToolBarComponent is being rendered...");
    const { name } = props;
    const [showTOC,setShowTOC] = useState(true);
    const [showBookMarks, setShowBookMarks] = useState(false);
    const [showAnnotations, setAnnotations] = useState(false);

    return (
        <div>
            <SideNav style={{backgroundColor:'#17a2b8'}}
                    onSelect={(selected) => {
                        // Add your code here
                        console.log(selected);
                        if (selected === 'toc'){
                            if (showTOC == false){
                                setShowTOC(true);
                                setShowBookMarks(false);
                                setAnnotations(false);
                            }else{
                                setShowTOC(false);
                            }
                        }
                        
                        if (selected === 'bookmarks'){
                            if (showBookMarks == false){
                                setShowBookMarks(true);
                                setShowTOC(false);
                                setAnnotations(false);
                            }else{
                                setShowBookMarks(false);
                            }
                        }

                        if (selected === 'annotations'){
                            if (showAnnotations == false){
                                setAnnotations(true);
                                setShowBookMarks(false);
                                setShowTOC(false);
                            }else{
                                setAnnotations(false);

                            }
                        }
                    }}
                >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="toc">
                        <NavIcon> 
                        <h3><BsBook></BsBook></h3>
                        </NavIcon>
                        <NavText>
                            Books
                        </NavText>
                        
                    </NavItem>
                    
                    
                    <NavItem eventKey="bookmarks">
                        <NavIcon>
                            <h3><BsBookmarks></BsBookmarks></h3>
                        </NavIcon>
                        <NavText>
                            Book Marks
                        </NavText>
                        
                        
                    </NavItem>
                    <NavItem eventKey="annotations">
                        <NavIcon>
                            <h3><BsPencil></BsPencil></h3>
                        </NavIcon>
                        <NavText>
                            Notes and Annotations
                        </NavText>
                        
                        
                    </NavItem>
                    
                </SideNav.Nav>
            </SideNav>
            <Scrollbar style={{ height: 800 }}>
            {showTOC &&  <TOCComponent></TOCComponent>}
            {showBookMarks &&  <BookMarksComponent></BookMarksComponent>}
            {showAnnotations && <AnnotationListComponent></AnnotationListComponent>}
            </Scrollbar>
          </div>
    );
  

}

export default ToolBarComponent;