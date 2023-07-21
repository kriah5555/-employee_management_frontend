import React from "react";
import EyeIcon from "../../static/icons/Eye.png"
import EditIcon from "../../static/icons/Edit.svg"
import DeleteIcon from "../../static/icons/Delete.svg"

import MaterialTable from "material-table";
import { ArrowUpward, ChevronRight, NavigateNextRounded, NavigateBeforeRounded, RotateLeft, Search } from "@material-ui/icons";

import { MuiThemeProvider } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';


export default function Table({ columns, rows, tableName, showDetails, viewAction, empId, parentId, height }) {

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
    }

    //Table options
    const options = {
        filtering: false,
        maxBodyHeight: showDetails ? 'calc(100vh - 222px)' : tableName !== 'employee' ? 'calc(100vh - 200px)' : 'calc(100vh - 160px)', //'83.5vh',

        //Search toolbar props
        toolbar: showDetails ? true : false,
        searchFieldAlignment: 'left',
        searchFieldStyle: { padding: '0px', backgroundColor: "#61BFB5" },

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
            textAlign: "left",
            fontWeight: "bold",
            zIndex: 1,
            display: showDetails ? 'none' : '',
            position: 'sticky',
            top: 0
        },

        //Pagination props
        paging: tableName === 'employee' ? false : true,
        pageSize: 10,
        pageSizeOptions: [5, 10, 50],
        emptyRowsWhenPaging: false,
        showFirstLastPageButtons:false,

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


    const getViewIcon = () => { return(<img className="shortcut-icon" src={EyeIcon}></img>) }
    const getEditIcon = () => { return(<img className="header-icon " src={EditIcon}></img>) }
    const getDeleteIcon = () => { return(<img className="header-icon " src={DeleteIcon}></img>) }


    //Define actions based on requirement (Below actions are for view and edit)
    const actionIconsList = [
        rowData => ({
            icon: () => getViewIcon(),
            tooltip: 'View',
            onClick: (event, rowData) => viewAction(rowData, 'view'),
            hidden: (!rowData.parentOnly && tableName !== 'function') ? false : true
        }),
        rowData => ({
            icon: () => getEditIcon(),
            tooltip: 'Edit',
            onClick: (event, rowData) => viewAction(rowData, 'edit'),
            hidden: (!rowData.parentOnly && tableName !== 'company' && tableName !== 'employee') ? false : true
        }),
        rowData => ({
            icon: () => getDeleteIcon(),
            tooltip: 'Delete',
            onClick: (event, rowData) => viewAction(rowData, 'delete'),
            hidden: (!rowData.parentOnly && tableName !== 'company' && tableName !== 'employee') ? false : true
        })
    ]


    return (
        <MuiThemeProvider theme={theme}>
            <MaterialTable
                title=''
                style={{ width: "100%", height: tableName !== 'employee' ? height : 'calc(100vh - 156px)' }}
                icons={tableIcon}
                columns={columns}
                data={rows}
                isLoading={rows ? false : true}

                //Parent child format for employee overview
                parentChildData={(row, rows) => rows.find((a) => a.id === row.parentId)}

                //Options for table modifications
                options={options}

                //Actions props
                actions={showDetails ? [] : actionIconsList}
            />
        </MuiThemeProvider>

    );
};
