import React, { useState } from "react";
import EyeIcon from "../../static/icons/Eye.png"
import EditIcon from "../../static/icons/Edit.svg"
import DeleteIcon from "../../static/icons/Delete.svg"
import LinkIcon from "../../static/icons/LinkingSocialSecretaryToHolidayCode.svg"
import MoreIcon from "../../static/icons/menu.png"
import AcceptIcon from "../../static/icons/Available.svg"
import RejectIcon from "../../static/icons/Notavailable.svg"
import MaterialTable from "material-table";
import { ArrowUpward, ChevronRight, NavigateNextRounded, NavigateBeforeRounded, RotateLeft, Search, Edit, Done, Clear } from "@material-ui/icons";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { t } from "../../translations/Translation";
import HamburgerIcon from "../../static/icons/Hamburger.svg"


export default function Table({ columns, rows, tableName, showDetails, viewAction, empId, parentId, height, setRows, SaveSalaries, multiPurpose, setDimonaData, isArchived }) {
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

    const searchStyle = showDetails || tableName === 'send_dimona' ? { width: '' } : { width: '200%' }


    //Table options
    const options = {
        filtering: false,
        maxBodyHeight: showDetails ? 'calc(100vh - 222px)' : multiPurpose ? 'calc(100vh - 308px)' : tableName !== 'employee' && tableName !== "open_shifts_overview" ? 'calc(100vh - 264px)' : 'calc(100vh - 220px)', //'83.5vh',
        // maxBodyHeight: showDetails ? 'calc(100vh - 222px)' : tableName !== 'employee' ? 'calc(100vh - 264px)': multiPurpose ? 'calc(100vh - 300px)' // Set your custom height here
        //     : 'calc(100vh - 264px)'
        //   : 'calc(100vh - 220px)',
        selection: (tableName === 'send_dimona' ? true : false),

        //Search toolbar props
        toolbar: (tableName !== 'tokens' && tableName !== 'no_action_dimona') ? true : false,
        search: tableName !== 'min_salary' && tableName !== 'no_action_dimona' ? true : false,
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
        paging: tableName === 'employee' || tableName === 'min_salary' || tableName === 'tokens' || tableName === 'open_shifts_overview' || tableName === 'send_dimona' ? false : true,
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
    const getLinkIcon = () => { return (<img className="planning-icon " src={LinkIcon}></img>) }
    const getDetailIcon = () => { return (<img className="planning-icon" src={MoreIcon}></img>) }
    const getAcceptIcon = () => { return (<img className="planning-icon" src={AcceptIcon}></img>) }
    const getRejectIcon = () => { return (<img className="planning-icon" src={RejectIcon}></img>) }


    //Define actions based on requirement (Below actions are for view and edit)
    const actionIconsList = [
        rowData => ({
            icon: () => getDetailIcon(),
            tooltip: t("DETAILS"),
            onClick: (event, rowData) => viewAction(rowData, 'details'),
            hidden: (!rowData.parentOnly && tableName !== 'location' && tableName !== 'workstation' && tableName !== 'responsible_person' && tableName !== 'function' && tableName !== 'social_secretary' && tableName !== 'cost center' && tableName !== "email_template" && tableName !== 'contracts' && tableName !== "contract_template" && tableName !== 'employee' && tableName !== "open_shifts_overview" && tableName !== "applied_candidates" && tableName !== 'holiday_overview' && tableName !== 'rules' && tableName !== 'documents_overview' && tableName !== 'taxes') ? false : true
        }),
        rowData => ({
            icon: () => getViewIcon(),
            tooltip: t("VIEW"),
            onClick: (event, rowData) => viewAction(rowData, 'view'),
            hidden: (!rowData.parentOnly && tableName !== 'dimona_overview' && tableName !== 'location' && tableName !== 'workstation' && tableName !== 'responsible_person' && tableName !== 'function' && tableName !== 'social_secretary' && tableName !== 'cost center' && tableName !== "email_template" && tableName !== "contract_template" && tableName !== 'contracts' && tableName !== 'holiday_overview' && tableName !== "applied_candidates" && tableName !== 'rules' && tableName !== 'taxes') ? false : true
        }),
        rowData => ({
            icon: () => getLinkIcon(),
            tooltip: t("LINK_HOLIDAY_CODE"),
            onClick: (event, rowData) => viewAction(rowData, 'link'),
            hidden: (tableName === 'social_secretary') ? false : true
        }),
        rowData => ({
            icon: () => getEditIcon(),
            tooltip: t("EDIT"),
            onClick: (event, rowData) => viewAction(rowData, 'edit'),
            hidden: (!rowData.parentOnly && tableName !== 'employee' && tableName !== 'dimona_overview' && tableName !== 'holiday_overview' && tableName !== "applied_candidates" && tableName !== 'documents_overview') ? false : true
        }),
        rowData => ({
            icon: () => getDeleteIcon(),
            tooltip: t("DELETE"),
            onClick: (event, rowData) => viewAction(rowData, 'delete'),
            hidden: (!rowData.parentOnly && tableName !== "email_template" && tableName !== 'dimona_overview' && tableName !== 'holiday_overview' && tableName !== "applied_candidates" && tableName !== 'rules' && tableName !== 'documents_overview' && !isArchived) ? false : true
        }),
        rowData => ({
            icon: () => getAcceptIcon(),
            tooltip: 'Accept',
            onClick: (event, rowData) => viewAction(rowData, 'accept'),
            hidden: (!rowData.parentOnly && tableName === "applied_candidates") ? false : true
        }),
        rowData => ({
            icon: () => getRejectIcon(),
            tooltip: 'Reject',
            onClick: (event, rowData) => viewAction(rowData, 'reject'),
            hidden: (!rowData.parentOnly && tableName === "applied_candidates") ? false : true
        }),
        rowData => ({
            icon: () => getDetailIcon(),
            tooltip: 'actions',
            onClick: (event, rowData) => viewAction(rowData, 'actions'),
            hidden: (!rowData.parentOnly && tableName === "holiday_overview") ? false : true
        }),
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
                style={{ width: "100%", height: tableName !== 'employee' || tableName !== 'open_shifts_overview' ? height : 'calc(100vh - 156px)' }}
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

                onSelectionChange={(rows) => setDimonaData(rows)}

                localization={{
                    pagination: {
                        labelDisplayedRows: '{from}-{to} of {count}',
                        labelRowsSelect: t("ROWS"),
                    },
                    toolbar: {
                        nRowsSelected: '', // `${`0`} ${t("ROW")}(s) selected` ,
                        searchPlaceholder: t("SEARCH_TEXT")

                    },
                    header: {
                        actions: t("ACTIONS")
                    },
                    body: {
                        emptyDataSourceMessage: t("NO_RECORDS_TO_DISPLAY"),
                        filterRow: {
                            filterTooltip: 'Filter'
                        }
                    }
                }}
                //Actions props
                actions={showDetails || tableName === 'min_salary' || tableName === 'tokens' || tableName === 'holiday_overview_rejected' || tableName === 'no_action_dimona' || tableName === 'send_dimona' || tableName === 'import_overview' ? [] : actionIconsList}
            />
        </MuiThemeProvider>

    );
};
