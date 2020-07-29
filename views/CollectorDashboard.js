import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Footer from "../components/Footer";
import FirstGrid from "../components/FirstGrid";
import Table from "../components/table";
import Search from "../components/search";
import Fab from "@material-ui/core/Fab";
import ProfessorDrawer from "../components/professorDrawer";
import Companylogo from "../assets/companyLogo.svg";
import john from "../assets/john.svg";
import { url, FetchTable } from "../constants/constants";
import Axios from "axios";
import { connect } from "react-redux";
import Analytics from "../components/Analytics";
import { SelectedTable, SelectedTableDelete } from "../constants/constants";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: "1vw",
    paddingRight: "1vw",
  },
  headerFont: {
    color: "white",
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class CollectorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professorOpen: false,
      id: "pier9",
    };
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
  fetchTable(id) {
    if (id === "") {
      Axios({
        method: "GET",
        url: url + "/ExtractData",
      })
        .then((res) => {
          this.props.dispatch({
            type: FetchTable,
            payload: res.data,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      Axios.get(url + "/SelectedTable", {
        params: { business_code: id },
      }).then((res) => {
        this.props.dispatch({
          type: SelectedTable,
          payload: res.data,
        });
      });
    }
  }

  fetchTableNew(id) {
    this.fetchTable(id);
    this.setState({
      id: id,
    });
  }

  deleteSelectedTable() {
    this.props.dispatch({
      type: SelectedTableDelete,
    });
    this.setState({
      id: "",
    });
  }

  componentWillMount() {
    this.fetchTable("");
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item container xs={12}>
          <Grid item container xs={5}>
            <Grid item xs={1}>
              <img
                src={Companylogo}
                style={{ marginTop: "25%" }}
                alt={"S"}
              ></img>
            </Grid>
            <Grid item xs={11}>
              <h2 className={classes.headerFont}>ABC Products</h2>
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
                marginTop: "5%",
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
        <FirstGrid
          data={
            this.props.selectedTable.length !== 0
              ? this.props.selectedTable
              : this.props.table
          }
        ></FirstGrid>
        <Grid item xs={12} sm={4}>
          <Grid item xs={12}>
            <Analytics
              data={this.props.table}
              click={this.fetchTableNew.bind(this)}
              deClick={this.deleteSelectedTable.bind(this)}
            ></Analytics>
          </Grid>
          <Grid item xs={12} style={{ marginRight: "5%", marginTop: "5%" }}>
            <Search></Search>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Table
            table={
              this.props.selectedTable.length !== 0
                ? this.props.selectedTable
                : this.props.table
            }
          ></Table>
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  table: state.table,
  selectedTable: state.selectedTable,
});

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(CollectorDashboard)
);
