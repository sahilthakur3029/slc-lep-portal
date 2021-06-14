import React, { Component } from "react";
import TopBar from "../IntakeForm/TopBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import // State or Local Processing Plugins
"@devexpress/dx-react-grid";
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
  TableColumnVisibility
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

class StudentDisplay extends Component {
    constructor(props) {
      super(props);
      this.state = {
        student_info: null,
      };
    }

    componentDidMount() {
      const { REACT_APP_NAMES } = process.env;
      let student_info_array = [];
      
      fetch(REACT_APP_NAMES)
        .then((response) => response.json())
        .then((data) => {
          for (const student of data) {
            student_info_array.push({ "first_name":student[0],
             "last_name":student[1],
             "email":student[2],
             "SID":student[3],
             "class_standing":student[4],
             "domestic_status":student[5],
             "major":student[6],
             "gender":student[7],
             "gender_custom":student[8],
             "days_of_week":student[9],
             "hope_to_gain":student[10],
             "plan_to_meet":student[11],
             "lang_1_learn":student[12],
             "lang_1_learn_other":student[13],
             "lang_1_learn_level":student[14],
             "lang_2_learn":student[15],
             "lang_2_learn_other":student[16],
             "lang_2_learn_level":student[17],
             "lang_1_teach":student[18],
             "lang_1_teach_other":student[19],
             "lang_1_teach_level":student[20],
             "lang_2_teach":student[21],
             "lang_2_teach_other":student[22],
             "lang_2_teach_level":student[23],
             "comments":student[24],
             "partner_major":student[25],
             "partner_major_weight":student[26],
             "partner_gender":student[27],
             "partner_gender_custom":student[28],
             "partner_gender_weight":student[29],
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
      { name: "class_standing", title: "Class Standing"},
      { name: "domestic_status", title: "Domestic Status"},
      { name: "major", title: "Major"},
      { name: "gender", title: "Gender"},
      { name: "gender_custom", title: "Custom Gender"},
      { name: "days_of_week", title: "Availability"},
      { name: "lang_1_learn", title: "Language 1(learn)"},
      { name: "lang_1_learn_other", title: "Other"},
      { name: "lang_1_learn_level", title: "Level"},
      { name: "lang_2_learn", title: "Language 2(learn)"},
      { name: "lang_2_learn_other", title: "Other"},
      { name: "lang_2_learn_level", title: "Level"},
      { name: "lang_1_teach", title: "Language 1(teach)"},
      { name: "lang_1_teach_other", title: "Other"},
      { name: "lang_1_teach_level", title: "Level"},
      { name: "lang_2_teach", title: "Language 2(teach)"},
      { name: "lang_2_teach_other", title: "Other"},
      { name: "lang_2_teach_level", title: "Level"},
      { name: "partner_major", title: "Partner's preferred major"},
      { name: "partner_major_weight", title: "Weightage"},
      { name: "partner_gender", title: "Partner's preferred gender"},
      { name: "partner_gender_custom", title: "Custom gender"},
      { name: "partner_gender_weight", title: "Weightage"},
    ];
      const rows = student_info_array;

      const RowDetail = ({ row }) => (
        <div>
          What the student hopes to gain: 
          {' '}
          {row.hope_to_gain}
          {' '}
          <br/>
          Meeting plan:
          {' '}
          {row.plan_to_meet}
          <br/>
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
        { columnName: 'class_standing', width: 180 },
        { columnName: 'domestic_status', width: 180 },
        { columnName: 'major', width: 240 },
        { columnName: 'gender', width: 180 },
        { columnName: 'gender_custom', width: 180 },
        { columnName: 'days_of_week', width: 240 },
        { columnName: 'lang_1_learn', width: 180 },
        { columnName: 'lang_1_learn_other', width: 180 },
        { columnName: 'lang_1_learn_level', width: 90 },
        { columnName: 'lang_2_learn', width: 180 },
        { columnName: 'lang_2_learn_other', width: 180 },
        { columnName: 'lang_2_learn_level', width: 90 },
        { columnName: 'lang_1_teach', width: 180 },
        { columnName: 'lang_1_teach_other', width: 180 },
        { columnName: 'lang_1_teach_level', width: 90 },
        { columnName: 'lang_2_teach', width: 180 },
        { columnName: 'lang_2_teach_other', width: 180 },
        { columnName: 'lang_2_teach_level', width: 90 },
        { columnName: "partner_major", width: 180},
        { columnName: "partner_major_weight", width: 90},
        { columnName: "partner_gender", width: 180},
        { columnName: "partner_gender_custom", width: 180},
        { columnName: "partner_gender_weight", width: 90},
      ];

      const leftColumns = ['first_name', 'last_name'];

      return (
        <MuiThemeProvider>
          <TopBar />
          <h2 className={classes.heads}>
            Student List
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
  
  export default withStyles(useStyles)(StudentDisplay);
  