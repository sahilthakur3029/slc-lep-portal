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
<<<<<<< HEAD
=======
  TableEditRow
>>>>>>> riddhipart2
} from "@devexpress/dx-react-grid-material-ui";
import {
  SearchState,
  IntegratedFiltering,
  SortingState,
<<<<<<< HEAD
  IntegratedSorting,
  RowDetailState,
} from "@devexpress/dx-react-grid";
=======
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


>>>>>>> riddhipart2

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

<<<<<<< HEAD
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
=======
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
             "class_standing":student[3],
             "domestic_status":student[4],
             "major":student[5],
             "gender":student[6],
             "gender_custom":student[7],
             "days_of_week":student[8],
             "hope_to_gain":student[9],
             "plan_to_meet":student[10],
             "lang_1_learn":student[11],
             "lang_1_learn_other":student[12],
             "lang_1_learn_level":student[13],
             "lang_2_learn":student[14],
             "lang_2_learn_other":student[15],
             "lang_2_learn_level":student[16],
             "lang_1_teach":student[17],
             "lang_1_teach_other":student[18],
             "lang_1_teach_level":student[19],
             "lang_2_teach":student[20],
             "lang_2_teach_other":student[21],
             "lang_2_teach_level":student[22],
             "comments":student[23],
             "partner_major":student[24],
             "partner_major_weight":student[25],
             "partner_gender":student[26],
             "partner_gender_custom":student[27],
             "partner_gender_weight":student[28],
            } );
>>>>>>> riddhipart2
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
      ],
      rows: null,
      redirect: null,
    };
    this.commitChanges = this.commitChanges.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.deleteRows = this.deleteRows.bind(this);
  }

  componentDidMount() {
    const { REACT_APP_NAMES } = process.env;
    let rows_array = [];
    let counter = 1;
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
          });
          counter = counter + 1;
        }
        this.setState({
          rows: rows_array,
        });
      })
      .catch((error) => console.log("Error", error));
  }

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
<<<<<<< HEAD
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
=======
      // props is the useStyles variable
      const { values, handleChange, classes } = this.props;
      const student_info_array = this.state.student_info

      const columns = [{ name: "first_name", title: "First Name"},
      { name: "last_name", title: "Last Name"},
      { name: "email", title: "Email"},
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

      const getRowId = row => row.id;

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
>>>>>>> riddhipart2
      ];
    }
    if (deleted) {
      changedRows = this.deleteRows(deleted);
    }
    this.setState({ rows: changedRows });
  }

