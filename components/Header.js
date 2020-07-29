import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';
import companyLogo from '../assets/companyLogo.svg';
import FredaButton from '../assets/FredaButton.png';

import Dialog from './chatbot';

import { Paper, Drawer, Button, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';



export default function  Header () {
    const styles={
        appbar: {margin:"0.5rem 0rem 0rem 0rem", height: "4rem"},
        bgstyle: {elevation: "0"},
        title: {fontSize: "1.5rem",margin:"2rem"},
        top: {textAlign: "center",marginLeft:"29%",marginRight:"20%", paddingBottom: "30px"},
        topright: {textAlign: "center",marginLeft:"auto", borderRadius: "20px", padding:"4px"}
    },
     styles2={
        bgstyle:{backgroundColor:"orange",borderRadius:"0px 0px 10px 10px",marginLeft:"550px",position:"sticky"},
        title: {fontSize:"0.8rem",color:"white",paddingleft:"8px",paddingRight:"8px",paddingBottom:"8px"},
    }
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
      
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
  
      const list = (anchor) => (
        <div //className={clsx(classes.list, {[classes.fullList]: anchor === 'top' || anchor === 'bottom',})}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            {['Inbox'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon><h1>PROFESSOR</h1> </ListItemIcon>
                <ListItemText  style = {{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}><CloseIcon /></ListItemText>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            
              <ListItem >
                
                <ListItemText><Dialog /></ListItemText>
              </ListItem>
            
          </List>
        </div>
      );
     return(

        <div>
            <AppBar  position="relative" style={styles.appbar} elevation={0}>
                <Toolbar>
                        <Icon>
                    <img src={companyLogo} alt="Company Logo" width="25px" />
                         </Icon>
                    <Typography variant="h6" color="inherit">
                        <h6 style={styles.title}>ABC PRODUCTS</h6>

                    </Typography>
                    <div >
                        <button style={styles2.title , styles2.bgstyle }>
                        <Typography> 
                        <h6 >Recivables Dashboard</h6>
                        </Typography>
                        </button>
                      
           
        </div>
                    <div  style={styles.topright}>
                        <div width="20%" >
                        {['right'].map((anchor) => (
                                    <React.Fragment key={anchor}>
                                    <Button 
                                        autoid="professor-button"
                                        color="inherit" 
                                        onClick={toggleDrawer(anchor, true)} 
                                        style={{ marginRight: "0px" }}
                                    >
                                        <img src={FredaButton} width="150px" alt = ""
                                        style={{ borderRadius: "13px", padding: "0rem"}} />
                                    </Button>
                                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} variant={"persistent"} classes={{ paper: styles.paper }}>
                                        {list(anchor)}
                                    </Drawer>
                                    </React.Fragment>
                                ))}
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
  }