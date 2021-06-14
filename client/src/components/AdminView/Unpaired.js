import React, { Component } from "react";

import TopBar from "../IntakeForm/TopBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import Paper from "@material-ui/core/Paper";
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
} from "@devexpress/dx-react-grid-material-ui";
import {
  SearchState,
  IntegratedFiltering,
  SortingState,
  IntegratedSorting
} from '@devexpress/dx-react-grid';
import { RowDetailState } from '@devexpress/dx-react-grid';


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

class Unpaired extends Component {
    constructor(props) {
      super(props);
      this.state = {
        student_info: null,
      };
    }

    componentDidMount() {
      const { REACT_APP_UNPAIRS } = process.env;
      let student_info_array = [];
      fetch(REACT_APP_UNPAIRS)
        .then((response) => response.json())
        .then((data) => {
          for (const student of data) {
            student_info_array.push({ "first_name":student[1],
            "last_name":student[2],
            "email":student[3],
            "SID":student[4],
            "level":student[5],
            "teach":student[6],
            "learn":student[7],
            "comments":student[8],
           } );
          }
          this.setState({
            student_info: student_info_array,
          });
        })
        .catch((error) => console.log("Error", error));
        
    }
    continue = (e) => {
      e.preventDefault();
    };

    render() {
      if (!this.state.student_info) {
          return <div />
      }
      // props is the useStyles variable
      const { values, handleChange, classes } = this.props;
      const student_info_array = this.state.student_info

      const columns = [{ name: "first_name", title: "First Name"},
      { name: "last_name", title: "Last Name"},
      { name: "email", title: "Email"},
      { name: "SID", title: "SID"},
      { name: "level", title: "Level"},
      { name: "teach", title: "Teach"},
      { name: "learn", title: "Learn"},
    ];
      const rows = student_info_array;

      const RowDetail = ({ row }) => (
        <div>
          Comments:
          {' '}
          {row.comments}
        </div>
      );

      const columnWid = [
        { columnName: 'first_name', width: 240 },
        { columnName: 'last_name', width: 240 },
        { columnName: 'email', width: 300 },
        { columnName: 'SID', width: 180 },
        { columnName: 'level', width: 180 },
        { columnName: 'learn', width: 90 },
        { columnName: 'teach', width: 180 },
      ];

      const leftColumns = ['first_name', 'last_name'];

      // const PopupEditing = ({ popupComponent: Popup }) => (
      //   <Plugin name="PopupEditing">
      //     <Template name="popupEditing">
      //       <TemplateConnector>
      //         {(
      //           {
      //             rows,
      //             getRowId,
      //             addedRows,
      //             editingRowIds,
      //             createRowChange,
      //             rowChanges,
      //           },
      //           {
      //             changeRow, changeAddedRow, commitChangedRows, commitAddedRows,
      //             stopEditRows, cancelAddedRows, cancelChangedRows,
      //           },
      //         ) => {
      //           const isNew = addedRows.length > 0;
      //           let editedRow;
      //           let rowId;
      //           if (isNew) {
      //             rowId = 0;
      //             editedRow = addedRows[rowId];
      //           } else {
      //             [rowId] = editingRowIds;
      //             const targetRow = rows.filter(row => getRowId(row) === rowId)[0];
      //             editedRow = { ...targetRow, ...rowChanges[rowId] };
      //           }
      
      //           const processValueChange = ({ target: { name, value } }) => {
      //             const changeArgs = {
      //               rowId,
      //               change: createRowChange(editedRow, value, name),
      //             };
      //             if (isNew) {
      //               changeAddedRow(changeArgs);
      //             } else {
      //               changeRow(changeArgs);
      //             }
      //           };
      //           const rowIds = isNew ? [0] : editingRowIds;
      //           const applyChanges = () => {
      //             if (isNew) {
      //               commitAddedRows({ rowIds });
      //             } else {
      //               stopEditRows({ rowIds });
      //               commitChangedRows({ rowIds });
      //             }
      //           };
      //           const cancelChanges = () => {
      //             if (isNew) {
      //               cancelAddedRows({ rowIds });
      //             } else {
      //               stopEditRows({ rowIds });
      //               cancelChangedRows({ rowIds });
      //             }
      //           };
      
      //           const open = editingRowIds.length > 0 || isNew;
      //           return (
      //             <Popup
      //               open={open}
      //               row={editedRow}
      //               onChange={processValueChange}
      //               onApplyChanges={applyChanges}
      //               onCancelChanges={cancelChanges}
      //             />
      //           );
      //         }}
      //       </TemplateConnector>
      //     </Template>
      //     {/* ... */}
      //   </Plugin>

      return (
        <MuiThemeProvider>
          <TopBar />
          <h2 className={classes.heads}>
            Unpaired Students
          </h2>
          <Paper>
            <Grid rows={rows} columns={columns}>
              <SearchState defaultValue="" />
              <IntegratedFiltering />
              <RowDetailState
                defaultExpandedRowIds={[]}
              />
              <SortingState
                defaultSorting={[{ columnName: 'first_name', direction: 'asc' }]}
              />
              <IntegratedSorting />
              <Table className={classes.tableClass}/>
              <TableColumnResizing columnWidths={columnWid}/>
              <TableHeaderRow showSortingControls resizingEnabled={true}/> {/*Need to customise to make the headings more distinct!*/}
              <TableRowDetail
                contentComponent={RowDetail}
              />
              <TableFixedColumns
                leftColumns={leftColumns}
              />
              <TableColumnVisibility/>
              <Toolbar />
              <ColumnChooser />
              <SearchPanel />

              {/* EDIT */}
              {/* <Dialog open={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Employee Details</DialogTitle>
              <DialogContent></DialogContent>
              <TextField
              margin="normal"
              name="firstName"
              label="First Name"
              value={row.firstName || ''}
              onChange={onChange}
            />
            </Dialog> */}

            </Grid>
          </Paper>

        </MuiThemeProvider>
      )
    };
  }
  
  export default withStyles(useStyles)(Unpaired);
  
