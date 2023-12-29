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
export default function ViewOpenShiftDetails({shiftId, setShowDetails}) {

    const navigate = useNavigate();

    const params = useParams();
    const [companyData, setCompanyData] = useState({});
    const [address, setAddress] = useState({});
    const [sector, setSector] = useState("");
    const [socialSecretaryNumber, setSocialSecretaryNumber] = useState('')

    const TabsData = [
        { tabHeading: ("Requested"), tabName: 'requested' },
        { tabHeading: ("Approved"), tabName: 'approved' },
        { tabHeading: ("Rejected"), tabName: 'rejected' },
        // { tabHeading: ("Drafts"), tabName: 'drafts' },
    ]

    const requestedHeaders = [
        {
            title: "Employee Name",
            field: "employee_name",
            status: "200",
        },
    ]

    const requestedCandidatesList = [

    ]

    useEffect(() => {
        if (shiftId!== '0') {
            let editApiUrl = OpenShiftApiUrl + '/' + 1
            // Api call to get detail data
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        console.log(result.data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }


    }, [shiftId])

    const viewAction = (data, action) => {
        if (action === 'delete') {
            // setWarningMessage('Are you sure you want to delete this item?')
        }
        if (action === 'edit') {
            // setOpenPopup(true)
        } else if (action === 'view') {
            // navigate('/manage-plannings/open-shift-view/' + 1)
        } else {
            // setDeleteUrl(HolidayCodeApiUrl + '/' + data.id)
        }

    }

    return (
        <div className="col-md-12 row m-0 p-0  border-bottom">
            {/* <div className="company-tab-width mt-3 mb-1 mx-auto pt-2 pl-2 border bg-white">
                <h4 className="mb-0 text-color">
                    <img className="shortcut-icon mr-2 mb-1" onClick={() => navigate('/manage-plannings')} src={BackIcon}></img>
                    {'Shift details'}
                </h4>
            </div> */}
            <div className="company-tab-width col-md-12 company_creation border p-0 bg-white">

                <div className="col-md-12 row m-0 py-3 px-4 border-bottom">
                    {/* <img className="employee-icon-temp rounded-circle mx-2 " src={companyData.logo ? URL.createObjectURL(companyData.logo) : indii}></img> */}
                    <div className="width-22 px-3 mt-2 border-right">
                        <h4 className="mb-3 font-22">{"Open Shift name"}</h4>
                        <p className="text-secondary font-18">{"location: Location 01"}</p>
                    </div>
                    <div className="width-22 px-3 mt-2">
                        <p className="mb-1 font-22 d-flex">{"Function: "}<p className="text-secondary font-18">{"Assistant"}</p></p>
                        <p className="font-22 d-flex">{"Repeat: "}<p className="text-secondary font-18">{"Daily"}</p></p>
                    </div>
                    <div className="width-22 px-3 mt-2">
                        <p className="mb-1 font-22 d-flex">{"Start Date: "}<p className="text-secondary font-18">{"28-12-2023"}</p></p>
                        <p className="font-22 d-flex">{"End Date: "}<p className="text-secondary font-18">{"05-01-2024"}</p></p>
                    </div>
                    <div className="width-22 px-3 mt-2">
                        <p className="font-22 d-flex">{"Employee type: "}<p className="text-secondary font-18">{" flex"}</p></p>
                        {/* <p className="text-secondary font-18">{"location"}</p> */}
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
                            <Table columns={requestedHeaders} rows={requestedCandidatesList} tableName={"open_shifts_overview"} viewAction={viewAction}></Table>
                        </TabPanel>
                        <TabPanel>
                            <Table columns={requestedHeaders} rows={requestedCandidatesList} tableName={"open_shifts_overview"} viewAction={viewAction}></Table>
                        </TabPanel>
                        <TabPanel>
                            <Table columns={requestedHeaders} rows={requestedCandidatesList} tableName={"open_shifts_overview"} viewAction={viewAction}></Table>
                        </TabPanel>
                        {/* <TabPanel>
                            <Table columns={requestedHeaders} rows={requestedCandidatesList} tableName={"open_shifts_overview"} viewAction={viewAction}></Table>
                        </TabPanel> */}
                    </Tabs>
                </div>
            </div>
        </div >
    )
}
