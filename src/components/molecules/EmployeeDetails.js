import React, { useEffect, useState } from "react";
import EmployeeIcon from "../../static/icons/Profile1.jpeg"
import PhoneIcon from "../../static/icons/phone.svg"
import EmailIcon from "../../static/icons/Email.svg"
import EditIcon from "../../static/icons/edit-dark.svg"
import DeleteIcon from "../../static/icons/delete.png"
import RSZIcon from "../../static/icons/ID.svg"
import DownArrow from "../../static/icons/DownArrow.svg"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import EmployeeUpdate from "./EmployeeUpdate";
import CalendarLayout from "../../utilities/calendar/CalendarLayout";
import CustomButton from "../atoms/CustomButton";
import Switch from "../atoms/Switch";
import AddContractPopup from "./AddContractPopup";
import { EmployeeContractApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"


export default function EmployeeDetails() {

    const [editStatus, setEditStatus] = useState(false);
    const [toggleOpen, setToggleOpen] = useState(false);
    const [popupOpen, setOpenPopup] = useState(false);
    const [employeeContractOptions, setEmployeeContractOptions] = useState([]);


    const TabsData = [
        { tabHeading: ("Personal details"), tabName: 'personal' },
        { tabHeading: ("Contract details"), tabName: 'contracts' },
        { tabHeading: ("Counters"), tabName: 'counters' },
        { tabHeading: ("Documents"), tabName: 'documents' },
        { tabHeading: ("Availability"), tabName: 'availability' },


    ]

    const contracts = [
        { id: 0, name: 'Contract 01' },
        { id: 1, name: 'Contract 02' },
    ]

    useEffect(() => {
        AXIOS.service(EmployeeContractApiUrl + '/create', 'GET')
            .then((result) => {
                if (result?.success) {
                    setEmployeeContractOptions(result.data)
                } else {
                    // setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    return (
        <div>
            {popupOpen && <AddContractPopup
                onConfirm={() => setOpenPopup(false)}
                onHide={() => setOpenPopup(false)}
                employeeContractOptions={employeeContractOptions}
            ></AddContractPopup>}

            <div className="col-md-12 row m-0 pb-1 pt-4 px-4 border-bottom">
                <img className="employee-icon rounded-circle mx-2 " src={EmployeeIcon}></img>
                <div className="width-22 px-2">
                    <p className="mb-1 font-22">Employee - 01</p>
                    <p className="text-secondary font-18">Normal employee</p>
                </div>
                <div className="width-22 px-2">
                    <p className="mb-1"><img className="mr-2" src={PhoneIcon}></img>1234567890</p>
                    <p className="mb-1"><img className="mr-2" src={EmailIcon}></img> employee@gmail.com</p>
                </div>
                <div className="width-22 px-2">
                    <p className="mb-1"><img className="mr-2" src={RSZIcon}></img> 9887428392932</p>
                </div>
            </div>
            <div className="col-md-12 p-0 employee-detail">
                <Tabs onSelect={() => setEditStatus(false)}>
                    <TabList>
                        {TabsData.map((val) => {
                            return (
                                <Tab key={val.tabName} >{val.tabHeading}</Tab> //selectedClassName="selected_emp_tab"
                            )
                        })}
                    </TabList>
                    <TabPanel>
                        <div className="customscroll employee-detail-height py-3 px-0 border m-3">
                            {!editStatus && <img className="float-right pr-3 pt-0" src={EditIcon} onClick={() => setEditStatus(true)}></img>}
                            <EmployeeUpdate tab="tab1" edit={editStatus} setEditStatus={setEditStatus}></EmployeeUpdate>
                        </div>
                    </TabPanel>

                    <TabPanel>

                        <div className="customscroll employee-detail-height py-3 px-0 border m-3">
                            <div className="d-flex">
                                <CustomButton buttonName={'Create'} ActionFunction={() => setOpenPopup(true)} CustomStyle="mx-3 mb-2"></CustomButton>
                                <Switch label="Past contracts" id="switch4" styleClass="col-md-5 align-self-center row m-0" ></Switch>
                            </div>
                            {contracts.map((contract, index) => {
                                return (
                                    <div className="border shadow-sm rounded mx-3 px-2 my-2" key={contract.id}>
                                        <div className={"d-flex mx-4 mb-0 justify-content-between" + (toggleOpen === contract.id ? " border-bottom mb-2" : "")}><h5 className="pt-1">{"Contract " + (index + 1)}</h5><img className="shortcut-icon" src={DownArrow} onClick={() => setToggleOpen(toggleOpen === contract.id ? "" : contract.id)}></img></div>
                                        {!editStatus && toggleOpen === contract.id && <>
                                            <img className="float-right pr-5 pt-2" src={EditIcon} onClick={() => setEditStatus(true)}></img>
                                            <img className="float-right profile-icon pr-2 pb-2" src={DeleteIcon} onClick={() => console.log()}></img>
                                        </>}
                                        {toggleOpen === contract.id && <EmployeeUpdate tab="tab2" edit={editStatus} setEditStatus={setEditStatus}></EmployeeUpdate>}
                                    </div>
                                )
                            })}
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className="customscroll employee-detail-height py-3 px-0 border m-3">
                            <div className="border mx-3 px-2">
                                <div className={"d-flex mx-4 my-1 mb-0 justify-content-between" + (toggleOpen ? " border-bottom mb-2" : "")}><h4 className="pt-2">Holidays counter</h4><img className="profile-icon" src={DownArrow} onClick={() => setToggleOpen(!toggleOpen)}></img></div>
                                {!editStatus && toggleOpen && <img className="float-right pr-5 pt-2" src={EditIcon} onClick={() => setEditStatus(true)}></img>}
                                {toggleOpen && <EmployeeUpdate tab="tab3" edit={editStatus} setEditStatus={setEditStatus}></EmployeeUpdate>}
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className="customscroll employee-detail-height py-3 px-0 border m-3">
                            {!editStatus && <img className="float-right pr-3 pt-0" src={EditIcon} onClick={() => setEditStatus(true)}></img>}
                            <EmployeeUpdate tab="tab4" edit={editStatus} setEditStatus={setEditStatus}></EmployeeUpdate>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className="customscroll employee-detail-height py-3 px-0 border m-3">
                            {<img className="float-right pr-3 pt-0" src={EditIcon} onClick={() => setEditStatus(true)}></img>}
                            <CalendarLayout view={'availability'}></CalendarLayout>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}
