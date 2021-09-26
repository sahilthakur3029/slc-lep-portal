import React, { Component } from "react";
import TopBar from "../IntakeForm/TopBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { titleCase } from "title-case";
import // State or Local Processing Plugins
"@devexpress/dx-react-grid";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import {
  FormControl,
  Paper,
  Input,
  InputLabel,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from "@devexpress/dx-react-core";
import { EditingState } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  Toolbar,
  SearchPanel,
  TableHeaderRow,
  TableColumnResizing,
  TableRowDetail,
  TableFixedColumns,
  ColumnChooser,
  TableColumnVisibility,
  TableEditColumn,
} from "@devexpress/dx-react-grid-material-ui";
import {
  SearchState,
  IntegratedFiltering,
  SortingState,
  IntegratedSorting,
  RowDetailState,
} from "@devexpress/dx-react-grid";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
  },
  heads: {
    color: "black",
    textAlign: "center",
    fontSize: 35,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  tableClass: {
    backgroundColor: "red",
    color: "blue",
  },
});

const ColorButton = withStyles((theme) => ({
  root: {
    boxShadow: "0 3px 5px 2px rgba(60, 75, 120, .3)",
    background: "linear-gradient(45deg, #687732 30%, #7A8B39 90%)",
    backgroundColor: "#c123de",
    borderRadius: "6px",
    border: "0",
    display: "inline-block",
    cursor: "pointer",
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
    padding: "6px 24px",
    textDecoration: "none",
    textShadow: "0px 1px 0px #9b14b3",
    marginLeft: "30px",
    height: 32,
    margin: theme.spacing(1),
    marginLeft: "30px",
  },
}))(Button);

