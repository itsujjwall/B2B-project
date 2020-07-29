import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { formatter } from "../utils/formatter";
import { Button, Grid } from "@material-ui/core";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import { connect } from "react-redux";
import { url, customerDetails } from "../constants/constants";
import Axios from "axios";
import ModifyDialog from "../components/modifyDialog";
import { CircularProgress } from "@material-ui/core";

const rows = [
  {
    id: "0",
    numeric: false,
    disablePadding: true,
    label: "Company ID",
  },
  { id: "1", numeric: true, disablePadding: false, label: "Account Header ID" },
  { id: "2", numeric: true, disablePadding: false, label: "Document Number" },
  { id: "3", numeric: true, disablePadding: false, label: "Business Code" },
  { id: "4", numeric: true, disablePadding: false, label: "Document Type" },
  { id: "5", numeric: true, disablePadding: false, label: "Customer Number" },
  { id: "6", numeric: true, disablePadding: false, label: "Customer Map ID" },
  { id: "7", numeric: true, disablePadding: false, label: "Name Of Customer" },
  {
    id: "8",
    numeric: true,
    disablePadding: false,
    label: "Document Create Date",
  },
  { id: "9", numeric: true, disablePadding: false, label: "Baseline Date" },
  { id: "10", numeric: true, disablePadding: false, label: "Invoice Date" },
  { id: "11", numeric: true, disablePadding: false, label: "Invoice ID" },
  {
    id: "12",
    numeric: true,
    disablePadding: false,
    label: "Total Open Amount",
  },
  {
    id: "13",
    numeric: true,
    disablePadding: false,
    label: "Customer Payment Terms",
  },
  { id: "14", numeric: true, disablePadding: false, label: "Clear Date" },
  { id: "15", numeric: true, disablePadding: false, label: "Is Open Invoice" },
  { id: "16", numeric: true, disablePadding: false, label: "Shipping Date" },
  { id: "17", numeric: true, disablePadding: false, label: "Payment Amount" },
  {
    id: "18",
    numeric: true,
    disablePadding: false,
    label: "Days past Due date",
  },
  { id: "19", numeric: true, disablePadding: false, label: "Doc Id" },
  {
    id: "20",
    numeric: true,
    disablePadding: false,
    label: "Document Create Date",
  },
  {
    id: "21",
    numeric: true,
    disablePadding: false,
    label: "Actual Amount Outstanding",
  },
  { id: "22", numeric: true, disablePadding: false, label: "Age of Invoice" },
  { id: "23", numeric: true, disablePadding: false, label: "Invoice Currency" },
];

