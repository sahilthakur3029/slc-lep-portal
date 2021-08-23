import React, { Component } from "react";
import TopBar from "../IntakeForm/TopBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
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
  }
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
        <InputLabel>Lang. 1 Learn</InputLabel>
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
        <InputLabel>Lang. 1 Learn Level</InputLabel>
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
        <InputLabel>Lang. 1 Teach</InputLabel>
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
        <InputLabel>Lang. 1 Teach Level</InputLabel>
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

class Paired extends Component {
    constructor(props) {
      super(props);
      this.state = {
        columns: [
      { name: "name_1", title: "Student 1"},
      { name: "email_1", title: "Email 1"},
      { name: "level_1", title: "Level 1"},
      { name: "teach_1", title: "Teach 1"},
      { name: "learn_1", title: "Learn 1"},
      // { name: "comments_1", title: "Comments 1"},
      { name: "name_2", title: "Student 2"},
      { name: "email_2", title: "Email 2"},
      { name: "level_2", title: "Level 2"},
      { name: "teach_2", title: "Teach 2"},
      { name: "learn_2", title: "Learn 2"},
      // { name: "comments_2", title: "Comments 2"},
      { name: "name_3", title: "Student 3"},
      { name: "email_3", title: "Email 3"},
      { name: "level_3", title: "Level 3"},
      { name: "teach_3", title: "Teach 3"},
      { name: "learn_3", title: "Learn 3"},
      // { name: "comments_3", title: "Comments 3"},
    ],
        rows: null,
        redirect: null,
      };
      this.commitChanges = this.commitChanges.bind(this);
      this.saveChanges = this.saveChanges.bind(this);
      this.deleteRows = this.deleteRows.bind(this);
    }

    componentDidMount() {
      const { REACT_APP_PAIRS } = process.env;
      let rows_array = [];
      let counter = 1;
      fetch(REACT_APP_PAIRS)
        .then((response) => response.json())
        .then((data) => {
          for (const pairing of data) {
            rows_array.push({ "name_1":pairing[1]+" "+pairing[2],
             "email_1":pairing[3],
             "level_1":pairing[4],
             "teach_1":pairing[5],
             "learn_1":pairing[6],
             "comments_1":pairing[7],
             "name_2":pairing[9]+" "+pairing[10],
             "email_2":pairing[11],
             "level_2":pairing[12],
             "teach_2":pairing[13],
             "learn_2":pairing[14],
             "comments_2":pairing[15],
             "name_3":pairing[17]+" "+pairing[18],
             "email_3":pairing[19],
             "level_3":pairing[20],
             "teach_3":pairing[21],
             "learn_3":pairing[22],
             "comments_3":pairing[23],
            } );
            counter = counter + 1;
          }
          this.setState({
            rows: rows_array,
          });
        })
        .catch((error) => console.log("Error", error));
        
    }
    continue = (e) => {
      e.preventDefault();
    };

