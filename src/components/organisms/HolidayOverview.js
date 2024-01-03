import React, { useState, useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import FormsNew from "../molecules/FormsNew";
import Table from "../atoms/Table";
import CustomButton from "../atoms/CustomButton";
import { t } from "../../translations/Translation";
import { GetHolidaysByStatusApiUrl } from "../../routes/ApiEndPoints";



export default function HolidayOverview() {

    const [tabIndex, setTabIndex] = useState(0);

    //tab list
    const tabList = [
        { tabHeading: t("PENDING"), tabName: "pending" },
        { tabHeading: t("APPROVED"), tabName: "approved" },
        { tabHeading: t("REJECTED"), tabName: "rejected" },
        { tabHeading: t("CANCELLED"), tabName: "cancelled" }
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
            title: t("APPLIED_DATE"),
            field: "applied_date",
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

    useEffect(() => {
        let status
        if (tabIndex === 0) {
            status = 'pending'
        } else if (tabIndex === 1) {
            status = 'approve'
        } else if (tabIndex === 2) {
            status = 'reject'
        } else {
            status = 'cancel'
        }
        AXIOS.service(GetHolidaysByStatusApiUrl + status, 'GET')
            .then((result) => {
                if (result?.success) {
                    // setEmployeeList(result.data)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [tabIndex])

    //dummy row data
    const row = [
        { title: "Requested on 13th", applied_date: "07-11-2023", applied_by: "sunil", reporting_manager: "vishal", leave_date: "13-11-2023", id: 1, role: "employee" },
        { title: "Requested on", applied_date: "08-11-2023", applied_by: "laxmi", reporting_manager: "deepa", leave_date: "14-11-2023", id: 2, role: "employee" },
        { title: "Requested on", applied_date: "06-11-2023", applied_by: "hemant", reporting_manager: "shyam", leave_date: "14-11-2023", id: 3, role: "employee" }
    ]


    //function to filter
    const viewAction = () => {

    }

    return (
        <div className="mt-1">
            <div className="d-flex flex-row planning_body">
                <div className="col-md-9 p-0 bg-white">
                    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                        <TabList className="d-flex p-0 mb-0">
                            {tabList.map((val, i) => {
                                return (
                                    <Tab className="planing_tabs" key={val.tabName}>{val.tabHeading}</Tab>
                                )
                            })}
                        </TabList>
                        <TabPanel><Table columns={tableHeaders} rows={row} tableName={"holiday_overview"} viewAction={viewAction}></Table></TabPanel>
                        <TabPanel><Table columns={tableHeaders} rows={row} tableName={"holiday_overview"} viewAction={viewAction}></Table></TabPanel>
                        <TabPanel><Table columns={tableHeaders} rows={row} tableName={"holiday_overview_rejected"} viewAction={viewAction}></Table></TabPanel>
                        <TabPanel><Table columns={tableHeaders} rows={row} tableName={"holiday_overview"} viewAction={viewAction}></Table></TabPanel>
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