<<<<<<< HEAD
  render() {
    if (!this.state.rows) {
      return <div />;
    }
    // props is the useStyles variable
    const { values, handleChange, classes } = this.props;
    const { rows, columns } = this.state;

    const RowDetail = ({ row }) => (
      <div>
        Hope to Gain: {row.hope_to_gain} <br />
        Plan to Meet: {row.plan_to_meet}
        <br />
        Comments: {row.comments}
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
    ];

    const leftColumns = ["first_name", "last_name"];

    return (
      <MuiThemeProvider>
        <TopBar />
        <h2 className={classes.heads}>Student List</h2>
        {this.state.redirect}
        {console.log(Date().toLocaleString())}
        <Paper>
          {console.log(this.state.rows)}
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
=======
      const leftColumns = ['first_name', 'last_name'];

      // Popup editing
      const Popup = ({
        row,
        onChange,
        onApplyChanges,
        onCancelChanges,
        open,
      }) => (
        
        <Dialog open={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Student Details</DialogTitle>
          <DialogContent>
            <MuiGrid container spacing={3}>
              <MuiGrid item xs={6}>
                <FormGroup>
                  <TextField
                    margin="normal"
                    name="firstName"
                    label="First Name"
                    value={row.first_name || ''}
                    onChange={onChange}
                  />
                  <TextField
                    margin="normal"
                    name="lastName"
                    label="Last Name"
                    value={row.last_name || ''}
                    onChange={onChange}
                  />
                  <TextField
                    margin="normal"
                    name="email"
                    label="Email"
                    value={row.email || ''}
                    onChange={onChange}
                  />
                </FormGroup>
              </MuiGrid>
              <MuiGrid item xs={6}>
                <FormGroup>
                  <TextField
                    margin="normal"
                    name="major"
                    label="Major"
                    value={row.major || ''}
                    onChange={onChange}
                  />
                
                  <TextField
                    margin="normal"
                    name="gender"
                    label="Gender"
                    value={row.gender || ''}
                    onChange={onChange}
                  />
                </FormGroup>
              </MuiGrid>
            </MuiGrid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancelChanges} color="primary">
              Cancel
            </Button>
            <Button onClick={onApplyChanges} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      );

      const PopupEditing = React.memo(({ popupComponent: Popup }) => (
        <Plugin>
          <Template name="popupEditing">
            <TemplateConnector>
              {(
                {
                  rows,
                  getRowId,
                  addedRows,
                  editingRowIds,
                  createRowChange,
                  rowChanges,
                },
                {
                  changeRow, changeAddedRow, commitChangedRows, commitAddedRows,
                  stopEditRows, cancelAddedRows, cancelChangedRows,
                },
              ) => {
                const isNew = addedRows.length > 0;
                let editedRow;
                let rowId;
                if (isNew) {
                  rowId = 0;
                  editedRow = addedRows[rowId];
                } else {
                  [rowId] = editingRowIds;
                  const targetRow = rows.filter(row => getRowId(row) === rowId)[0];
                  editedRow = { ...targetRow, ...rowChanges[rowId] };
                }
                console.log("EDITED ROW AT THE BEGINNING IS")
                console.log(editedRow)
                
      
                const processValueChange = ({ target: { name, value } }) => {
                  const changeArgs = {
                    rowId,
                    change: createRowChange(editedRow, value, name),
                  };
                  if (isNew) {
                    changeAddedRow(changeArgs);
                  } else {
                    changeRow(changeArgs);
                    changeAddedRow(changeArgs);
                  }
                };
                const rowIds = isNew ? [0] : editingRowIds;
                const applyChanges = () => {
                  if (isNew) {
                    commitAddedRows({ rowIds });
                  } else {
                    stopEditRows({ rowIds });
                    commitChangedRows({ rowIds });
                  }
                };
                const cancelChanges = () => {
                  if (isNew) {
                    cancelAddedRows({ rowIds });
                  } else {
                    stopEditRows({ rowIds });
                    cancelChangedRows({ rowIds });
                  }
                };
      
                const open = editingRowIds.length > 0 || isNew;
                console.log("EDITED ROW IS")
                console.log(editedRow)
                return (
                  <Popup
                    open={open}
                    row={editedRow}
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
            <TemplatePlaceholder name="popupEditing" />
          </Template>
        </Plugin>
      ));

      const commitChanges = ({ added, changed }) => {
        let changedRows;
        if (added) {
          const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
          changedRows = [
            ...rows,
            ...added.map((row, index) => ({
              id: startingAddedId + index,
              ...row,
            })),
          ];
        }
        if (changed) {
          console.log("THE CHANGES ARE")
          console.log(changed);
          // changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        // setRows(changedRows);
      };
      

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
              <EditingState
                onCommitChanges={commitChanges}
              />
              <TableEditColumn
                showAddCommand
                showEditCommand
              />
              <TableFixedColumns
                leftColumns={leftColumns}
              />
              <TableColumnVisibility
                // defaultHiddenColumnNames={defaultHiddenColumnNames}
              />
              <Toolbar />
              
              <PopupEditing popupComponent={Popup} />
              <ColumnChooser />
              <SearchPanel />
            </Grid>
          </Paper>

        </MuiThemeProvider>
      )
    };
>>>>>>> riddhipart2
  }
}

export default withStyles(useStyles)(StudentDisplay);