    saveChanges() {
      console.log(this.state.rows);
      // const { REACT_APP_SAVE } = process.env;
      // let endWeek = this.state.endWeek;
      // let startWeek = this.state.startWeek;
      // if (
      //   !/^\d+$/.test(startWeek) ||
      //   !/^\d+$/.test(endWeek) ||
      //   startWeek >= endWeek
      // ) {
      //   startWeek = 3;
      //   endWeek = 16;
      // }
      // fetch(REACT_APP_SAVE, {
      //   method: "POST",
      //   mode: "cors",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "X-CSRFToken": this.state.csrfToken,
      //   },
      //   body: JSON.stringify({
      //     currSem: this.state.currSem,
      //     calendarLink: this.state.calendarLink,
      //     orientationKey: this.state.orientationKey,
      //     startWeek: startWeek,
      //     endWeek: endWeek,
      //     deleteData: this.state.deleteData,
      //   }),
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     if (data.success == true) {
      //       this.setState({ openAlert: true });
      //       return "Success";
      //     } else {
      //       this.setState({ redirect: <Redirect push to="/signin" /> });
      //     }
      //   })
      //   .catch((error) =>
      //     alert("Something went horribly wrong. Please try again later.")
      //   );
      // return "Failed";
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

    render() {
      if (!this.state.rows) {
          return <div />
      }
      // props is the useStyles variable
      const { values, handleChange, classes } = this.props;
      const { rows, columns } = this.state;

    //   const columns = [{ name: "name_1", title: "Student 1"},
    //   { name: "email_1", title: "Email 1"},
    //   { name: "level_1", title: "Level 1"},
    //   { name: "teach_1", title: "Teach 1"},
    //   { name: "learn_1", title: "Learn 1"},
    //   // { name: "comments_1", title: "Comments 1"},
    //   { name: "name_2", title: "Student 2"},
    //   { name: "email_2", title: "Email 2"},
    //   { name: "level_2", title: "Level 2"},
    //   { name: "teach_2", title: "Teach 2"},
    //   { name: "learn_2", title: "Learn 2"},
    //   // { name: "comments_2", title: "Comments 2"},
    //   { name: "name_3", title: "Student 3"},
    //   { name: "email_3", title: "Email 3"},
    //   { name: "level_3", title: "Level 3"},
    //   { name: "teach_3", title: "Teach 3"},
    //   { name: "learn_3", title: "Learn 3"},
    //   // { name: "comments_3", title: "Comments 3"},
    // ];
      // const rows = rows_array;

      const RowDetail = ({ row }) => (
        <div>
          Comments for student 1: 
          {' '}
          {row.comments_1}
          {' '}
          <br/>
          Comments for student 2:
          {' '}
          {row.comments_2}
          <br/>
          Comments for student 3:
          {' '}
          {row.comments_3}
        </div>
      );

      const columnWid = [
      { columnName: "name_1", width: 240},
      { columnName: "email_1", width: 240},
      { columnName: "level_1", width: 240},
      { columnName: "teach_1", width: 240},
      { columnName: "learn_1", width: 240},
      // { name: "comments_1", title: "Comments 1"},
      { columnName: "name_2", width: 240},
      { columnName: "email_2", width: 240},
      { columnName: "level_2", width: 240},
      { columnName: "teach_2", width: 240},
      { columnName: "learn_2", width: 240},
      // { name: "comments_2", title: "Comments 2"},
      { columnName: "name_3", width: 240},
      { columnName: "email_3", width: 240},
      { columnName: "level_3", width: 240},
      { columnName: "teach_3", width: 240},
      { columnName: "learn_3", width: 240},
      // { name: "comments_3", title: "Comments 3"},
      ];

      // const leftColumns = ['first_name', 'last_name'];

      return (
        <MuiThemeProvider>
          <TopBar />
          <h2 className={classes.heads}>
            Pairs
          </h2>
          {this.state.redirect}
        {console.log(Date().toLocaleString())}
          <Paper>
          {console.log(this.state.rows)}
            <Grid rows={rows} columns={columns} getRowId={getRowId}>
              <SearchState defaultValue="" />
              <IntegratedFiltering />
              <RowDetailState
                defaultExpandedRowIds={[]}
              />
              <SortingState/>
              <IntegratedSorting />
              <Table className={classes.tableClass}/>
              <EditingState onCommitChanges={this.commitChanges} />
              <TableColumnResizing columnWidths={columnWid}/>
              <TableHeaderRow showSortingControls resizingEnabled={true}/> {/*Need to customise to make the headings more distinct!*/}
              <TableRowDetail
                contentComponent={RowDetail}
              />
              <TableEditColumn showEditCommand showAddCommand showDeleteCommand />
              {/* <TableFixedColumns
                leftColumns={leftColumns}
              /> */}
              <TableColumnVisibility/>
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
      )
    };
  }
  
  export default withStyles(useStyles)(Paired);
  
