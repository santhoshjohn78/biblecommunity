import React,{useState} from 'react';
import { BsBook } from "react-icons/bs";

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import TOCComponent from './TOCComponent';

import { BsPencil } from "react-icons/bs";
import { BsBookmarks } from "react-icons/bs";

import Scrollbar from 'react-scrollbars-custom';

function ToolBarComponent(props){

    console.log("ToolBarComponent is being rendered...");
    const { name } = props;
    const [showTOC,setShowTOC] = useState(true);

    return (
        <div>
            <SideNav style={{backgroundColor:'grey'}}
                    onSelect={(selected) => {
                        // Add your code here
                        console.log(selected);
                        if (selected === 'toc'){
                            if (showTOC == false)
                                setShowTOC(true);
                            else
                                setShowTOC(false);
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
            <Scrollbar style={{ height: 700 }}>
            {showTOC &&  <TOCComponent></TOCComponent>}
            </Scrollbar>
          </div>
    );
  

}

export default ToolBarComponent;