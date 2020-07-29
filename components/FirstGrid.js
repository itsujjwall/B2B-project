import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { Card, CardContent, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { formatter } from "../utils/formatter";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: "1vw",
    paddingRight: "1vw",
  },
  textStyle1: {
    color: "#78909c",
    fontSize: "1.5vw",
    marginTop: "2vh",
    textAlign: "center",
  },
  textStyle2: {
    color: "white",
    fontSize: "2.5vw",
    marginTop: "1vh",
    textAlign: "center",
  },
  headerFont: {
    color: "white",
  },
  cardroot: {
    backgroundColor: "#252C48",
  },
  loader: {
    display: "flex",
    justifyColumn: "center",
    alignItems: "center",
    padding: "3rem",
    marginLeft: "10rem",
  },
  colorPrimary: {
    color: "#fff",
  },
});

class FirstGrid extends Component {
  fetchData() {
    if (this.props.data.length !== 0) {
      var totalCustomer = [
        ...new Set(this.props.data.map((e) => e.customer_name)),
      ].length;
      var totalOpenAR = this.props.data
        .map((e) => e.actual_open_amount)
        .reduce((tot, item) => (tot += item), 0);
      var totalOpenInvoices = this.props.data
        .map((e) => e.isOpen)
        .filter((i) => i === 1).length;
      var avgDaysdelay = parseInt(
        this.props.data
          .map((e) => e.dayspast_due)
          .reduce((tot, item) => (tot += item), 0) / this.props.data.length
      );
      return {
        totalCustomer: totalCustomer,
        totalOpenAR: totalOpenAR,
        totalOpenInvoices: totalOpenInvoices,
        avgDaysdelay: avgDaysdelay,
      };
    } else {
      return {
        totalCustomer: null,
        totalOpenAR: null,
        totalOpenInvoices: null,
        avgDaysdelay: null,
      };
    }
  }

  render() {
    const { classes } = this.props;

    const {
      totalCustomer,
      totalOpenAR,
      totalOpenInvoices,
      avgDaysdelay,
    } = this.fetchData();
    const firstGrid = [
      ["Total Customer", totalCustomer],
      ["Total Open AR", "$" + formatter(totalOpenAR)],
      ["Average Days Delay", avgDaysdelay],
      ["Total Open Invoices", totalOpenInvoices],
    ];
    const { data } = this.props;
    if (data.length === 0) {
      return (
        <div className={classes.loader}>
          <CircularProgress className={classes.colorPrimary} />
        </div>
      );
    }
    return (
      <Grid item container justify="center" spacing={24}>
        <Grid item xs={6} sm={3}>
          <Card className={classes.cardroot}>
            <CardContent>
              <Typography
                className={classes.textStyle1}
                color="textSecondary"
                gutterBottom
              >
                {firstGrid[0][0]}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className={classes.textStyle2}
                autoid="total-customers-text-collector"
              >
                {firstGrid[0][1]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card className={classes.cardroot}>
            <CardContent>
              <Typography
                className={classes.textStyle1}
                color="textSecondary"
                gutterBottom
              >
                {firstGrid[1][0]}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className={classes.textStyle2}
                autoid="total-open-ar-text-collector"
              >
                {firstGrid[1][1]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card className={classes.cardroot}>
            <CardContent>
              <Typography
                className={classes.textStyle1}
                color="textSecondary"
                gutterBottom
              >
                {firstGrid[2][0]}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className={classes.textStyle2}
                autoid="average-days-delay-text-collector"
              >
                {firstGrid[2][1]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card className={classes.cardroot}>
            <CardContent>
              <Typography
                className={classes.textStyle1}
                color="textSecondary"
                gutterBottom
              >
                {firstGrid[3][0]}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className={classes.textStyle2}
                autoid="total-open-invoice-text-collector"
              >
                {firstGrid[3][1]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  firstGrid: state.firstGrid,
});

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(FirstGrid)
);
