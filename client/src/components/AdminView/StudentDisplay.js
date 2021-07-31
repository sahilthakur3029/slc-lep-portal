import React, { Component } from "react";
import TopBar from "../IntakeForm/TopBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
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
  TableHeaderRow,
  TableEditColumn,
} from "@devexpress/dx-react-grid-material-ui";

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
      <FormControl fullWidth>
        <InputLabel>Name</InputLabel>
        <Input
          value={row.first_name || ""}
          onChange={(event) => onChange("first_name", event.target.value)}
        />
      </FormControl>
      {/* <FormControl fullWidth>
        <InputLabel>City</InputLabel>
        <Input
          value={row.city || ""}
          onChange={event => onChange("city", event.target.value)}
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Car</InputLabel>
        <Input
          value={row.car || ""}
          onChange={event => onChange("car", event.target.value)}
        />
      </FormControl> */}
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
    console.log("POPUP ", this.props.popupComponent);
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
        { name: "lang_1_learn", title: "Language 1(learn)" },
        { name: "lang_1_learn_other", title: "Other" },
        { name: "lang_1_learn_level", title: "Level" },
        { name: "lang_2_learn", title: "Language 2(learn)" },
        { name: "lang_2_learn_other", title: "Other" },
        { name: "lang_2_learn_level", title: "Level" },
        { name: "lang_1_teach", title: "Language 1(teach)" },
        { name: "lang_1_teach_other", title: "Other" },
        { name: "lang_1_teach_level", title: "Level" },
        { name: "lang_2_teach", title: "Language 2(teach)" },
        { name: "lang_2_teach_other", title: "Other" },
        { name: "lang_2_teach_level", title: "Level" },
        { name: "partner_major", title: "Partner's preferred major" },
        { name: "partner_major_weight", title: "Weightage" },
        { name: "partner_gender", title: "Partner's preferred gender" },
        { name: "partner_gender_custom", title: "Custom gender" },
        { name: "partner_gender_weight", title: "Weightage" },
      ],
      rows: null,
    };
    this.commitChanges = this.commitChanges.bind(this);
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
            days_of_week: student[8],
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
      console.log("in MAIN commitChanges deleted", deleted);
    }
    this.setState({ rows: changedRows });
  }

  render() {
    if (!this.state.rows) {
      return <div />;
    }
    // props is the useStyles variable
    const { values, handleChange, classes } = this.props;
    const { rows, columns } = this.state;
    {
      console.log(this.state);
    }

    // const RowDetail = ({ row }) => (
    //   <div>
    //     What the student hopes to gain: {row.hope_to_gain} <br />
    //     Meeting plan: {row.plan_to_meet}
    //     <br />
    //     Comments: {row.comments}
    //   </div>
    // );

    // const columnWid = [
    //   { columnName: "first_name", width: 240 },
    //   { columnName: "last_name", width: 240 },
    //   { columnName: "email", width: 300 },
    //   { columnName: "class_standing", width: 180 },
    //   { columnName: "domestic_status", width: 180 },
    //   { columnName: "major", width: 240 },
    //   { columnName: "gender", width: 180 },
    //   { columnName: "gender_custom", width: 180 },
    //   { columnName: "days_of_week", width: 240 },
    //   { columnName: "lang_1_learn", width: 180 },
    //   { columnName: "lang_1_learn_other", width: 180 },
    //   { columnName: "lang_1_learn_level", width: 90 },
    //   { columnName: "lang_2_learn", width: 180 },
    //   { columnName: "lang_2_learn_other", width: 180 },
    //   { columnName: "lang_2_learn_level", width: 90 },
    //   { columnName: "lang_1_teach", width: 180 },
    //   { columnName: "lang_1_teach_other", width: 180 },
    //   { columnName: "lang_1_teach_level", width: 90 },
    //   { columnName: "lang_2_teach", width: 180 },
    //   { columnName: "lang_2_teach_other", width: 180 },
    //   { columnName: "lang_2_teach_level", width: 90 },
    //   { columnName: "partner_major", width: 180 },
    //   { columnName: "partner_major_weight", width: 90 },
    //   { columnName: "partner_gender", width: 180 },
    //   { columnName: "partner_gender_custom", width: 180 },
    //   { columnName: "partner_gender_weight", width: 90 },
    // ];

    // const leftColumns = ["first_name", "last_name"];

    // Popup editing
    // const Popup = ({
    //   row,
    //   onChange,
    //   onApplyChanges,
    //   onCancelChanges,
    //   open,
    // }) => (
    //   <Dialog
    //     open={open}
    //     onClose={onCancelChanges}
    //     aria-labelledby="form-dialog-title"
    //   >
    //     <DialogTitle id="form-dialog-title">Student Details</DialogTitle>
    //     <DialogContent>
    //       <MuiGrid container spacing={3}>
    //         <MuiGrid item xs={6}>
    //           <FormGroup>
    //             <TextField
    //               margin="normal"
    //               name="firstName"
    //               label="First Name"
    //               value={row.first_name || ""}
    //               onChange={onChange}
    //             />
    //             <TextField
    //               margin="normal"
    //               name="lastName"
    //               label="Last Name"
    //               value={row.last_name || ""}
    //               onChange={onChange}
    //             />
    //             <TextField
    //               margin="normal"
    //               name="email"
    //               label="Email"
    //               value={row.email || ""}
    //               onChange={onChange}
    //             />
    //           </FormGroup>
    //         </MuiGrid>
    //         <MuiGrid item xs={6}>
    //           <FormGroup>
    //             <TextField
    //               margin="normal"
    //               name="major"
    //               label="Major"
    //               value={row.major || ""}
    //               onChange={onChange}
    //             />

    //             <TextField
    //               margin="normal"
    //               name="gender"
    //               label="Gender"
    //               value={row.gender || ""}
    //               onChange={onChange}
    //             />
    //           </FormGroup>
    //         </MuiGrid>
    //       </MuiGrid>
    //     </DialogContent>
    //     <DialogActions>
    //       <Button onClick={onCancelChanges} color="primary">
    //         Cancel
    //       </Button>
    //       <Button onClick={onApplyChanges} color="primary">
    //         Save
    //       </Button>
    //     </DialogActions>
    //   </Dialog>
    // );

    // const PopupEditing = React.memo(({ popupComponent: Popup }) => (
    //   <Plugin>
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
    //             changeRow,
    //             changeAddedRow,
    //             commitChangedRows,
    //             commitAddedRows,
    //             stopEditRows,
    //             cancelAddedRows,
    //             cancelChangedRows,
    //           }
    //         ) => {
    //           const isNew = addedRows.length > 0;
    //           let editedRow;
    //           let rowId;
    //           if (isNew) {
    //             rowId = 0;
    //             editedRow = addedRows[rowId];
    //           } else {
    //             [rowId] = editingRowIds;
    //             const targetRow = rows.filter(
    //               (row) => getRowId(row) === rowId
    //             )[0];
    //             editedRow = { ...targetRow, ...rowChanges[rowId] };
    //           }
    //           console.log("EDITED ROW AT THE BEGINNING IS");
    //           console.log(editedRow);

    //           const processValueChange = ({ target: { name, value } }) => {
    //             const changeArgs = {
    //               rowId,
    //               change: createRowChange(editedRow, value, name),
    //             };
    //             if (isNew) {
    //               changeAddedRow(changeArgs);
    //             } else {
    //               changeRow(changeArgs);
    //               changeAddedRow(changeArgs);
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
    //           console.log("EDITED ROW IS");
    //           console.log(editedRow);
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
    //     <Template name="root">
    //       <TemplatePlaceholder />
    //       <TemplatePlaceholder name="popupEditing" />
    //     </Template>
    //   </Plugin>
    // ));

    // const commitChanges = ({ added, changed }) => {
    //   let changedRows;
    //   if (added) {
    //     const startingAddedId =
    //       rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
    //     changedRows = [
    //       ...rows,
    //       ...added.map((row, index) => ({
    //         id: startingAddedId + index,
    //         ...row,
    //       })),
    //     ];
    //   }
    //   if (changed) {
    //     console.log("THE CHANGES ARE");
    //     console.log(changed);
    //     // changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    //   }
    //   // setRows(changedRows);
    // };

    return (
      <MuiThemeProvider>
        <TopBar />
        <h2 className={classes.heads}>Student List</h2>
        <Paper>
          <Grid rows={rows} columns={columns} getRowId={getRowId}>
            <EditingState onCommitChanges={this.commitChanges} />
            <Table />
            <TableHeaderRow />
            <TableEditColumn showEditCommand showAddCommand />
            <EditPopupPlugin popupComponent={EditPopup} />
          </Grid>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(StudentDisplay);
