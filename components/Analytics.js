import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Crossfilter from "crossfilter2";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { constructData } from "../utils/constructData";

const styles = (theme) => ({
  root: {
    scrollbarWidth: "thin",
    scrollbarColor: "gainsboro grey",
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

class Analytics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {},
    };
  }

  setoptionsForChart = (obj, click, deClick) => {
    const options = {
      chart: {
        type: "bar",
        backgroundColor: "#252C48",
        height: "900vh",
      },
      title: {
        text: "Total Amount by Company Code",
        style: {
          color: "#fff",
        },
      },
      xAxis: {
        categories: obj.categories,
        gridLineWidth: 0,
        labels: {
          style: {
            color: "#fff",
          },
        },
        title: {
          style: {
            color: "rgb(93,175,240,0.5)",
            fontSize: "14px",
            fontWeight: "bold",
          },
        },
      },
      yAxis: {
        gridLineWidth: 0,
        labels: {
          style: {
            color: "#fff",
          },
        },
        scrollbar: {
          enabled: true,
        },
      },
      scrollbar: {
        enabled: true,
      },
      colors: ["rgb(93,175,240,0.5)"],
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        series: {
          point: {
            events: {
              click: function () {
                this.select(null, false);
                if (this.selected) click(this.category);
                else deClick();
              },
            },
          },
          borderWidth: 0,
          pointWidth: 10,
        },
      },
      series: [
        {
          name: "Count",
          data: obj.seriesData,
          plotOptions: {
            series: {
              pointWidth: 20,
            },
          },
        },
      ],
    };
    this.setState({ options });
  };

  componentDidUpdate(prevProps, prevState) {
    const { data, click, deClick } = this.props;
    var dataset = Crossfilter(data);
    var businessCodeDim = dataset.dimension((d) => d.business_code);
    var totalOpenAmountGroup = businessCodeDim
      .group()
      .reduceSum((d) => d.actual_open_amount);
    const obj = constructData(totalOpenAmountGroup.all());
    if (prevProps.data !== data) {
      this.setoptionsForChart(obj, click, deClick);
    }
  }

  render() {
    const { data, classes } = this.props;

    // Display loader on page load
    if (data.length === 0) {
      return (
        <div className={classes.loader}>
          <CircularProgress className={classes.colorPrimary} />
        </div>
      );
    }
    return (
      <div
        className={classes.root}
        style={{
          height: "25vh",
          overflow: "auto",
          width: "95%",
          marginTop: "1.5rem",
          borderRadius: "2%",
        }}
      >
        <HighchartsReact
          highcharts={Highcharts}
          options={this.state.options}
          autoid="companycode-chart"
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: false })(Analytics);
