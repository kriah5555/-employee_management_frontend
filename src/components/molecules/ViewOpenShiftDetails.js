import React, { useState, useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useNavigate, useParams } from "react-router-dom";
import { OpenShiftApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import Table from "../atoms/Table";
import BackIcon from "../../static/icons/BackIcon.png";
import { t } from "../../translations/Translation";
import { toast } from 'react-toastify';

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
    const [approvedEmployees, setApprovedEmployees] = useState([])
    const [rejectEmployees, setRejectedEmployees] = useState([])
    const [requestedEmployees, setRequestedEmployees] = useState([])
    const [dataRefresh, setDataRefresh] = useState(false)
    const requestedHeaders = [
        {
            title: t("EMPLOYEE_NAME"),
            field: "employee_name",
            status: "200",
        },
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
                    let requestedEmployees = []
                    let rejectedEmployees = []
                    let approvedEmployees = []
                    result.data?.employees.map((item, index) => {
                        item.id = item.employee_id
                        if (item.status == "0") { // 0 ==> status for requested
                            requestedEmployees.push(item)
                        } else if (item.status == "1") {  // 1 ==> status for approved
                            approvedEmployees.push(item)
                        } else if (item.status == "2") { // 2 ==> status for rejected
                            rejectedEmployees.push(item)
                        }
                    })
                    setRequestedEmployees(requestedEmployees)
                    setApprovedEmployees(approvedEmployees)
                    setRejectedEmployees(rejectedEmployees)
                }
            })
            .catch((error) => {
                console.log(error);
            })


    }, [dataRefresh])

    const viewAction = (data, action) => {
        console.log(data);
        let applicationAction = (action === 'accept') ? 1 : 2

        let payload = {
            "id": data.application_id,
            "vacancy_id": data.vacancy_id,
            "user_id": data.employee_id,
            "request_status": applicationAction,
            "vacancy_date": data.vacancy_date,
            "responded_by": localStorage.getItem('userId'),
            'company_id': localStorage.getItem('company_id')
        }

        AXIOS.service(OpenShiftApiUrl + "/respond-to-vacancy", 'POST', payload)
            .then((result) => {
                if (result?.success) {
                    toast.success(result?.message[0], {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setDataRefresh(!dataRefresh)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    return (
        <div className="right-creation-container ">
            <div className="company-tab-width mt-3 mb-1 mx-auto pt-2 pl-2 border bg-white">
                <h4 className="mb-0 text-color">
                    <img className="shortcut-icon mr-2 mb-1 pointer" onClick={() => navigate('/manage-plannings#open_shift')} src={BackIcon}></img>
                    {t("SHIFT_DETAILS")}
                </h4>
            </div>
            <div className="company-tab-width company_creation mt-2 mb-3 mx-auto border bg-white">

                <div className="col-md-12 row m-0 py-3 px-4 border-bottom">
                    <div className="width-22 px-3 mt-2 border-right">
                        <h4 className="mb-3 font-22 text-truncate">{shiftData?.name}</h4>
                        <p className="text-secondary font-18 text-truncate">{shiftData?.location_name}</p>
                    </div>
                    <div className="width-22 px-3 mt-2 text-truncate">
                        <p className="mb-1 font-22 d-flex">{t("FUNCTION_TITLE") + (":")} &nbsp;<p className="text-secondary font-18">{shiftData?.function_name}</p></p>
                        <p className="font-22 d-flex">{t("REPEAT") + (":")}&nbsp;<p className="text-secondary font-18">{shiftData?.repeat_title}</p></p>
                    </div>
                    <div className="width-22 px-3 mt-2 text-truncate">
                        <p className="mb-1 font-22 d-flex">{t("START_DATE") + (":")}&nbsp;<p className="text-secondary font-18">{shiftData?.start_date}</p></p>
                        <p className="font-22 d-flex">{t("END_DATE") + (":")} &nbsp;<p className="text-secondary font-18">{shiftData?.end_date}</p></p>
                    </div>
                    <div className="width-22 px-3 mt-2 text-truncate">
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
                            <Table columns={requestedHeaders} rows={requestedEmployees} tableName={"applied_candidates"} viewAction={viewAction}></Table>
                        </TabPanel>
                        <TabPanel>
                            <Table columns={requestedHeaders} rows={approvedEmployees} tableName={"approved_candidates"} ></Table>
                        </TabPanel>
                        <TabPanel>
                            <Table columns={requestedHeaders} rows={rejectEmployees} tableName={"rejected_candidates"} ></Table>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div >
    )
}
