import React, { useState, useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import Table from "../atoms/Table";
import { t } from "../../translations/Translation";
import { GetHolidaysByStatusApiUrl } from "../../routes/ApiEndPoints";
import ActionsPopup from "../molecules/ActionsPopup";

export default function HolidayOverview() {

    const [tabIndex, setTabIndex] = useState(0);
    const [holidayList, setHolidayList] = useState([])
    const [openPopUp, setOpenPopUp] = useState(false)
    const [actionList, setActionList] = useState([])
    const [individualHolidayData, setIndividualHolidayData] = useState({})
    const [refresh, setRefresh] = useState("")

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
            title: t("APPLIED_BY"),
            field: "employee.full_name",
            status: "200",
        },
        {
            title: t("APPLIED_DATE"),
            field: "applied_date",
            status: "200",
        },
        {
            title: t("REPORTING_MANAGER"),
            field: "manager.full_name",
            status: "200",
        },
        {
            title: t("LEAVE_DATE"),
            field: 'dates_string',
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
                    let response = result.data
                    let data = []
                    response.map((item, index) => {
                        item.dates_string = item?.absence_dates?.absence_dates_array.join(", ")
                        data.push(item)
                    })
                    setHolidayList(data)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [tabIndex, refresh])


    //function to filter
    const viewAction = (data, action) => {
        if (action === "actions") {
            setActionList(data.actions, openPopUp)
            setOpenPopUp(true)
            setIndividualHolidayData(data)
        }
    }


    const onHide = () => {
        setOpenPopUp(false)
    }



    return (
        <div className="mt-1">
            {openPopUp && <ActionsPopup onHide={onHide} actions={actionList} openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} data={individualHolidayData} refresh={refresh} setRefresh={setRefresh}></ActionsPopup>}
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
                        <TabPanel><Table columns={tableHeaders} rows={holidayList} tableName={"holiday_overview"} viewAction={viewAction} ></Table></TabPanel>
                        <TabPanel><Table columns={tableHeaders} rows={holidayList} tableName={"holiday_overview"} viewAction={viewAction}></Table></TabPanel>
                        <TabPanel><Table columns={tableHeaders} rows={holidayList} tableName={"holiday_overview_rejected"} viewAction={viewAction}></Table></TabPanel>
                        <TabPanel><Table columns={tableHeaders} rows={holidayList} tableName={"holiday_overview_rejected"} viewAction={viewAction}></Table></TabPanel>
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