import React from "react";
import { MaterialReactTable } from 'material-react-table';
import EyeIcon from '../../static/icons/Eye.png'
import EditIcon from "../../static/icons/Edit.svg"


export default function Table({ columns, rows, tableName }) {


    return (
        <MaterialReactTable
            columns={columns}
            data={rows}
            enableColumnActions={false}
            enableStickyHeader={true}
            enableRowActions
            // Style for action column
            displayColumnDefOptions={{
                'mrt-row-actions': {
                    size: 100,
                },
            }}
            // Actions
            renderRowActions={({ row }) => (
                <>
                    <img className="shortcut-icon" src={EyeIcon} onClick={() => console.log(row)}></img>
                    {tableName !== 'company' && <img className="header-icon ml-3" src={EditIcon} onClick={() => console.log(row)}></img>}
                </>
            )}
            // Style for table header
            muiTableHeadCellProps={{
                sx: (theme) => ({
                    color: "#FFFFFF",
                    backgroundColor: "#80CBC3",
                }),
            }}
            positionActionsColumn="last"
            muiTablePaginationProps={{
                rowsPerPageOptions: [],
            }}
            enableTopToolbar={false}
        />
    )
}
