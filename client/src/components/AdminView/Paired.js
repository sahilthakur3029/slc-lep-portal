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

class Paired extends Component {
    constructor(props) {
      super(props);
      this.state = {
        pair_info: null,
      };
    }

    componentDidMount() {
      const { REACT_APP_PAIRS } = process.env;
      let pair_info_array = [];
      fetch(REACT_APP_PAIRS)
        .then((response) => response.json())
        .then((data) => {
          for (const pairing of data) {
            pair_info_array.push({ "name_1":pairing[1]+" "+pairing[2],
             "email_1":pairing[3],
             "SID_1":pairing[4],
             "level_1":pairing[5],
             "teach_1":pairing[6],
             "learn_1":pairing[7],
             "comments_1":pairing[8],
             "name_2":pairing[10]+" "+pairing[11],
             "email_2":pairing[12],
             "SID_2":pairing[13],
             "level_2":pairing[14],
             "teach_2":pairing[15],
             "learn_2":pairing[16],
             "comments_2":pairing[17],
             "name_3":pairing[19]+" "+pairing[20],
             "email_3":pairing[21],
             "SID_3":pairing[22],
             "level_3":pairing[23],
             "teach_3":pairing[24],
             "learn_3":pairing[25],
             "comments_3":pairing[26],
            } );
          }
          this.setState({
          pair_info: pair_info_array,
          });
        })
        .catch((error) => console.log("Error", error));
        
    }
    continue = (e) => {
      e.preventDefault();
    };

    render() {
      if (!this.state.pair_info) {
          return <div />
      }
      // props is the useStyles variable
      const { values, handleChange, classes } = this.props;
      const pair_info_array = this.state.pair_info

      const columns = [{ name: "name_1", title: "Student 1"},
      { name: "email_1", title: "Email 1"},
      { name: "SID_1", title: "SID 1"},
      { name: "level_1", title: "Level 1"},
      { name: "teach_1", title: "Teach 1"},
      { name: "learn_1", title: "Learn 1"},
      // { name: "comments_1", title: "Comments 1"},
      { name: "name_2", title: "Student 2"},
      { name: "email_2", title: "Email 2"},
      { name: "SID_2", title: "SID 2"},
      { name: "level_2", title: "Level 2"},
      { name: "teach_2", title: "Teach 2"},
      { name: "learn_2", title: "Learn 2"},
      // { name: "comments_2", title: "Comments 2"},
      { name: "name_3", title: "Student 3"},
      { name: "email_3", title: "Email 3"},
      { name: "SID_3", title: "SID 3"},
      { name: "level_3", title: "Level 3"},
      { name: "teach_3", title: "Teach 3"},
      { name: "learn_3", title: "Learn 3"},
      // { name: "comments_3", title: "Comments 3"},
    ];
      const rows = pair_info_array;

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
      { columnName: "SID_1", width: 240},
      { columnName: "level_1", width: 240},
      { columnName: "teach_1", width: 240},
      { columnName: "learn_1", width: 240},
      // { name: "comments_1", title: "Comments 1"},
      { columnName: "name_2", width: 240},
      { columnName: "email_2", width: 240},
      { columnName: "SID_2", width: 240},
      { columnName: "level_2", width: 240},
      { columnName: "teach_2", width: 240},
      { columnName: "learn_2", width: 240},
      // { name: "comments_2", title: "Comments 2"},
      { columnName: "name_3", width: 240},
      { columnName: "email_3", width: 240},
      { columnName: "SID_3", width: 240},
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
          <Paper>
            <Grid rows={rows} columns={columns}>
              <SearchState defaultValue="" />
              <IntegratedFiltering />
              <RowDetailState
                defaultExpandedRowIds={[]}
              />
              <SortingState
                defaultSorting={[{ columnName: 'name_1', direction: 'asc' }]}
              />
              <IntegratedSorting />
              <Table className={classes.tableClass}/>
              <TableColumnResizing columnWidths={columnWid}/>
              <TableHeaderRow showSortingControls resizingEnabled={true}/> {/*Need to customise to make the headings more distinct!*/}
              <TableRowDetail
                contentComponent={RowDetail}
              />
              {/* <TableFixedColumns
                leftColumns={leftColumns}
              /> */}
              <TableColumnVisibility
                // defaultHiddenColumnNames={defaultHiddenColumnNames}
              />
              <Toolbar />
              <ColumnChooser />
              <SearchPanel />
            </Grid>
          </Paper>

        </MuiThemeProvider>
      )
    };
  }
  
  export default withStyles(useStyles)(Paired);
  
