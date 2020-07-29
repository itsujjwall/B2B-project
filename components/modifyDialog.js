import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { url, UpdateTable } from "../constants/constants";
import Axios from "axios";

class ModifyDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open_amount: this.props.data.actual_open_amount,
      doctype: this.props.data.doctype,
      open_amount_old: this.props.data.actual_open_amount,
      doctype_old: this.props.data.doctype,
      id: this.props.data.pk_id,
      open: true,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChangeOpenAmount = (e) => {
    this.setState({
      open_amount: e.target.value,
    });
  };

  handleChangeDoctype = (e) => {
    this.setState({
      doctype: e.target.value,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.onClose();
  };

  updateTable(openamount, doctype, id) {
    Axios.get(url + "/UpdateTable", {
      params: {
        open_amount: openamount,
        doctype: doctype,
        id: id,
        number: this.props.number,
      },
    })
      .then((res) => {
        this.props.dispatch({
          type: UpdateTable,
          payload: res.data,
        });
      })
      .then(this.setState({ open: false }))
      .then(this.props.onClose());
  }

  handleCloseSubmit = () => {
    this.updateTable(this.state.open_amount, this.state.doctype, this.state.id);
  };

  render() {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{ style: { backgroundColor: "#252C48" } }}
      >
        <DialogTitle id="form-dialog-title">
          <div style={{ color: "white" }}>Modify</div>
        </DialogTitle>
        <DialogContent>
          <TextField
            id="filled-full-width"
            label="Open Amount"
            placeholder="Don't leave this empty"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
              style: { color: "white" },
            }}
            inputProps={{
              style: { color: "white" },
            }}
            value={this.state.open_amount}
            onChange={this.handleChangeOpenAmount}
            variant="filled"
            autoid="open-amount-input"
          />
          <TextField
            id="filled-full-width"
            label="Doctype"
            placeholder="Don't leave this empty"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
              style: { color: "white" },
            }}
            inputProps={{
              style: { color: "white" },
            }}
            value={this.state.doctype}
            onChange={this.handleChangeDoctype}
            variant="filled"
            autoid="doctype-input"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleClose}
            style={{ color: "#90a4ae", borderColor: "#90a4ae" }}
            variant="outlined"
            autoid="modify-cancel-button"
          >
            Cancel
          </Button>

          {(this.state.open_amount_old === this.state.open_amount ||
            this.state.open_amount === "") &&
          (this.state.doctype === this.state.doctype_old ||
            this.state.doctype === "") ? (
            <Button
              onClick={this.handleCloseSubmit}
              style={{ color: "#9e9e9e" }}
              variant="contained"
              disabled
              autoid="modify-save-button"
            >
              Save
            </Button>
          ) : (
            <Button
              onClick={this.handleCloseSubmit}
              style={{ color: "white", backgroundColor: "#0091ea" }}
              variant="contained"
              autoid="modify-save-button"
            >
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => ({
  updatedTable: state.updatedTable,
});

export default connect(mapStateToProps)(ModifyDialog);
