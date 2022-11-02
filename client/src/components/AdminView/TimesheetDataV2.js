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
  ColumnChooser,
  TableColumnVisibility,
  TableEditColumn,
  TableSummaryRow,
} from "@devexpress/dx-react-grid-material-ui";
import {
  SearchState,
  IntegratedFiltering,
  SortingState,
  IntegratedSorting,
  RowDetailState,
  SummaryState,
  IntegratedSummary,
  DataTypeProvider,
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
      </FormControl>
      <FormControl>
        <InputLabel>Last Name *</InputLabel>
        <Input
          value={row.last_name || ""}
          onChange={(event) => onChange("last_name", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Email *</InputLabel>
        <Input
          value={row.email || ""}
          onChange={(event) => onChange("email", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Week 0</InputLabel>
        <Input
          value={row.week_0}
          onChange={(event) => onChange("week_0", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Week 1</InputLabel>
        <Input
          value={row.week_1}
          onChange={(event) => onChange("week_1", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Week 2</InputLabel>
        <Input
          value={row.week_2}
          onChange={(event) => onChange("week_2", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Week 3</InputLabel>
        <Input
          value={row.week_3}
          onChange={(event) => onChange("week_3", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Week 4</InputLabel>
        <Input
          value={row.week_4}
          onChange={(event) => onChange("week_4", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Week 5</InputLabel>
        <Input
          value={row.week_5}
          onChange={(event) => onChange("week_5", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Week 6</InputLabel>
        <Input
          value={row.week_6}
          onChange={(event) => onChange("week_6", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Week 7</InputLabel>
        <Input
          value={row.week_7}
          onChange={(event) => onChange("week_7", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Week 8</InputLabel>
        <Input
          value={row.week_8}
          onChange={(event) => onChange("week_8", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Week 9</InputLabel>
        <Input
          value={row.week_9}
          onChange={(event) => onChange("week_9", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Week 10</InputLabel>
        <Input
          value={row.week_10}
          onChange={(event) => onChange("week_10", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Week 11</InputLabel>
        <Input
          value={row.week_11}
          onChange={(event) => onChange("week_11", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Week 12</InputLabel>
        <Input
          value={row.week_12}
          onChange={(event) => onChange("week_12", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Week 13</InputLabel>
        <Input
          value={row.week_13}
          onChange={(event) => onChange("week_13", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Week 14</InputLabel>
        <Input
          value={row.week_14}
          onChange={(event) => onChange("week_14", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Week 15</InputLabel>
        <Input
          value={row.week_15}
          onChange={(event) => onChange("week_15", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Week 16</InputLabel>
        <Input
          value={row.week_16}
          onChange={(event) => onChange("week_16", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Week 17</InputLabel>
        <Input
          value={row.week_17}
          onChange={(event) => onChange("week_17", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Week 18</InputLabel>
        <Input
          value={row.week_18}
          onChange={(event) => onChange("week_18", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Week 19</InputLabel>
        <Input
          value={row.week_19}
          onChange={(event) => onChange("week_19", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Week 20</InputLabel>
        <Input
          value={row.week_20}
          onChange={(event) => onChange("week_20", event.target.value)}
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

class TimesheetDataV2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      rows: [],
      redirect: null,
      csrfToken: "",
      isAuthenticated: "",
      openAlert: false,
      openAlertFail: false,
      badNameRow: "",
      totalSummaryItems: [{ columnName: "week_3", type: "sum" }],
    };
    this.commitChanges = this.commitChanges.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
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
          let columns_array = [
            { name: "pair_id", title: "Pair" },
            { name: "first_name", title: "First Name" },
            { name: "last_name", title: "Last Name" },
          ];
          let columns_summary = [];
          const { REACT_APP_TSRENDER } = process.env;
          fetch(REACT_APP_TSRENDER)
            .then((response) => response.json())
            .then((data) => {
              let allWeeksData = data.allWeeks;
              for (const i of allWeeksData) {
                columns_array.push({
                  name: "week_" + i,
                  title: "Week " + i,
                });
                columns_summary.push({ columnName: "week_" + i, type: "sum" });
              }
              columns_array.push({
                name: "total",
                title: "Total",
              });
            })
            .catch((error) =>
              alert(
                "Something went wrong in receiving data. Please try again later."
              )
            );
          let rows_array = [];
          let counter = 0;
          const { REACT_APP_TIMESHEET_V2 } = process.env;
          fetch(REACT_APP_TIMESHEET_V2)
            .then((response) => response.json())
            .then((data) => {
              for (const student of data) {
                rows_array.push({
                  id: counter,
                  pair_id: student[0],
                  first_name: student[1],
                  last_name: student[2],
                  email: student[3],
                  week_0: student[4],
                  week_1: student[5],
                  week_2: student[6],
                  week_3: student[7],
                  week_4: student[8],
                  week_5: student[9],
                  week_6: student[10],
                  week_7: student[11],
                  week_8: student[12],
                  week_9: student[13],
                  week_10: student[14],
                  week_11: student[15],
                  week_12: student[16],
                  week_13: student[17],
                  week_14: student[18],
                  week_15: student[19],
                  week_16: student[20],
                  week_17: student[21],
                  week_18: student[22],
                  week_19: student[23],
                  week_20: student[24],
                  total:
                    student[4] +
                    student[5] +
                    student[6] +
                    student[7] +
                    student[8] +
                    student[9] +
                    student[10] +
                    student[11] +
                    student[12] +
                    student[13] +
                    student[14] +
                    student[15] +
                    student[16] +
                    student[17] +
                    student[18] +
                    student[19] +
                    student[20] +
                    student[21] +
                    student[22] +
                    student[23] +
                    student[24],
                });
                counter = counter + 1;
              }
              this.setState({
                rows: rows_array,
                columns: columns_array,
                totalSummaryItems: columns_summary,
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
        student["last_name"].trim() === "" ||
        student["email"] === undefined ||
        student["email"].trim() === "" ||
        student["week_0"] === "" ||
        isNaN(student["week_0"]) ||
        student["week_1"] === "" ||
        isNaN(student["week_1"]) ||
        student["week_2"] === "" ||
        isNaN(student["week_2"]) ||
        student["week_3"] === "" ||
        isNaN(student["week_3"]) ||
        student["week_4"] === "" ||
        isNaN(student["week_4"]) ||
        student["week_5"] === "" ||
        isNaN(student["week_5"]) ||
        student["week_6"] === "" ||
        isNaN(student["week_6"]) ||
        student["week_7"] === "" ||
        isNaN(student["week_7"]) ||
        student["week_8"] === "" ||
        isNaN(student["week_8"]) ||
        student["week_9"] === "" ||
        isNaN(student["week_9"]) ||
        student["week_10"] === "" ||
        isNaN(student["week_10"]) ||
        student["week_11"] === "" ||
        isNaN(student["week_11"]) ||
        student["week_12"] === "" ||
        isNaN(student["week_12"]) ||
        student["week_13"] === "" ||
        isNaN(student["week_13"]) ||
        student["week_14"] === "" ||
        isNaN(student["week_14"]) ||
        student["week_15"] === "" ||
        isNaN(student["week_15"]) ||
        student["week_16"] === "" ||
        isNaN(student["week_16"]) ||
        student["week_17"] === "" ||
        isNaN(student["week_17"]) ||
        student["week_18"] === "" ||
        isNaN(student["week_18"]) ||
        student["week_19"] === "" ||
        isNaN(student["week_19"]) ||
        student["week_20"] === "" ||
        isNaN(student["week_20"])
      ) {
        errors = true;
        this.setState({ badNameRow: student["first_name"] + "'s" });
      } else {
        student["first_name"] = titleCase(student["first_name"].trim());
        student["last_name"] = titleCase(student["last_name"].trim());
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
    const { REACT_APP_UPDATETIMESHEET_V2 } = process.env;
    fetch(REACT_APP_UPDATETIMESHEET_V2, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": this.state.csrfToken,
      },
      body: JSON.stringify({
        timesheetdatav2: this.state.rows,
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

    const columnWid = [
      { columnName: "pair_id", width: 100 },
      { columnName: "first_name", width: 150 },
      { columnName: "last_name", width: 150 },
      { columnName: "week_0", width: 100 },
      { columnName: "week_1", width: 100 },
      { columnName: "week_2", width: 100 },
      { columnName: "week_3", width: 95 },
      { columnName: "week_4", width: 100 },
      { columnName: "week_5", width: 100 },
      { columnName: "week_6", width: 100 },
      { columnName: "week_7", width: 100 },
      { columnName: "week_8", width: 100 },
      { columnName: "week_9", width: 100 },
      { columnName: "week_10", width: 100 },
      { columnName: "week_11", width: 100 },
      { columnName: "week_12", width: 100 },
      { columnName: "week_13", width: 100 },
      { columnName: "week_14", width: 100 },
      { columnName: "week_15", width: 100 },
      { columnName: "week_16", width: 100 },
      { columnName: "week_17", width: 100 },
      { columnName: "week_18", width: 100 },
      { columnName: "week_19", width: 100 },
      { columnName: "week_20", width: 100 },
      { columnName: "total", width: 100 },
    ];

    return (
      <MuiThemeProvider>
        <TopBar />
        <h2 className={classes.heads}>Timesheet Data v2</h2>
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
            Please ensure you have filled out all necessary fields correctly in{" "}
            {this.state.badNameRow} row
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
            <TableEditColumn showEditCommand />
            <TableColumnVisibility />
            <Toolbar />
            <EditPopupPlugin popupComponent={EditPopup} />
            <ColumnChooser />
            <SearchPanel />
            <SummaryState totalItems={this.state.totalSummaryItems} />
            <IntegratedSummary />
            <TableSummaryRow />
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

export default withStyles(useStyles)(TimesheetDataV2);
