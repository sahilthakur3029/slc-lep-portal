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
  numbers: {
    color: "black",
    textAlign: "center",
    fontSize: 15,
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
    color: theme.palette.getContrastText("#859438"),
    backgroundColor: "#859438",
    "&:hover": {
      backgroundColor: "#848438",
    },
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
        <InputLabel>First Name 1</InputLabel>
        <Input
          value={row.first_name_1 || ""}
          onChange={(event) => onChange("first_name_1", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Last Name 1</InputLabel>
        <Input
          value={row.last_name_1 || ""}
          onChange={(event) => onChange("last_name_1", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Email 1</InputLabel>
        <Input
          value={row.email_1 || ""}
          onChange={(event) => onChange("email_1", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Class Standing 1</InputLabel>
        <Input
          value={row.class_standing_1 || ""}
          onChange={(event) => onChange("class_standing_1", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Teach 1</InputLabel>
        <Input
          value={row.teach_1 || ""}
          onChange={(event) => onChange("teach_1", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Learn 1</InputLabel>
        <Input
          value={row.learn_1 || ""}
          onChange={(event) => onChange("learn_1", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl fullWidth>
        <InputLabel>Comments 1</InputLabel>
        <Input
          value={row.comments_1 || ""}
          onChange={(event) => onChange("comments_1", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>First Name 2</InputLabel>
        <Input
          value={row.first_name_2 || ""}
          onChange={(event) => onChange("first_name_2", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Last Name 2</InputLabel>
        <Input
          value={row.last_name_2 || ""}
          onChange={(event) => onChange("last_name_2", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Email 2</InputLabel>
        <Input
          value={row.email_2 || ""}
          onChange={(event) => onChange("email_2", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Class Standing 2</InputLabel>
        <Input
          value={row.class_standing_2 || ""}
          onChange={(event) => onChange("class_standing_2", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Teach 2</InputLabel>
        <Input
          value={row.teach_2 || ""}
          onChange={(event) => onChange("teach_2", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Learn 2</InputLabel>
        <Input
          value={row.learn_2 || ""}
          onChange={(event) => onChange("learn_2", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl fullWidth>
        <InputLabel>Comments 2</InputLabel>
        <Input
          value={row.comments_2 || ""}
          onChange={(event) => onChange("comments_2", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>First Name 3</InputLabel>
        <Input
          value={row.first_name_3 || ""}
          onChange={(event) => onChange("first_name_3", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Last Name 3</InputLabel>
        <Input
          value={row.last_name_3 || ""}
          onChange={(event) => onChange("last_name_3", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Email 3</InputLabel>
        <Input
          value={row.email_3 || ""}
          onChange={(event) => onChange("email_3", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Class Standing 3</InputLabel>
        <Input
          value={row.class_standing_3 || ""}
          onChange={(event) => onChange("class_standing_3", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Teach 3</InputLabel>
        <Input
          value={row.teach_3 || ""}
          onChange={(event) => onChange("teach_3", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Learn 3</InputLabel>
        <Input
          value={row.learn_3 || ""}
          onChange={(event) => onChange("learn_3", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl fullWidth>
        <InputLabel>Comments 3</InputLabel>
        <Input
          value={row.comments_3 || ""}
          onChange={(event) => onChange("comments_3", event.target.value)}
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

class Paired extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: "first_name_1", title: "First Name 1" },
        { name: "last_name_1", title: "Last Name 1" },
        { name: "email_1", title: "Email 1" },
        { name: "class_standing_1", title: "Class Standing 1" },
        { name: "teach_1", title: "Teach 1" },
        { name: "learn_1", title: "Learn 1" },
        // { name: "comments_1", title: "Comments 1" },
        { name: "first_name_2", title: "First Name 2" },
        { name: "last_name_2", title: "Last Name 2" },
        { name: "email_2", title: "Email 2" },
        { name: "class_standing_2", title: "Class Standing 2" },
        { name: "teach_2", title: "Teach 2" },
        { name: "learn_2", title: "Learn 2" },
        // { name: "comments_2", title: "Comments 2"},
        { name: "first_name_3", title: "First Name 3" },
        { name: "last_name_3", title: "Last Name 3" },
        { name: "email_3", title: "Email 3" },
        { name: "class_standing_3", title: "Class Standing 3" },
        { name: "teach_3", title: "Teach 3" },
        { name: "learn_3", title: "Learn 3" },
        // { name: "comments_3", title: "Comments 3"},
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
    this.countPairings = this.countPairings.bind(this);
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
        if (data.login === true) {
          this.setState({ isAuthenticated: true });
          let rows_array = [];
          let counter = 0;
          const { REACT_APP_PAIRS } = process.env;
          fetch(REACT_APP_PAIRS)
            .then((response) => response.json())
            .then((data) => {
              for (const pairing of data) {
                rows_array.push({
                  id: counter,
                  timestamp_1: pairing[0],
                  first_name_1: pairing[1],
                  last_name_1: pairing[2],
                  email_1: pairing[3],
                  class_standing_1: pairing[4],
                  teach_1: pairing[5],
                  learn_1: pairing[6],
                  comments_1: pairing[7],
                  timestamp_2: pairing[8],
                  first_name_2: pairing[9],
                  last_name_2: pairing[10],
                  email_2: pairing[11],
                  class_standing_2: pairing[12],
                  teach_2: pairing[13],
                  learn_2: pairing[14],
                  comments_2: pairing[15],
                  timestamp_3: pairing[16],
                  first_name_3: pairing[17],
                  last_name_3: pairing[18],
                  email_3: pairing[19],
                  class_standing_3: pairing[20],
                  teach_3: pairing[21],
                  learn_3: pairing[22],
                  comments_3: pairing[23],
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
        student["first_name_1"] === undefined ||
        student["first_name_1"].trim() === "" ||
        student["last_name_1"] === undefined ||
        student["last_name_1"].trim() === "" ||
        student["email_1"] === undefined ||
        student["email_1"].trim() === "" ||
        student["first_name_2"] === undefined ||
        student["first_name_2"].trim() === "" ||
        student["last_name_2"] === undefined ||
        student["last_name_2"].trim() === "" ||
        student["email_2"] === undefined ||
        student["email_2"].trim() === ""
      ) {
        errors = true;
      } else {
        student["first_name_1"] = titleCase(student["first_name_1"].trim());
        student["last_name_1"] = titleCase(student["last_name_1"].trim());
        student["email_1"] = student["email_1"].trim();
        student["first_name_2"] = titleCase(student["first_name_2"].trim());
        student["last_name_2"] = titleCase(student["last_name_2"].trim());
        student["email_2"] = student["email_2"].trim();
        //If errors occur could be due to third email
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
    const { REACT_APP_UPDATEPAIRS } = process.env;
    fetch(REACT_APP_UPDATEPAIRS, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": this.state.csrfToken,
      },
      body: JSON.stringify({
        pairsdata: this.state.rows,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
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

  countPairings() {
    let pairs = 0;
    let trios = 0;
    for (let i = 0; i < this.state.rows.length; i++) {
      if (
        this.state.rows[i]["first_name_3"] === null ||
        this.state.rows[i]["first_name_3"] === undefined ||
        this.state.rows[i]["first_name_3"].trim() === ""
      ) {
        pairs += 1;
      } else {
        trios += 1;
      }
    }
    let total = pairs * 2 + trios * 3;
    return (
      "There are " +
      pairs +
      " pairs and " +
      trios +
      " trios for a total of " +
      total +
      " students matched."
    );
  }

  render() {
    if (!this.state.rows) {
      return <div />;
    }
    // props is the useStyles variable
    const { classes } = this.props;
    const { rows, columns } = this.state;

    const RowDetail = ({ row }) => (
      <div>
        Comments for student 1: {row.comments_1} <br />
        Comments for student 2: {row.comments_2}
        <br />
        Comments for student 3: {row.comments_3}
      </div>
    );

    const columnWid = [
      { columnName: "first_name_1", width: 240 },
      { columnName: "last_name_1", width: 240 },
      { columnName: "email_1", width: 300 },
      { columnName: "class_standing_1", width: 240 },
      { columnName: "teach_1", width: 240 },
      { columnName: "learn_1", width: 240 },
      { columnName: "first_name_2", width: 240 },
      { columnName: "last_name_2", width: 240 },
      { columnName: "email_2", width: 240 },
      { columnName: "class_standing_2", width: 240 },
      { columnName: "teach_2", width: 240 },
      { columnName: "learn_2", width: 240 },
      { columnName: "first_name_3", width: 240 },
      { columnName: "last_name_3", width: 240 },
      { columnName: "email_3", width: 240 },
      { columnName: "class_standing_3", width: 240 },
      { columnName: "teach_3", width: 240 },
      { columnName: "learn_3", width: 240 },
    ];

    // const leftColumns = ['first_name', 'last_name'];

    return (
      <MuiThemeProvider>
        <TopBar />
        <h2 className={classes.heads}>Paired Students</h2>
        <h2 className={classes.numbers}>{this.countPairings()}</h2>
        {this.state.redirect}
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
          <Grid rows={rows} columns={columns} getRowId={getRowId}>
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

export default withStyles(useStyles)(Paired);