const EditPopup = ({
  row,
  onChange,
  onApplyChanges,
  onCancelChanges,
  open,
}) => (
  <Dialog open={open} onClose={onCancelChanges}>
    <DialogTitle>Edit Row</DialogTitle>
    <DialogContent>
      <FormControl>
        <InputLabel>First Name</InputLabel>
        <Input
          value={row.first_name || ""}
          onChange={(event) => onChange("first_name", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Last Name</InputLabel>
        <Input
          value={row.last_name || ""}
          onChange={(event) => onChange("last_name", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Email</InputLabel>
        <Input
          value={row.email || ""}
          onChange={(event) => onChange("email", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Class Standing</InputLabel>
        <Input
          value={row.level || ""}
          onChange={(event) => onChange("level", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Teach</InputLabel>
        <Input
          value={row.teach || ""}
          onChange={(event) => onChange("teach", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Learn</InputLabel>
        <Input
          value={row.learn || ""}
          onChange={(event) => onChange("learn", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl fullWidth>
        <InputLabel>Comments</InputLabel>
        <Input
          value={row.comments || ""}
          onChange={(event) => onChange("comments", event.target.value)}
        />
      </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancelChanges} color="primary">
        Cancel
      </Button>
      <Button onClick={onApplyChanges} color="secondary">
        Apply
      </Button>
    </DialogActions>
  </Dialog>
);

class EditPopupPlugin extends React.PureComponent {
  render() {
    // console.log("POPUP ", this.props.popupComponent);
    const { popupComponent: Popup } = this.props;
    return (
      <Plugin>
        <Template name="editPopup">
          <TemplateConnector>
            {(
              {
                addedRows,
                rows,
                getRowId,
                editingRowIds,
                createRowChange,
                rowChanges,
              },
              {
                changeRow,
                commitChangedRows,
                stopEditRows,
                cancelAddedRows,
                commitAddedRows,
                changeAddedRow,
              }
            ) => {
              const isAddMode = addedRows.length > 0;
              const isEditMode = editingRowIds.length > 0;

              const editRowId = editingRowIds[0] || 0;

              const open = isEditMode || isAddMode;
              const targetRow = rows.filter(
                (row) => getRowId(row) === editRowId
              )[0];
              const changedRow = isAddMode
                ? addedRows[0]
                : { ...targetRow, ...rowChanges[editRowId] };

              const processValueChange = (fieldName, newValue) => {
                const changeArgs = {
                  rowId: editRowId,
                  change: createRowChange(changedRow, newValue, fieldName),
                };

                if (isAddMode) {
                  changeAddedRow(changeArgs);
                } else {
                  changeRow(changeArgs);
                }
              };
              const applyChanges = () => {
                if (isEditMode) {
                  commitChangedRows({ rowIds: editingRowIds });
                } else {
                  commitAddedRows({ rowIds: [0] });
                }
                stopEditRows({ rowIds: editingRowIds });
              };
              const cancelChanges = () => {
                if (isAddMode) {
                  cancelAddedRows({ rowIds: [0] });
                }
                stopEditRows({ rowIds: editingRowIds });
              };

              return (
                <Popup
                  open={open}
                  row={changedRow}
                  onChange={processValueChange}
                  onApplyChanges={applyChanges}
                  onCancelChanges={cancelChanges}
                />
              );
            }}
          </TemplateConnector>
        </Template>
        <Template name="root">
          <TemplatePlaceholder />
          <TemplatePlaceholder name="editPopup" />
        </Template>
      </Plugin>
    );
  }
}

const getRowId = (row) => row.id;

class Unpaired extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: "first_name", title: "First Name" },
        { name: "last_name", title: "Last Name" },
        { name: "email", title: "Email" },
        { name: "level", title: "Level" },
        { name: "teach", title: "Teach" },
        { name: "learn", title: "Learn" },
      ],
      rows: [],
      redirect: null,
      csrfToken: "",
      isAuthenticated: "",
      openAlert: false,
      openAlertFail: false,
    };
    this.commitChanges = this.commitChanges.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.deleteRows = this.deleteRows.bind(this);
    this.pushData = this.pushData.bind(this);
  }

  componentDidMount() {
    const { REACT_APP_CSRF } = process.env;
    fetch(REACT_APP_CSRF, {
      credentials: "include",
    })
      .then((res) => {
        this.setState({ csrfToken: res.headers.get(["X-CSRFToken"]) });
      })
      .catch((err) => {
        this.setState({ redirect: <Redirect push to="/signin" /> });
      });
    const { REACT_APP_GET_SESSION } = process.env;
    fetch(REACT_APP_GET_SESSION, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.login == true) {
          this.setState({ isAuthenticated: true });
          let rows_array = [];
          let counter = 0;
          const { REACT_APP_UNPAIRS } = process.env;
          fetch(REACT_APP_UNPAIRS)
            .then((response) => response.json())
            .then((data) => {
              for (const student of data) {
                rows_array.push({
                  id: counter,
                  timestamp: student[0],
                  first_name: student[1],
                  last_name: student[2],
                  email: student[3],
                  level: student[4],
                  teach: student[5],
                  learn: student[6],
                  comments: student[7],
                });
                counter = counter + 1;
              }
              this.setState({
                rows: rows_array,
              });
            })
            .catch((error) =>
              alert(
                "Something went wrong in receiving data. Please try again later."
              )
            );
        } else {
          this.setState({ redirect: <Redirect push to="/signin" /> });
        }
      })
      .catch((err) => {
        alert("Something went wrong. Please reload and try again later.");
      });
  }
  continue = (e) => {
    e.preventDefault();
  };

  saveChanges() {
    let rowsCopy = [...this.state.rows];
    let errors = false;
    for (let i = 0; i < rowsCopy.length; i++) {
      let student = { ...rowsCopy[i] };
      if (
        student["first_name"] === undefined ||
        student["first_name"].trim() === "" ||
        student["last_name"] === undefined ||
        student["last_name"].trim() === ""
      ) {
        errors = true;
      } else {
        student["first_name"] = titleCase(student["first_name"].trim());
        student["last_name"] = titleCase(student["last_name"].trim());
      }
    }
    this.setState({ rows: rowsCopy }, () => {
      this.pushData(errors);
    });
    return "Complete";
  }
  pushData(errors) {
    if (errors) {
      this.setState({ openAlertFail: true });
      return;
    }
    const { REACT_APP_UPDATEUNPAIRED } = process.env;
    fetch(REACT_APP_UPDATEUNPAIRED, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": this.state.csrfToken,
      },
      body: JSON.stringify({
        unpaireddata: this.state.rows,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success == true) {
          this.setState({ openAlert: true });
          return "Success";
        } else {
          this.setState({ redirect: <Redirect push to="/signin" /> });
        }
      })
      .catch((error) =>
        alert("Something went wrong. Please reload try again later.")
      );
    return "Failed";
  }

  deleteRows(deletedIds) {
    let { rows } = this.state;
    const rowsForDelete = rows.slice();
    deletedIds.forEach((rowId) => {
      const index = rowsForDelete.findIndex((row) => row.id === rowId);
      if (index > -1) {
        rowsForDelete.splice(index, 1);
      }
    });
    return rowsForDelete;
  }

  commitChanges({ added, changed, deleted }) {
    let { rows } = this.state;
    let changedRows;

    if (changed) {
      changedRows = rows.map((row) =>
        changed[row.id] ? { ...row, ...changed[row.id] } : row
      );
    }
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (deleted) {
      changedRows = this.deleteRows(deleted);
    }
    this.setState({ rows: changedRows });
  }

  handleCloseOnAlert = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ openAlert: false });
  };

  handleCloseOnAlertFail = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openAlertFail: false });
  };

  render() {
    if (!this.state.rows) {
      return <div />;
    }
    // props is the useStyles variable
    const { values, handleChange, classes } = this.props;
    const { rows, columns } = this.state;

    const RowDetail = ({ row }) => <div>Comments: {row.comments}</div>;

    const columnWid = [
      { columnName: "first_name", width: 240 },
      { columnName: "last_name", width: 240 },
      { columnName: "email", width: 300 },
      { columnName: "level", width: 240 },
      { columnName: "learn", width: 240 },
      { columnName: "teach", width: 240 },
    ];

    return (
      <MuiThemeProvider>
        <TopBar />
        <h2 className={classes.heads}>Unpaired Students</h2>
        {this.state.redirect}
        {console.log(this.state.rows)}
        <Snackbar
          open={this.state.openAlert}
          autoHideDuration={5000}
          onClose={() => this.setState({ openAlert: false })}
        >
          <Alert onClose={this.handleCloseOnAlert} severity="success">
            Save Successful!
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.openAlertFail}
          autoHideDuration={5000}
          onClose={() => this.setState({ openAlertFail: false })}
        >
          <Alert onClose={this.handleCloseOnAlertFail} severity="error">
            Please ensure you have filled out all necessary fields correctly
          </Alert>
        </Snackbar>
        <Paper>
          <Grid rows={rows} columns={columns} getRowID={getRowId}>
            <SearchState defaultValue="" />
            <IntegratedFiltering />
            <RowDetailState defaultExpandedRowIds={[]} />
            <SortingState />
            <IntegratedSorting />
            <Table className={classes.tableClass} />
            <EditingState onCommitChanges={this.commitChanges} />
            <TableColumnResizing columnWidths={columnWid} />
            <TableHeaderRow showSortingControls resizingEnabled={true} />{" "}
            <TableRowDetail contentComponent={RowDetail} />
            <TableEditColumn showEditCommand showAddCommand showDeleteCommand />
            <TableColumnVisibility />
            <Toolbar />
            <EditPopupPlugin popupComponent={EditPopup} />
            <ColumnChooser />
            <SearchPanel />
          </Grid>
        </Paper>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ColorButton
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={() =>
              this.setState({ redirect: <Redirect push to="/adminhome" /> })
            }
          >
            Back
          </ColorButton>
          <ColorButton
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={this.saveChanges}
          >
            Save Changes
          </ColorButton>
          <br />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(Unpaired);
