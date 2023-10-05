import React, { useState } from "react";

import MaterialTable from "material-table";
import { ArrowUpward, ChevronRight, NavigateNextRounded, NavigateBeforeRounded, RotateLeft, Search, Edit, Done, Clear, AddBox, Delete } from "@material-ui/icons";

import { MuiThemeProvider } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import DeleteIcon from "../../static/icons/Delete.svg"
import EditIcon from "../../static/icons/Edit.svg"
import DoneIcon from "../../static/icons/Available.svg"
import CancelIcon from "../../static/icons/Notavailable.svg"


export default function CustomTable({ columns, rows, tableName, UpdateRow, CreateRow, DeleteRow, height, setRows, title }) {

    //Theme added for table
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#4caf50',
            },
            secondary: {
                main: '#ff9100',
            },
        }
    })

    const [columnss, setColumns] = useState([
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname', initialEditValue: 'initial edit value' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
            title: 'Birth Place',
            field: 'birthCity',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
    ]);

    const [data, setData] = useState([
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    ]);

    const getEditIcon = () => { return (<img className="header-icon " src={EditIcon}></img>) }
    const getDeleteIcon = () => { return (<img className="header-icon " src={DeleteIcon}></img>) }
    const getDoneIcon = () => { return (<img className="header-icon " src={DoneIcon}></img>) }
    const getCancelIcon = () => { return (<img className="header-icon " src={CancelIcon}></img>) }

    //All the icons used in the table are defined below
    const tableIcon = {
        Search: Search,
        ResetSearch: RotateLeft,
        SortArrow: ArrowUpward,
        DetailPanel: ChevronRight,
        NextPage: NavigateNextRounded,
        PreviousPage: NavigateBeforeRounded,
        Edit: getEditIcon,
        Check: getDoneIcon,
        Clear: getCancelIcon,
        Add: AddBox,
        Delete: getDeleteIcon,
    }

    // const searchStyle = showDetails ? { width: '' } : { width: '200%', border: '0.5px solid #ABABAB', borderRadius: '5px' }

    const searchStyle = { width: '200%' }


    //Table options
    const options = {
        filtering: false,
        maxBodyHeight: 'calc(100vh - 264px)', //'83.5vh',

        //Search toolbar props
        toolbar: true,
        search: true,
        // searchFieldAlignment: 'right',
        // searchFieldStyle: searchStyle, //padding: '0px',

        //Expand props (Parent and child format/tree data format)
        expanded: true,
        // defaultExpanded: (rowData) => (
        //     showDetails && rowData.id !== parentId ? false : true
        // ),

        //Header style props
        headerStyle: {
            backgroundColor: "#61BFB5",
            color: "#FFF",
            fontSize: "0.875rem",
            textAlign: 'left',
            fontWeight: "bold",
            zIndex: 1,
            display: '',
            position: 'sticky',
            top: 0
        },

        //Pagination props
        paging: tableName === 'employee' || tableName === 'min_salary' ? false : true,
        pageSize: 10,
        pageSizeOptions: [5, 10, 50],
        emptyRowsWhenPaging: false,
        showFirstLastPageButtons: false,

        //Row style props
        rowStyle: (rowData) => ({
            backgroundColor: "#FFFFFF",
            fontSize: "0.875rem",
        }),
        addRowPosition: "first",

        //Actions props
        actionsCellStyle: { width: '100px', padding: '0px 20px' },
        actionsColumnIndex: -1,
    }

    return (
        <MuiThemeProvider theme={theme}>
            <MaterialTable
                title={title}
                style={{ width: "100%", height: tableName !== 'employee' ? height : 'calc(100vh - 156px)' }}
                columns={columns}
                icons={tableIcon}
                data={rows}
                isLoading={rows ? false : true}
                options={options}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                setRows([...rows, newData]);
                                CreateRow(newData)

                                resolve();
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...rows];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setRows([...dataUpdate]);
                                UpdateRow(newData, oldData.tableData.id)

                                resolve();
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...rows];
                                const index = oldData.tableData.id;
                                DeleteRow(dataDelete[index])
                                dataDelete.splice(index, 1);
                                setRows([...dataDelete]);


                                resolve()
                            }, 1000)
                        }),

                }}
            />
        </MuiThemeProvider>
    )



}
