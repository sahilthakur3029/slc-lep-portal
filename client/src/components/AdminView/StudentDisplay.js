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

// Things to do: Editing in a popup form

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
        <InputLabel>First Name *</InputLabel>
        <Input
          value={row.first_name || ""}
          onChange={(event) => onChange("first_name", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Last Name *</InputLabel>
        <Input
          value={row.last_name || ""}
          onChange={(event) => onChange("last_name", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Email *</InputLabel>
        <Input
          value={row.email || ""}
          onChange={(event) => onChange("email", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Class Standing</InputLabel>
        <Input
          value={row.class_standing || ""}
          onChange={(event) => onChange("class_standing", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Domestic Status</InputLabel>
        <Input
          value={row.domestic_status || ""}
          onChange={(event) => onChange("domestic_status", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Major</InputLabel>
        <Input
          value={row.major || ""}
          onChange={(event) => onChange("major", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Gender</InputLabel>
        <Input
          value={row.gender || ""}
          onChange={(event) => onChange("gender", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Custom Gender</InputLabel>
        <Input
          value={row.gender_custom || ""}
          onChange={(event) => onChange("gender_custom", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl fullWidth>
        <InputLabel>Availability</InputLabel>
        <Input
          value={row.days_of_week || ""}
          onChange={(event) => onChange("days_of_week", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Lang. 1 Learn *</InputLabel>
        <Input
          value={row.lang_1_learn || ""}
          onChange={(event) => onChange("lang_1_learn", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Lang. 1 Learn Other</InputLabel>
        <Input
          value={row.lang_1_learn_other || ""}
          onChange={(event) =>
            onChange("lang_1_learn_other", event.target.value)
          }
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Lang. 1 Learn Level *</InputLabel>
        <Input
          value={row.lang_1_learn_level || ""}
          onChange={(event) =>
            onChange("lang_1_learn_level", event.target.value)
          }
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Lang. 2 Learn</InputLabel>
        <Input
          value={row.lang_2_learn || ""}
          onChange={(event) => onChange("lang_2_learn", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Lang. 2 Learn Other</InputLabel>
        <Input
          value={row.lang_2_learn_other || ""}
          onChange={(event) =>
            onChange("lang_2_learn_other", event.target.value)
          }
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Lang. 2 Learn Level</InputLabel>
        <Input
          value={row.lang_2_learn_level || ""}
          onChange={(event) =>
            onChange("lang_2_learn_level", event.target.value)
          }
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Lang. 1 Teach *</InputLabel>
        <Input
          value={row.lang_1_teach || ""}
          onChange={(event) => onChange("lang_1_teach", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Lang. 1 Teach Other</InputLabel>
        <Input
          value={row.lang_1_teach_other || ""}
          onChange={(event) =>
            onChange("lang_1_teach_other", event.target.value)
          }
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Lang. 1 Teach Level *</InputLabel>
        <Input
          value={row.lang_1_teach_level || ""}
          onChange={(event) =>
            onChange("lang_1_teach_level", event.target.value)
          }
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Lang. 2 Teach</InputLabel>
        <Input
          value={row.lang_2_teach || ""}
          onChange={(event) => onChange("lang_2_teach", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Lang. 2 Teach Other</InputLabel>
        <Input
          value={row.lang_2_teach_other || ""}
          onChange={(event) =>
            onChange("lang_2_teach_other", event.target.value)
          }
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Lang. 2 Teach Level</InputLabel>
        <Input
          value={row.lang_2_teach_level || ""}
          onChange={(event) =>
            onChange("lang_2_teach_level", event.target.value)
          }
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Pref. Partner Major</InputLabel>
        <Input
          value={row.partner_major || ""}
          onChange={(event) => onChange("partner_major", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Pref. Major Weight</InputLabel>
        <Input
          value={row.partner_major_weight || ""}
          onChange={(event) =>
            onChange("partner_major_weight", event.target.value)
          }
        />
      </FormControl>{" "}
      <div>
        <FormControl>
          <InputLabel>Pref. Partner Gender</InputLabel>
          <Input
            value={row.partner_gender || ""}
            onChange={(event) => onChange("partner_gender", event.target.value)}
          />
        </FormControl>{" "}
        <FormControl>
          <InputLabel>Pref. Custom Gender</InputLabel>
          <Input
            value={row.partner_gender_custom || ""}
            onChange={(event) =>
              onChange("partner_gender_custom", event.target.value)
            }
          />
        </FormControl>{" "}
        <FormControl>
          <InputLabel>Pref. Gender Weight</InputLabel>
          <Input
            value={row.partner_gender_weight || ""}
            onChange={(event) =>
              onChange("partner_gender_weight", event.target.value)
            }
          />
        </FormControl>{" "}
      </div>
      <FormControl fullWidth>
        <InputLabel>Hope to Gain</InputLabel>
        <Input
          value={row.hope_to_gain || ""}
          onChange={(event) => onChange("hope_to_gain", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl fullWidth>
        <InputLabel>Plan to Meet</InputLabel>
        <Input
          value={row.plan_to_meet || ""}
          onChange={(event) => onChange("plan_to_meet", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl fullWidth>
        <InputLabel>Waiver Accept</InputLabel>
        <Input
          value={row.waiver_accept || ""}
          onChange={(event) => onChange("waiver_accept", event.target.value)}
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

class StudentDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: "first_name", title: "First Name" },
        { name: "last_name", title: "Last Name" },
        { name: "email", title: "Email" },
        { name: "class_standing", title: "Class Standing" },
        { name: "domestic_status", title: "Domestic Status" },
        { name: "major", title: "Major" },
        { name: "gender", title: "Gender" },
        { name: "gender_custom", title: "Custom Gender" },
        { name: "days_of_week", title: "Availability" },
        { name: "lang_1_learn", title: "Lang. 1 Learn" },
        { name: "lang_1_learn_other", title: "Lang. 1 Learn Other" },
        { name: "lang_1_learn_level", title: "Lang. 1 Learn Level" },
        { name: "lang_2_learn", title: "Lang. 2 Learn" },
        { name: "lang_2_learn_other", title: "Lang. 2 Learn Other" },
        { name: "lang_2_learn_level", title: "Lang. 2 Learn Level" },
        { name: "lang_1_teach", title: "Lang. 1 Teach" },
        { name: "lang_1_teach_other", title: "Lang. 1 Teach Other" },
        { name: "lang_1_teach_level", title: "Lang. 1 Teach Level" },
        { name: "lang_2_teach", title: "Lang. 2 Teach" },
        { name: "lang_2_teach_other", title: "Lang. 2 Teach Other" },
        { name: "lang_2_teach_level", title: "Lang. 2 Teach Level" },
        { name: "partner_major", title: "Pref. Partner Major" },
        { name: "partner_major_weight", title: "Pref. Major Weight" },
        { name: "partner_gender", title: "Pref. Partner Gender" },
        { name: "partner_gender_custom", title: "Pref. Custom Gender" },
        { name: "partner_gender_weight", title: "Pref. Gender Weight" },
        { name: "comments", title: "Comments" },
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
        if (data.login === true) {
          this.setState({ isAuthenticated: true });
          const { REACT_APP_NAMES } = process.env;
          let rows_array = [];
          let counter = 0;
          fetch(REACT_APP_NAMES)
            .then((response) => response.json())
            .then((data) => {
              for (const student of data) {
                rows_array.push({
                  id: counter,
                  first_name: student[0],
                  last_name: student[1],
                  email: student[2],
                  class_standing: student[3],
                  domestic_status: student[4],
                  major: student[5],
                  gender: student[6],
                  gender_custom: student[7],
                  days_of_week: student[8].join(", "),
                  hope_to_gain: student[9],
                  plan_to_meet: student[10],
                  lang_1_learn: student[11],
                  lang_1_learn_other: student[12],
                  lang_1_learn_level: student[13],
                  lang_2_learn: student[14],
                  lang_2_learn_other: student[15],
                  lang_2_learn_level: student[16],
                  lang_1_teach: student[17],
                  lang_1_teach_other: student[18],
                  lang_1_teach_level: student[19],
                  lang_2_teach: student[20],
                  lang_2_teach_other: student[21],
                  lang_2_teach_level: student[22],
                  comments: student[23],
                  partner_major: student[24],
                  partner_major_weight: student[25],
                  partner_gender: student[26],
                  partner_gender_custom: student[27],
                  partner_gender_weight: student[28],
                  waiver_accept: student[29],
                  timestamp: student[30],
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

  saveChanges() {
    let rowsCopy = [...this.state.rows];
    let errors = false;
    for (let i = 0; i < rowsCopy.length; i++) {
      let student = { ...rowsCopy[i] };
      if (
        student["first_name"] === undefined ||
        student["first_name"].trim() === "" ||
        student["last_name"] === undefined ||
        student["last_name"].trim() === "" ||
        student["email"] === undefined ||
        student["email"].trim() === "" ||
        student["lang_1_learn"] === undefined ||
        student["lang_1_learn"].trim() === "" ||
        student["lang_1_learn_level"] === undefined ||
        student["lang_1_teach"] === undefined ||
        student["lang_1_teach"].trim() === "" ||
        student["lang_1_teach_level"] === undefined ||
        !/^[1-5]$/.test(student["lang_1_learn_level"]) ||
        !/^[1-5]$/.test(student["lang_1_teach_level"])
      ) {
        errors = true;
      } else {
        student["first_name"] = titleCase(student["first_name"].trim());
        student["last_name"] = titleCase(student["last_name"].trim());
        student["email"] = student["email"].trim();
        student["lang_1_learn"] = titleCase(student["lang_1_learn"].trim());
        student["lang_1_teach"] = titleCase(student["lang_1_teach"].trim());
        // if values do exist, trim them (gets rid of accidental whitespace)
        if (student["lang_2_learn"] !== undefined) {
          student["lang_2_learn"] = titleCase(student["lang_2_learn"].trim());
          if (student["lang_2_learn"] !== "") {
            if (!/^[1-5]$/.test(student["lang_2_learn_level"])) {
              errors = true;
            }
          } else {
            student["lang_2_learn_level"] = "0";
          }
        }
        if (student["lang_2_teach"] !== undefined) {
          student["lang_2_teach"] = titleCase(student["lang_2_teach"].trim());
          if (student["lang_2_teach"] !== "") {
            if (!/^[1-5]$/.test(student["lang_2_teach_level"])) {
              errors = true;
            }
          } else {
            student["lang_2_teach_level"] = "0";
          }
        }
        if (student["partner_major"] !== undefined) {
          student["partner_major"] = student["partner_major"].trim();
          if (student["partner_major"] !== "") {
            if (!/^[1-5]$/.test(student["partner_major_weight"])) {
              errors = true;
            }
          } else {
            student["partner_major_weight"] = "0";
          }
        }
        if (student["partner_gender"] !== undefined) {
          student["partner_gender"] = titleCase(
            student["partner_gender"].trim()
          );
          if (student["partner_gender"] !== "") {
            if (!/^[1-5]$/.test(student["partner_gender_weight"])) {
              errors = true;
            }
          } else {
            student["partner_gender_weight"] = "0";
          }
        }
        if (student["gender"] !== undefined) {
          student["gender"] = titleCase(student["gender"].trim());
        }
        if (student["major"] !== undefined) {
          student["major"] = student["major"].trim();
        }
      }
      rowsCopy[i] = student;
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
    const { REACT_APP_UPDATEINTAKE } = process.env;
    fetch(REACT_APP_UPDATEINTAKE, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": this.state.csrfToken,
      },
      body: JSON.stringify({
        intakedata: this.state.rows,
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

  render() {
    if (!this.state.rows) {
      return <div />;
    }
    // props is the useStyles variable
    const { classes } = this.props;
    const { rows, columns } = this.state;

    const RowDetail = ({ row }) => (
      <div>
        Hope to Gain: {row.hope_to_gain}
        <br />
        Plan to Meet: {row.plan_to_meet}
        <br />
        Waiver Acceptance: {row.waiver_accept}
      </div>
    );

    const columnWid = [
      { columnName: "first_name", width: 240 },
      { columnName: "last_name", width: 240 },
      { columnName: "email", width: 300 },
      { columnName: "class_standing", width: 180 },
      { columnName: "domestic_status", width: 180 },
      { columnName: "major", width: 240 },
      { columnName: "gender", width: 180 },
      { columnName: "gender_custom", width: 180 },
      { columnName: "days_of_week", width: 240 },
      { columnName: "lang_1_learn", width: 180 },
      { columnName: "lang_1_learn_other", width: 180 },
      { columnName: "lang_1_learn_level", width: 180 },
      { columnName: "lang_2_learn", width: 180 },
      { columnName: "lang_2_learn_other", width: 180 },
      { columnName: "lang_2_learn_level", width: 180 },
      { columnName: "lang_1_teach", width: 180 },
      { columnName: "lang_1_teach_other", width: 180 },
      { columnName: "lang_1_teach_level", width: 180 },
      { columnName: "lang_2_teach", width: 180 },
      { columnName: "lang_2_teach_other", width: 180 },
      { columnName: "lang_2_teach_level", width: 180 },
      { columnName: "partner_major", width: 180 },
      { columnName: "partner_major_weight", width: 180 },
      { columnName: "partner_gender", width: 180 },
      { columnName: "partner_gender_custom", width: 180 },
      { columnName: "partner_gender_weight", width: 180 },
      { columnName: "comments", width: 1200 },
    ];

    const leftColumns = ["first_name", "last_name"];

    return (
      <MuiThemeProvider>
        <TopBar />
        <h2 className={classes.heads}>Student List</h2>
        <h2 className={classes.numbers}>
          There are {this.state.rows.length} participants that have signed up.
        </h2>
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
            <EditingState onCommitChanges={this.commitChanges} />
            <Table className={classes.tableClass} />
            <TableColumnResizing columnWidths={columnWid} />
            <TableHeaderRow showSortingControls resizingEnabled={true} />
            <TableRowDetail contentComponent={RowDetail} />
            <TableEditColumn showEditCommand showAddCommand showDeleteCommand />
            <TableFixedColumns leftColumns={leftColumns} />
            <TableColumnVisibility
            // defaultHiddenColumnNames={defaultHiddenColumnNames}
            />
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

export default withStyles(useStyles)(StudentDisplay);
