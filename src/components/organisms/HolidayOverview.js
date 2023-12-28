import React, { useState, useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import FormsNew from "../molecules/FormsNew";
import Table from "../atoms/Table";
import CustomButton from "../atoms/CustomButton";
import { t } from "../../translations/Translation";



export default function HolidayOverview() {

    const [filter, setFilter] = useState({
        "applied_date": "",
        "manager": "",
        "employee": "",
        "leave_date": ""
    })
    const [filteredData, setFilteredData] = useState([])
    //status tab list
    const tabList = [
        { tabHeading: t("PENDING"), tabName: "pending" },
        { tabHeading: t("APPROVED"), tabName: "approved" },
        { tabHeading: t("REJECTED"), tabName: "rejected" },
        { tabHeading: t("CANCELLED"), tabName: "cancelled" }
    ]
    //fiedl for filter data
    const filterDataFields = [
        { title: t("APPLIED_DATE"), name: "applied_date", placeholder: t("SELECT_DATE"), required: false, type: "date", style: "col-md-3 float-left" },
        { title: t("MANAGER"), name: "manager", placeholder: t("MANAGER"), required: false, type: "text", style: "col-md-3 float-left" },
        { title: t("EMPLOYEE_TITLE"), name: "employee", placeholder: t("EMPLOYEE_TITLE"), required: false, type: "text", style: "col-md-3 float-left" },
        { title: t("LEAVE_DATE"), name: "leave_date", placeholder: t("SELECT_DATE"), required: false, type: "date", style: "col-md-3 float-left" }
    ]

    //dummy recent leaves
    const dummyData = [
        "Vishal applied leave on 13th",
        "sunil applied leave on 13th",
        "laxmi applied leave on 13th",
    ]
    // table headers
    const tableHeaders = [
        {
            title: t("TITLE_TEXT"),
            field: "title",
            status: 200
        },
        {
            title: t("APPLIED_BY"),
            field: "applied_by",
            status: "200",
        },
        {
            title: t("REPORTING_MANAGER"),
            field: "reporting_manager",
            status: "200",
        },
        {
            title: t("LEAVE_DATE"),
            field: "leave_date",
            status: "200",
        }
    ]

    //dummy row data
    const row = [
        { title: "Requested on 13th", applied_date: "07-11-2023", applied_by: "sunil", reporting_manager: "vishal", leave_date: "13-11-2023", id: 1, role: "employee" },
        { title: "Requested on", applied_date: "08-11-2023", applied_by: "laxmi", reporting_manager: "deepa", leave_date: "14-11-2023", id: 2, role: "employee" },
        { title: "Requested on", applied_date: "06-11-2023", applied_by: "hemant", reporting_manager: "shyam", leave_date: "14-11-2023", id: 3, role: "employee" }
    ]
    //setting values
    const setValues = (index, name, value, type) => {
        setFilter((prev) => ({ ...prev, [name]: value }))
    }

    //function to filter
    const onApplyFilter = () => {

        // AXIOS.service(url, "POST", data)
        //     .then((result) => {
        //         if (result?.success) {

        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }

    const OnSave = () => {

        let url = ""
        let data = {}

        // AXIOS.service(url, "POST", data)
        //     .then((result) => {
        //         if (result?.success) {

        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }

    return (
        <div className="mt-1">
            <div className="d-flex flex-row planning_body">
                <div className="col-md-9 p-0 bg-white">
                    <Tabs>
                        <TabList className="d-flex p-0 mb-0">
                            {tabList.map((val, i) => {
                                return (
                                    <Tab className="planing_tabs" key={val.tabName}>{val.tabHeading}</Tab>
                                )
                            })}
                        </TabList>
                        <div className="mb-2 d-flex border-top pt-1 container-fluid pt-3">
                            <FormsNew
                                view="filters"
                                formTitle={''}
                                formattedData={filter}
                                data={filterDataFields}
                                SetValues={setValues}
                            ></FormsNew>
                            <div className="">
                                <CustomButton buttonName={t("APPLY")} ActionFunction={() => onApplyFilter()} CustomStyle="my-4 mr-2"></CustomButton>
                            </div>
                        </div>
                        <TabPanel><Table columns={tableHeaders} rows={row} tableName={"holiday_overview"}></Table></TabPanel>
                        <TabPanel><Table columns={tableHeaders} rows={row} tableName={"holiday_overview"}></Table></TabPanel>
                        <TabPanel><Table columns={tableHeaders} rows={row} tableName={"holiday_overview_rejected"}></Table></TabPanel>
                        <TabPanel><Table columns={tableHeaders} rows={row} tableName={"holiday_overview"}></Table></TabPanel>
                    </Tabs>
                </div>
                <div className="col-md-3 bg-white border-left ">
                    <h4 className="m-3 mt-4">{t("RECENT")}</h4>
                    <div className=" my-2">
                        <ul>
                            {dummyData.map((val, i) => {
                                return (
                                    <li key={i}>{val}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}   