import React, { useState, useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useNavigate, useParams } from "react-router-dom";
import { OpenShiftApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import indii from "../../static/icons/logo-temp.png"
import Table from "../atoms/Table";
import BackIcon from "../../static/icons/BackIcon.png";
import FunctionIcon from "../../static/icons/Settings.svg"
import LocationIcon from "../../static/icons/Location.svg"
import { t } from "../../translations/Translation";
export default function ViewOpenShiftDetails({ shiftId, setShowDetails }) {

    const navigate = useNavigate();

    const params = useParams();
    const [shiftData, setShiftData] = useState({});
    const [employeeTypeString, setEmployeeTypeString] = useState("")
    const TabsData = [
        { tabHeading: t("REQUESTED"), tabName: 'requested' },
        { tabHeading: t("APPROVED"), tabName: 'approved' },
        { tabHeading: t("REJECTED"), tabName: 'rejected' },
        // { tabHeading: ("Drafts"), tabName: 'drafts' },
    ]

    const requestedHeaders = [
        {
            title: t("EMPLOYEE_NAME"),
            field: "employee_name",
            status: "200",
        },
    ]

    const requestedCandidatesList = [

    ]

    const createEmployeeTypeString = (employeeType) => {
        let resultString = '';

        employeeType.map((val, index) => {
            index == employeeType.length - 1 ? resultString += val.label : resultString += val.label + ", ";
        })
        return resultString;
    }

    useEffect(() => {
        let editApiUrl = OpenShiftApiUrl + '/' + params.id
        // Api call to get detail data
        AXIOS.service(editApiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    setShiftData(result.data)
                    setEmployeeTypeString(createEmployeeTypeString(result.data?.employee_types))
                }
            })
            .catch((error) => {
                console.log(error);
            })


    }, [])
    //dummy data
    const data = [{ id: 1, employee_name: "employee 01" }]

    const viewAction = (data, action) => {

        if (action === 'accept') {

            let data = {
                "id": data.id,
                "vacancy_id": data.vacancy_id,
                "user_id": data.user_id,
                "request_status": "1",
                "vacancy_date": data.start_date,
                "responded_by": "1",
            }
            AXIOS.service(OpenShiftApiUrl + "/respond-to-vacancy", 'POST', data)
                .then((result) => {
                    if (result?.success) {
                        setShiftData(result.data)
                        setEmployeeTypeString(createEmployeeTypeString(result.data?.employee_types))
                    }
                })
                .catch((error) => {
                    console.log(error);
                })

        } else if (action === 'reject') {

        }


    }

    return (
        <div className="right-creation-container ">
            <div className="company-tab-width mt-3 mb-1 mx-auto pt-2 pl-2 border bg-white">
                <h4 className="mb-0 text-color">
                    <img className="shortcut-icon mr-2 mb-1 pointer" onClick={() => navigate('/manage-plannings')} src={BackIcon}></img>
                    {t("SHIFT_DETAILS")}
                </h4>
            </div>
            <div className="company-tab-width company_creation mt-2 mb-3 mx-auto border bg-white">

                <div className="col-md-12 row m-0 py-3 px-4 border-bottom">
                    <div className="width-22 px-3 mt-2 border-right">
                        <h4 className="mb-3 font-22">{shiftData?.name}</h4>
                        <p className="text-secondary font-18">{shiftData?.location_name}</p>
                    </div>
                    <div className="width-22 px-3 mt-2">
                        <p className="mb-1 font-22 d-flex">{t("FUNCTION_TITLE") + (":")} &nbsp;<p className="text-secondary font-18">{shiftData?.function_name}</p></p>
                        <p className="font-22 d-flex">{t("REPEAT") + (":")}&nbsp;<p className="text-secondary font-18">{shiftData?.repeat_title}</p></p>
                    </div>
                    <div className="width-22 px-3 mt-2">
                        <p className="mb-1 font-22 d-flex">{t("START_DATE") + (":")}&nbsp;<p className="text-secondary font-18">{shiftData?.start_date}</p></p>
                        <p className="font-22 d-flex">{t("END_DATE")+(":")} &nbsp;<p className="text-secondary font-18">{shiftData?.end_date}</p></p>
                    </div>
                    <div className="width-22 px-3 mt-2">
                        <p className="font-22 d-flex">{t("EMPLOYEE_TYPE") + (":")}<p className="text-secondary font-18">{employeeTypeString}</p></p>
                    </div>
                </div>
                <div className="col-md-12 p-0 employee-detail employee-detail-height">
                    <Tabs>
                        <TabList>
                            {TabsData.map((val) => {
                                return (
                                    <Tab key={val.tabName} >{val.tabHeading}</Tab> //selectedClassName="selected_emp_tab"
                                )
                            })}
                        </TabList>
                        <TabPanel>
                            <Table columns={requestedHeaders} rows={data} tableName={"applied_candidates"} viewAction={viewAction}></Table>
                        </TabPanel>
                        <TabPanel>
                            <Table columns={requestedHeaders} rows={requestedCandidatesList} tableName={"open_shifts_overview"} ></Table>
                        </TabPanel>
                        <TabPanel>
                            <Table columns={requestedHeaders} rows={requestedCandidatesList} tableName={"open_shifts_overview"} ></Table>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div >
    )
}
