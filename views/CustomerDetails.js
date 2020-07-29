import React, { Component } from "react";
import { Fab } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Table from "../components/customer_table";
import { Link } from "react-router-dom";
import ProfessorDrawer from "../components/professorDrawer";
import john from "../assets/john.svg";
import Footer from "../components/Footer";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: "1vw",
    paddingRight: "1vw",
  },
  hellotext: {
    fontSize: "4vw",
    color: "#FFFFFFA6",
    height: "10vh",
  },
  hellotext1: {
    fontSize: "2.5vw",
    marginTop: "5vh",
    padding: "1vh",
    color: "#FFFFFF",
    backgroundColor: "#5DAAE0",
  },
  hellotext3: {
    fontSize: "1vw",
    marginTop: "5vh",
    padding: "0.5vh",
    color: "#FFFFFF",
    backgroundColor: "#5DAAE0",
  },
  hellotext2: {
    fontSize: "1.2vw",
    marginTop: "5vh",
    padding: "1vh",
    color: "#FFFFFF",
    backgroundColor: "#5DAAE0",
  },
  hellotext4: {
    fontSize: "1.5vw",
    marginTop: "2vh",
    padding: "1vh",
    color: "#FFFFFF",
  },
  searchBtn: {
    marginTop: "2vh",
    minWidth: "5vw",
    minHeight: "2.188vw",
    fontSize: "0.95vw",
    border: "solid 0.75px #3B617C",
    // marginRight: '0.5rem',
    alignSelf: "center",
    color: "#5DAAE0",
    "&:hover": {
      backgroundColor: "#5daae0",
      color: "white",
    },
  },
  headerFont: {
    color: "white",
  },
  link: {
    color: "white",
  },
});

class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professorOpen: false,
    };
  }

  handleClick() {
    return <Link to="/1704546"></Link>;
  }

  handleClose() {
    this.setState({
      professorOpen: false,
    });
  }

  handleOpen() {
    this.setState({
      professorOpen: true,
    });
  }

  render() {
    const id = this.props.location.state.id;
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid
          item
          container
          xs={12}
          style={{ marginBottom: "-2vh", marginTop: "-2vh" }}
        >
          <Grid item container xs={5}>
            <Grid item xs={1}>
              <IconButton
                className={classes.headerFont}
                aria-label="Delete"
                style={{ marginTop: "50%" }}
              >
                <Link
                  to="/"
                  className={classes.link}
                  autoid="navigation-back-button"
                >
                  <ArrowBackIcon />
                </Link>
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <h2 className={classes.headerFont} autoid="customer-name">
                {this.props.location.state.name}
              </h2>
              <h5
                className={classes.headerFont}
                style={{ marginTop: "-20px" }}
                autoid="customer-number"
              >
                {id}
              </h5>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <div
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                marginTop: "5%",
                backgroundColor: "#f57c00",
              }}
            >
              Receivables Dashboard
            </div>
          </Grid>
          <Grid item xs={5}>
            <Fab
              variant="extended"
              aria-label="Delete"
              className={classes.fab}
              size="small"
              style={{
                color: "white",
                backgroundColor: "#f57c00",
                marginTop: "7%",
                float: "right",
              }}
              onClick={this.handleOpen.bind(this)}
              autoid="professor-button"
            >
              Professor
              <img
                src={john}
                height="33vh"
                style={{ marginRight: "-20%", padding: "0 0 0 7%" }}
                alt={"S"}
              ></img>
            </Fab>
            {this.state.professorOpen ? (
              <ProfessorDrawer close={this.handleClose.bind(this)} />
            ) : null}
          </Grid>
        </Grid>
        <Table value={id}></Table>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CustomerDetails);