class EnhancedTableHead extends React.Component {
  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              style={{ color: "white" }}
            />
          </TableCell>
          {rows.map(
            (row) => (
              <TableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
                style={{ color: "white" }}
              >
                <TableSortLabel direction={order} style={{ color: "white" }}>
                  {row.label}
                </TableSortLabel>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = (theme) => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: "1 1 100%",
  },
  actions: {
    marginTop: "10px",
    color: theme.palette.text.secondary,
  },
  title: {
    flex: "0 0 auto",
  },
  buttonDisabled: {
    margin: theme.spacing.unit,
    color: "#cfd8dc",
  },
  button: {
    margin: theme.spacing.unit,
    color: "#64b5f6",
  },
  divider: {
    borderLeft: "2px solid #5ca9e3",
  },
  para: {
    color: "white",
    marginTop: "-2px",
  },
  textColor: {
    color: "white",
  },
  spacing: {
    marginLeft: theme.spacing.unit * -3,
  },
});

let EnhancedTableToolbar = (props) => {
  const { numSelected, classes } = props;
  const findOpenAR = (data) => {
    const openARarray = data.map((d) => d.actual_open_amount);
    const totalOpenAR = openARarray.reduce((tot, item) => (tot += item), 0);
    return totalOpenAR;
  };
  const findOpenInvoices = (data) => {
    const isOpenArr = data.map((d) => d.isOpen);
    const totalOpenInvoices = isOpenArr.filter((i) => i === 1).length;
    return totalOpenInvoices;
  };

  return (
    <Toolbar className={classes.root}>
      <Grid container>
        <Grid item container xs={8} style={{ marginTop: "20px" }}>
          <Grid item xs={2}>
            <div className={classes.title}>
              {numSelected === 1 ? (
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={props.onClick}
                  style={{ borderColor: "#64b5f6" }}
                  autoid="modify-button"
                >
                  Modify
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  className={classes.buttonDisabled}
                  style={{ color: "#90a4ae", borderColor: "#90a4ae" }}
                  autoid="modify-button"
                  disabled
                >
                  Modify
                </Button>
              )}
            </div>
          </Grid>
          <Grid item xs={10} className={classes.spacing}>
            <div className={classes.title}>
              {numSelected > 0 ? (
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={props.onSave}
                  style={{ borderColor: "#64b5f6" }}
                  autoid="export-button"
                >
                  Export
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  className={classes.buttonDisabled}
                  style={{ color: "#90a4ae", borderColor: "#90a4ae" }}
                  autoid="export-button"
                  disabled
                >
                  Export
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
        <Grid item container xs={4} className={classes.actions}>
          <Grid item xs={6}>
            <Typography
              variant="h5"
              className={classes.textColor}
              autoid="total-open-invoices-customer"
            >
              {findOpenInvoices(props.data)}
            </Typography>
            <p className={classes.para}>Total Open Invoices</p>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h5"
              className={classes.textColor}
              autoid="total-open-amount-customer"
            >
              {"$" + formatter(findOpenAR(props.data))}
            </Typography>
            <p className={classes.para}>Total Open Amount</p>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = (theme) => ({
  root: {
    width: "100%",
    height: "80vh",
    marginTop: theme.spacing.unit * 3,
    backgroundColor: "#252C48",
  },
  table: {
    minWidth: 1020,
    backgroundColor: "#1B1F38",
  },
  tableWrapper: {
    marginTop: "0.5%",
    height: "60vh",
    overflowX: "auto",
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

class EnhancedTable extends React.Component {
  state = {
    order: "asc",
    orderBy: "c",
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 10,
    length: 0,
  };

  async componentWillMount() {
    this.fetchCustomerDetails(this.props.value);
  }

  fetchCustomerDetails = (query) => {
    Axios.get(url + "/ExtractCustomerDetails", {
      params: { search_id: query },
    })
      .then((res) => {
        this.props.dispatch({
          type: customerDetails,
          payload: res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  getAll() {
    var all = [];
    for (var i = 0; i < this.props.customerDetails.length; i++) all.push(i + 1);
    return all;
  }

  handleSelectAllClick = (event) => {
    if (event.target.checked) {
      this.setState({
        selected: this.getAll(),
      });
      return;
    }
    this.setState({ selected: [] });
  };

  handleSave = () => {
    var obj = null;
    var st =
      "acct_doc_header_id,actual_open_amount,baseline_create_date,business_area,business_code,clearing_date,clearing_date_norm,company_id,create_year,cust_payment_terms,customer_name,customer_number,customer_number_norm,dayspast_due,debit_credit_indicator,discount_due_date_norm,disputed_amount,division,doctype,document_create_date,document_create_date_norm,document_creation_date,document_id,document_line_number,document_number,document_number_norm,due_date,due_date_norm,fk_customer_map_id,invoice_age,invoice_amount_doc_currency,invoice_date_norm,invoice_id,invoice_id_norm,isOpen,order_date,order_date_norm,paid_amount,payment_method,posting_date,posting_date_norm,posting_id,reason_code,ship_date,ship_to,total_open_amount,total_open_amount_norm\n";
    for (var i = 0; i < this.state.selected.length; i++) {
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .acct_doc_header_id !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1]
            .acct_doc_header_id
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .actual_open_amount !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1]
            .actual_open_amount
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .baseline_create_date !== "undefined"
      ) {
        obj = new Date(
          this.props.customerDetails[
            this.state.selected[i] - 1
          ].baseline_create_date
        );
        st += `${obj.toDateString()},`;
      } else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .business_area !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1].business_area
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .business_code !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1].business_code
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .clearing_date !== "undefined"
      ) {
        obj = new Date(
          this.props.customerDetails[this.state.selected[i] - 1].clearing_date
        );
        st += `${obj.toDateString()},`;
      } else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .clearing_date_norm !== "undefined"
      ) {
        obj = new Date(
          this.props.customerDetails[
            this.state.selected[i] - 1
          ].clearing_date_norm
        );
        st += `${obj.toDateString()},`;
      } else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .company_id !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1].company_id
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .create_year !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1].create_year
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .cust_payment_terms !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1]
            .cust_payment_terms
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .customer_name !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1].customer_name
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .customer_number !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1].customer_number
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .customer_number_norm !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1]
            .customer_number_norm
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .dayspast_due !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1].dayspast_due
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .debit_credit_indicator !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1]
            .debit_credit_indicator
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .discount_due_date_norm !== "undefined"
      ) {
        obj = new Date(
          this.props.customerDetails[
            this.state.selected[i] - 1
          ].discount_due_date_norm
        );
        st += `${obj.toDateString()},`;
      } else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .disputed_amount !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1].disputed_amount
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .division !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1].division
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .doctype !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1].doctype
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .document_create_date !== "undefined"
      ) {
        obj = new Date(
          this.props.customerDetails[
            this.state.selected[i] - 1
          ].document_create_date
        );
        st += `${obj.toDateString()},`;
      } else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .document_create_date_norm !== "undefined"
      ) {
        obj = new Date(
          this.props.customerDetails[
            this.state.selected[i] - 1
          ].document_create_date_norm
        );
        st += `${obj.toDateString()},`;
      } else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .document_creation_date !== "undefined"
      ) {
        obj = new Date(
          this.props.customerDetails[
            this.state.selected[i] - 1
          ].document_creation_date
        );
        st += `${obj.toDateString()},`;
      } else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .document_id !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1].document_id
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .document_line_number !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1]
            .document_line_number
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .document_number !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1].document_number
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .document_number_norm !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1]
            .document_number_norm
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .due_date !== "undefined"
      ) {
        obj = new Date(
          this.props.customerDetails[this.state.selected[i] - 1].due_date
        );
        st += `${obj.toDateString()},`;
      } else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .due_date_norm !== "undefined"
      ) {
        obj = new Date(
          this.props.customerDetails[this.state.selected[i] - 1].due_date_norm
        );
        st += `${obj.toDateString()},`;
      } else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .fk_customer_map_id !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1]
            .fk_customer_map_id
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .invoice_age !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1].invoice_age
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .invoice_amount_doc_currency !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1]
            .invoice_amount_doc_currency
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .invoice_date_norm !== "undefined"
      ) {
        obj = new Date(
          this.props.customerDetails[
            this.state.selected[i] - 1
          ].invoice_date_norm
        );
        st += `${obj.toDateString()},`;
      } else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .invoice_id !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1].invoice_id
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .invoice_id_norm !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1].invoice_id_norm
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1].isOpen !==
        "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1].isOpen
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .order_date !== "undefined"
      ) {
        obj = new Date(
          this.props.customerDetails[this.state.selected[i] - 1].order_date
        );
        st += `${obj.toDateString()},`;
      } else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .order_date_norm !== "undefined"
      ) {
        obj = new Date(
          this.props.customerDetails[this.state.selected[i] - 1].order_date_norm
        );
        st += `${obj.toDateString()},`;
      } else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .paid_amount !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1].paid_amount
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .payment_method !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1].payment_method
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .posting_date !== "undefined"
      ) {
        obj = new Date(
          this.props.customerDetails[this.state.selected[i] - 1].posting_date
        );
        st += `${obj.toDateString()},`;
      } else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .posting_date_norm !== "undefined"
      ) {
        obj = new Date(
          this.props.customerDetails[
            this.state.selected[i] - 1
          ].posting_date_norm
        );
        st += `${obj.toDateString()},`;
      } else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .posting_id !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1].posting_id
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .reason_code !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1].reason_code
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .ship_date !== "undefined"
      ) {
        obj = new Date(
          this.props.customerDetails[this.state.selected[i] - 1].ship_date
        );
        st += `${obj.toDateString()},`;
      } else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .ship_to !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1].ship_to
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .total_open_amount !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1]
            .total_open_amount
        },`;
      else st += ",";
      if (
        typeof this.props.customerDetails[this.state.selected[i] - 1]
          .total_open_amount_norm !== "undefined"
      )
        st += `${
          this.props.customerDetails[this.state.selected[i] - 1]
            .total_open_amount_norm
        },`;
      else st += ",";
      st += "\n";
    }

    var b = new Blob([st], { type: "text/plain" });
    const url = window.URL.createObjectURL(b);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "1704546_exportedData.csv";
    a.click();
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = (id) => this.state.selected.indexOf(id) !== -1;

  parse(data) {
    var dt = [];
    for (var i = 0; i < data.length; i++) dt.push({ id: i + 1, ...data[i] });
    return dt;
  }

  handleModify(data, selected) {
    for (var i = 0; i < data.length; i++)
      if (data[i].id === selected[0]) {
        this.setState({
          data: data[i],
        });
      }
    return;
  }

  handleModifyClose() {
    this.fetchCustomerDetails(this.props.value);
    this.setState({
      data: [],
    });
  }

  render() {
    const { classes } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const data =
      this.props.updatedTable.length !== 0
        ? this.parse(this.props.updatedTable)
        : this.parse(this.props.customerDetails);
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    if (data.length === 0) {
      return (
        <div className={classes.loader}>
          <CircularProgress className={classes.colorPrimary} />
        </div>
      );
    }
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onClick={this.handleModify.bind(this, data, this.state.selected)}
          onSave={this.handleSave.bind(this)}
          data={data}
        />
        {this.state.data.length !== 0 && (
          <ModifyDialog
            data={this.state.data}
            number={this.props.value}
            onClose={this.handleModifyClose.bind(this)}
          ></ModifyDialog>
        )}
        <Paper style={{ width: "95%", marginLeft: "3%" }}>
          <div className={classes.tableWrapper}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              autoid="invoice-table-customer"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleSelectAllClick}
                onSelectAllClick={this.handleSelectAllClick}
                rowCount={data.length}
                value={data}
              />
              <TableBody>
                {data.length !== 0 &&
                  data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((n) => {
                      const isSelected = this.isSelected(n.id);
                      return (
                        <TableRow
                          hover
                          onClick={(event) => this.handleClick(event, n.id)}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={n.id}
                          selected={isSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isSelected}
                              style={{ color: "white" }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            padding="none"
                            style={{ color: "white" }}
                          >
                            {n.company_id}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.acct_doc_header_id}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.document_number}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.business_code}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.doctype}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.customer_number}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.fk_customer_map_id}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.customer_name}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.document_create_date}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.baseline_create_date}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.invoice_date_norm}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.invoice_id}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.total_open_amount}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.cust_payment_terms}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.clearing_date}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.isOpen}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.ship_date}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.paid_amount}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.dayspast_due}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.document_id}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.document_creation_date}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.actual_open_amount}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.invoice_age}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            {n.invoice_amount_doc_currency}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Paper>
        <TablePagination
          autoid="invoice-table-pagination-customer"
          rowsPerPageOptions={[10, 20, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
            autoid: "pagination-button-previous-customer",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
            autoid: "pagination-button-next-customer",
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          style={{ color: "white" }}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  customerDetails: state.customerDetails,
  updatedTable: state.updatedTable,
});

export default connect(mapStateToProps)(withStyles(styles)(EnhancedTable));
