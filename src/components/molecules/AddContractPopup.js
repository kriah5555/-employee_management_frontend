import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AddEmployeeContractTypes from "./AddEmployeeContractTypes";
import AddEmployeeFunctionSalaries from "./AddEmployeeFunctionSalaries";
import { EmployeeContractApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { useNavigate, useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { t } from "../../translations/Translation";
import CustomButton from "../atoms/CustomButton";
import { toast } from 'react-toastify';
export default function AddContractPopup(props) {

    const [displaySubType, setDisplaySubType] = useState(false);
    const [selectedEmpTypeCategory, setSelectedEmpTypeCategory] = useState();
    const [tabIndex, setTabIndex] = useState(0);
    const [functionSalaries, setFunctionSalaries] = useState([{ 'function_id': '', 'salary': '', 'experience': '' }]);
    const [functions, setFunctions] = useState([]);


    // Tabs data array for super admin
    const TabsData = [
        { tabHeading: t("EMPLOYEE_CONTRACT_TYPE"), tabName: 'employee_contract_type' },
        { tabHeading: t("FUNCTION_SALARIES"), tabName: 'function_salaries' },
    ]

    const [employeeContracts, setEmployeeContracts] = useState(
        {
            "employee_type_id": '',
            "sub_type": "",
            "schedule_type": "",
            "employment_type": "",
            "start_date": "",
            "end_date": "",
            "weekly_contract_hours": "",
            "work_days_per_week": ''
        }
    )

    const onConfirm = () => {

        let url = EmployeeContractApiUrl
        let data = {
            "employee_profile_id": props.eid,
            "employee_contract_details": employeeContracts,
            "employee_function_details": functionSalaries
        }

        AXIOS.service(url, "POST", data)
            .then((result) => {
                if (result?.success) {
                    props.setDataRefresh(!props.dataRefresh)
                    props.setOpenPopup(false)
                    toast.success(result.message[0], {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <Modal
            show={true}
            onHide={props.onHide}
            size="xl"
            className=""
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t('CREATE_CONTRACT')}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className="popup-tabs border">
                    <Tabs onSelect={() => setTabIndex(false)}>
                        <TabList>
                            {TabsData.map((val) => {
                                return (
                                    <Tab key={val.tabName} >{val.tabHeading}</Tab>
                                )
                            })}
                        </TabList>
                        <TabPanel>
                            <div className="">
                                <AddEmployeeContractTypes
                                    setEmployeeContracts={setEmployeeContracts} employeeContracts={employeeContracts}
                                    displaySubType={displaySubType} setDisplaySubType={setDisplaySubType}
                                    selectedEmpTypeCategory={selectedEmpTypeCategory} setSelectedEmpTypeCategory={setSelectedEmpTypeCategory}
                                    tabIndex={tabIndex} options={props.employeeContractOptions}
                                ></AddEmployeeContractTypes>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="">
                                <AddEmployeeFunctionSalaries    
                                    tabIndex={2}
                                    functionSalaries={functionSalaries} setFunctionSalaries={setFunctionSalaries}
                                    functions={functions} setFunctions={setFunctions}
                                    options={props.employeeContractOptions}
                                    employeeContracts={employeeContracts}
                                ></AddEmployeeFunctionSalaries>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </Modal.Body>
            <Modal.Footer>
                 <Button className='button-style float-left' onClick={() =>onConfirm()}>
                    {t("SAVE")}
                </Button>
                <Button className='button-style' onClick={props.onHide}>
                    {props.buttonName ? (props.buttonName) : t("CANCEL")}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
