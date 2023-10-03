import React, { useState } from "react";
import EyeIcon from "../../static/icons/Eye.png"
import EditIcon from "../../static/icons/Edit.svg"
import DeleteIcon from "../../static/icons/Delete.svg"
import LinkIcon from "../../static/icons/link.png"

import MaterialTable from "material-table";
import { ArrowUpward, ChevronRight, NavigateNextRounded, NavigateBeforeRounded, RotateLeft, Search, Edit, Done, Clear } from "@material-ui/icons";

import { MuiThemeProvider } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';


export default function Table({ columns, rows, tableName, showDetails, viewAction, empId, parentId, height, setRows, SaveSalaries }) {

    // const [rowData, setRowData] = useState(rows);

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

    //All the icons used in the table are defined below
    const tableIcon = {
        Search: Search,
        ResetSearch: RotateLeft,
        SortArrow: ArrowUpward,
        DetailPanel: ChevronRight,
        NextPage: NavigateNextRounded,
        PreviousPage: NavigateBeforeRounded,
        Edit: Edit,
        Check: Done,
        Clear: Clear,
    }

    // const searchStyle = showDetails ? { width: '' } : { width: '200%', border: '0.5px solid #ABABAB', borderRadius: '5px' }

    const searchStyle = showDetails ? { width: '' } : { width: '200%'}


    //Table options
    const options = {
        filtering: false,
        maxBodyHeight: showDetails ? 'calc(100vh - 222px)' : tableName !== 'employee' ? 'calc(100vh - 264px)' : 'calc(100vh - 220px)', //'83.5vh',

        //Search toolbar props
        toolbar: true,
        search: tableName !== 'min_salary' ? true : false,
        searchFieldAlignment: 'left',
        searchFieldStyle: searchStyle, //padding: '0px',

        //Expand props (Parent and child format/tree data format)
        expanded: true,
        defaultExpanded: (rowData) => (
            showDetails && rowData.id !== parentId ? false : true
        ),

        //Header style props
        headerStyle: {
            backgroundColor: "#61BFB5",
            color: "#FFF",
            fontSize: "0.875rem",
            textAlign: 'left',
            fontWeight: "bold",
            zIndex: 1,
            display: showDetails ? 'none' : '',
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
            backgroundColor: rowData.parentOnly ? "#2929291A" : rowData.id === empId && showDetails ? "rgb(146 233 225 / 22%)" : "#FFFFFF",
            fontSize: "0.875rem",
        }),
        addRowPosition: "first",

        //Actions props
        actionsCellStyle: { width: '100px', padding: '0px 20px' },
        actionsColumnIndex: -1,
    }


    const getViewIcon = () => { return (<img className="shortcut-icon" src={EyeIcon}></img>) }
    const getEditIcon = () => { return (<img className="header-icon " src={EditIcon}></img>) }
    const getDeleteIcon = () => { return (<img className="header-icon " src={DeleteIcon}></img>) }
    const getLinkIcon = () => { return (<img className="header-icon " src={LinkIcon}></img>) }


    //Define actions based on requirement (Below actions are for view and edit)
    const actionIconsList = [
        rowData => ({
            icon: () => getViewIcon(),
            tooltip: 'View',
            onClick: (event, rowData) => viewAction(rowData, 'view'),
            hidden: (!rowData.parentOnly && tableName !== 'location' && tableName !== 'workstation' && tableName !== 'function' && tableName !== 'social_secretary') ? false : true
        }),
        rowData => ({
            icon: () => getLinkIcon(),
            tooltip: 'Link holiday code',
            onClick: (event, rowData) => viewAction(rowData, 'link'),
            hidden: (tableName === 'social_secretary') ? false : true
        }),
        rowData => ({
            icon: () => getEditIcon(),
            tooltip: 'Edit',
            onClick: (event, rowData) => viewAction(rowData, 'edit'),
            hidden: (!rowData.parentOnly && tableName !== 'employee') ? false : true
        }),
        rowData => ({
            icon: () => getDeleteIcon(),
            tooltip: 'Delete',
            onClick: (event, rowData) => viewAction(rowData, 'delete'),
            hidden: (!rowData.parentOnly && tableName !== 'employee') ? false : true
        })
    ]

    // const localization = {
    //     body: {
    //         emptyDataSourceMessage : 'Please select sector to get the salaries'
    //     }
    // }


    return (
        <MuiThemeProvider theme={theme}>
            <MaterialTable
                title=''
                style={{ width: "100%", height: tableName !== 'employee' ? height : 'calc(100vh - 156px)' }}
                icons={tableIcon}
                columns={columns}
                data={rows}
                isLoading={rows ? false : true}

                editable={tableName === 'min_salary' ? {
                    onBulkUpdate: (changes) => //newData, oldData
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const updatedData = [...rows];
                                // Apply changes to the updatedData array based on the "changes" object
                                for (const rowId in changes) {
                                    const rowIndex = updatedData.findIndex(
                                      (item) => item.id === changes[rowId].oldData.id
                                    );
                                    if (rowIndex !== -1) {
                                      updatedData[rowIndex] = {
                                        ...updatedData[rowIndex],
                                        ...changes[rowId].newData,
                                      };
                                    }
                                  }

                                setRows(updatedData);
                                SaveSalaries(updatedData);
                                resolve();
                            }, 1000);
                        }),
                } : false}

                //Parent child format for employee overview
                parentChildData={(row, rows) => rows.find((a) => a.id === row.parentId)}

                //Options for table modifications
                options={options}

                //Actions props
                actions={showDetails || tableName === 'min_salary' ? [] : actionIconsList}
            />
        </MuiThemeProvider>

    );
};
