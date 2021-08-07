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

class TimesheetData extends Component {
    constructor(props) {
      super(props);
      this.state = {
        timesheet_info: null,
      };
    }

    componentDidMount() {
      const { REACT_APP_TIMESHEET } = process.env;
      let timesheet_info_array = [];
      fetch(REACT_APP_TIMESHEET)
        .then((response) => response.json())
        .then((data) => {
          for (const timesheet_row of data) {
            timesheet_info_array.push({ "first_name":timesheet_row[0],
             "last_name":timesheet_row[1],
             "partner_names":timesheet_row[2],
             "hours":timesheet_row[3],
             "week":timesheet_row[4]
            } );
          }
          this.setState({
            timesheet_info: timesheet_info_array,
          });
        })
        .catch((error) => console.log("Error", error));
        
    }
    continue = (e) => {
      e.preventDefault();
    };

    render() {
      if (!this.state.timesheet_info) {
          return <div />
      }
      // props is the useStyles variable
      const { values, handleChange, classes } = this.props;
      const timesheet_info_array = this.state.timesheet_info

      const columns = [{ name: "first_name", title: "First Name"},
      { name: "last_name", title: "Last Name"},
      { name: "partner_names", title: "Partner's Names"},
      { name: "hours", title: "Hours"},
      { name: "week", title: "Week"},
    ];
      const rows = timesheet_info_array;

    //   const RowDetail = ({ row }) => (
    //     <div>
    //       Comments for student 1: 
    //       {' '}
    //       {row.comments_1}
    //       {' '}
    //       <br/>
    //       Comments for student 2:
    //       {' '}
    //       {row.comments_2}
    //       <br/>
    //       Comments for student 3:
    //       {' '}
    //       {row.comments_3}
    //     </div>
    //   );

      const columnWid = [
      { columnName: "first_name", width: 240},
      { columnName: "last_name", width: 240},
      { columnName: "partner_names", width: 240},
      { columnName: "hours", width: 240},
      { columnName: "week", width: 240},
      ];

      // const leftColumns = ['first_name', 'last_name'];

      return (
        <MuiThemeProvider>
          <TopBar />
          <h2 className={classes.heads}>
            Timesheet Data
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
              {/* <TableRowDetail
                contentComponent={RowDetail}
              /> */}
              {/* <TableFixedColumns
                leftColumns={leftColumns}
              /> */}
              <TableColumnVisibility/>
              <Toolbar />
              <ColumnChooser />
              <SearchPanel />
            </Grid>
          </Paper>

        </MuiThemeProvider>
      )
    };
  }
  
  export default withStyles(useStyles)(TimesheetData);
  
