import React, { useState } from "react";
import EmployeeIcon from "../../static/icons/Profile1.jpeg"
import PhoneIcon from "../../static/icons/phone.svg"
import EmailIcon from "../../static/icons/Email.svg"
import EditIcon from "../../static/icons/edit-dark.svg"
import RSZIcon from "../../static/icons/ID.svg"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import EmployeeUpdate from "./EmployeeUpdate";
import CalendarLayout from "../../utilities/calendar/CalendarLayout";

export default function EmployeeDetails() {

    const [editStatus, setEditStatus] = useState(false);

    const TabsData = [
        { tabHeading: ("Personal details"), tabName: 'personal' },
        { tabHeading: ("Functions & Salaries"), tabName: 'functions_salaries' },
        { tabHeading: ("Employee type"), tabName: 'emp_type' },
        { tabHeading: ("Counters"), tabName: 'counters' },
        { tabHeading: ("Availability"), tabName: 'availability' },
    ]


    return (
        <div>
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
                            {!editStatus && <img className="float-right pr-3 pt-0" src={EditIcon} onClick={() => setEditStatus(true)}></img>}
                            <EmployeeUpdate tab="tab2" edit={editStatus} setEditStatus={setEditStatus}></EmployeeUpdate>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className="customscroll employee-detail-height py-3 px-0 border m-3">
                            {!editStatus && <img className="float-right pr-3 pt-0" src={EditIcon} onClick={() => setEditStatus(true)}></img>}
                            <EmployeeUpdate tab="tab3" edit={editStatus} setEditStatus={setEditStatus}></EmployeeUpdate>
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
                            <CalendarLayout></CalendarLayout>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}
