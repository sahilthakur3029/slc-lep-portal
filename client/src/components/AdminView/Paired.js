import React, { Component } from "react";
import TopBar from "../IntakeForm/TopBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import // State or Local Processing Plugins
"@devexpress/dx-react-grid";
import { Redirect } from "react-router-dom";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import {Paper, FormControl, Input, InputLabel,} from "@material-ui/core";
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
  TableEditRow
} from "@devexpress/dx-react-grid-material-ui";
import {
  SearchState,
  IntegratedFiltering,
  SortingState,
  IntegratedSorting
} from '@devexpress/dx-react-grid';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import { RowDetailState } from '@devexpress/dx-react-grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiGrid from '@material-ui/core/Grid';
import {
  Plugin, Template, TemplateConnector, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { EditingState } from '@devexpress/dx-react-grid';


// Things to do: Editing in a popup form

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
        <InputLabel>Student 1</InputLabel>
        <Input
          value={row.name_1 || ""}
          onChange={(event) => onChange("name_1", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Email 1</InputLabel>
        <Input
          value={row.email_1 || ""}
          onChange={(event) => onChange("email_1", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Level 1</InputLabel>
        <Input
          value={row.level_1 || ""}
          onChange={(event) => onChange("level_1", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Learn 1 </InputLabel>
        <Input
          value={row.learn_1 || ""}
          onChange={(event) => onChange("learn_1", event.target.value)}
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
        <InputLabel>Student 2</InputLabel>
        <Input
          value={row.name_2 || ""}
          onChange={(event) => onChange("name_2", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Email 2</InputLabel>
        <Input
          value={row.email_2 || ""}
          onChange={(event) => onChange("email_2", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Level 2</InputLabel>
        <Input
          value={row.level_2 || ""}
          onChange={(event) => onChange("level_2", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Learn 2 </InputLabel>
        <Input
          value={row.learn_2 || ""}
          onChange={(event) => onChange("learn_2", event.target.value)}
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
        <InputLabel>Student 3</InputLabel>
        <Input
          value={row.name_3 || ""}
          onChange={(event) => onChange("name_3", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Email 3</InputLabel>
        <Input
          value={row.email_3 || ""}
          onChange={(event) => onChange("email_3", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Level 3</InputLabel>
        <Input
          value={row.level_3 || ""}
          onChange={(event) => onChange("level_3", event.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Learn 3 </InputLabel>
        <Input
          value={row.learn_3 || ""}
          onChange={(event) => onChange("learn_3", event.target.value)}
        />
      </FormControl>{" "}
      <FormControl>
        <InputLabel>Teach 3</InputLabel>
        <Input
          value={row.teach_3 || ""}
          onChange={(event) => onChange("teach_3", event.target.value)}
        />
      </FormControl>{" "}
      
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
        columns : [{ name: "name_1", title: "Student 1"},
      { name: "email_1", title: "Email 1"},
      { name: "level_1", title: "Level 1"},
      { name: "teach_1", title: "Teach 1"},
      { name: "learn_1", title: "Learn 1"},
      { name: "name_2", title: "Student 2"},
      { name: "email_2", title: "Email 2"},
      { name: "level_2", title: "Level 2"},
      { name: "teach_2", title: "Teach 2"},
      { name: "learn_2", title: "Learn 2"},
      { name: "name_3", title: "Student 3"},
      { name: "email_3", title: "Email 3"},
      { name: "level_3", title: "Level 3"},
      { name: "teach_3", title: "Teach 3"},
      { name: "learn_3", title: "Learn 3"},
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
            rows_array.push({ name_1:pairing[1]+" "+pairing[2],
             email_1:pairing[3],
             level_1:pairing[4],
             teach_1:pairing[5],
             learn_1:pairing[6],
             comments_1:pairing[7],
             name_2:pairing[9]+" "+pairing[10],
             email_2:pairing[11],
             level_2:pairing[12],
             teach_2:pairing[13],
             learn_2:pairing[14],
             comments_2:pairing[15],
             name_3:pairing[17]+" "+pairing[18],
             email_3:pairing[19],
             level_3:pairing[20],
             teach_3:pairing[21],
             learn_3:pairing[22],
             comments_3:pairing[23],
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
      //  const pair_info_array = this.state.rows

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
    //   const rows = pair_info_array;

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
            <Grid rows={rows} columns={columns} getRowId={getRowId}>
              <SearchState defaultValue="" />
              <IntegratedFiltering />
              <RowDetailState
                defaultExpandedRowIds={[]}
              />
              <SortingState
                // defaultSorting={[{ columnName: 'name_1', direction: 'asc' }]}
              />
              <IntegratedSorting />
              <EditingState onCommitChanges={this.commitChanges} />
              <Table className={classes.tableClass}/>
              <TableColumnResizing columnWidths={columnWid}/>
              <TableHeaderRow showSortingControls resizingEnabled={true}/> {/*Need to customise to make the headings more distinct!*/}
              <TableRowDetail
                contentComponent={RowDetail}
              />
              <TableEditColumn showEditCommand showAddCommand showDeleteCommand />
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
  
