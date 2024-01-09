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
import { EmployeeApiUrl, EmployeeBenefitsApiUrl, EmployeeContractApiUrl, } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import UpdateEmployeeContractDetailsForm from "./UpdateEmployeeContractDetailsForm";
import EmployeeDetailsUpdateForm from "./EmployeeDetailsUpdateForm";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { t } from "../../translations/Translation";

export default function EmployeeDetails({ eid }) {

    const navigate = useNavigate()
    const [editStatus, setEditStatus] = useState(false);
    const [toggleOpen, setToggleOpen] = useState(false);
    const [popupOpen, setOpenPopup] = useState(false);
    const [employeeContractOptions, setEmployeeContractOptions] = useState([]);
    const [basicDetails, setBasicDetails] = useState(
        {
            name: '',
            phone: '',
            email: '',
            rsz: ''
        }
    );
    const [dataLeft, setDataLeft] = useState([]);
    const [dataRight, setDataRight] = useState([])
    const [response, setResponse] = useState({})
    const [showDetails, setShowDetails] = useState(false)
    const [showAddress, setShowAddress] = useState(false)
    const [dataRefresh, setDataRefresh] = useState(false)
    const [showExtraBenifits, setShowExtraBenefits] = useState(false)
    const [exrtraBenefitsLeftData, setExtraBenefitsLefttdata] = useState([])
    const [exrtraBenefitsRightData, setExtraBenefitsRightdata] = useState([])
    const [extraBenefitsData, setExtraBenefitsData] = useState({})
    const [activeContracts, setActiveContracts] = useState([])
    const [expiredContracts, setExpieredContracts] = useState([])
    const [pastContracts, setPastContracts] = useState(false)

    const TabsData = [
        { tabHeading: t("PERSONAL_DETAILS"), tabName: 'personal' },
        { tabHeading: t("CONTRACT_DETAILS"), tabName: 'contracts' },
        { tabHeading: t("COUNTERS"), tabName: 'counters' },
        { tabHeading: t("DOCUMENTS"), tabName: 'documents' },
        { tabHeading: t("EMPLOYEE_AVAILABILITY"), tabName: 'availability' },
        { tabHeading: t("EXTRA_BENEFITS"), tabName: 'extra_benefits' }
    ]

    const tab2Data = [
        { label: t("EMPLOYEE_TYPE"), value: 'Student' },
        { label: t("SUB_TYPE"), value: 'Daily contract' },
        { label: t("START_DATE"), value: '20/04/2023' },
        { label: t("END_DATE"), value: '20/07/2023' },
        // { label: 'Function name', value: 'Chef' },
        // { label: 'Minimum salary', value: '€220.10' },
        // { label: 'Salary to be paid', value: '€235.20' },
        // { label: 'Contract number', value: '12345' },
        // { label: 'Social security number', value: '84071938582' },
        // { label: 'Weekly contract hours', value: '02 days' },
        // { label: 'Work days per week', value: '02 days' },
    ]

    // Employee type data
    const tab3Data = [
        { label: t("EMPLOYEE_TYPE"), value: 'Student' },
        { label: t("EMPLOYEE_CONTRACT_TYPES"), value: 'Daily' }
    ]

    // Counters data
    const tab4Left = [
        { label: t("PUBLIC"), value: '10 days' },
        { label: t("OPTIONAL"), value: '05 days' }
    ]
    const tab4Right = [
        { label: t("TOTAL_TITLE"), value: '100 days' },
        { label: t("USED_TITLE"), value: '40 days' },
        { label: t("REMAINING_TITLE"), value: '60 days' }
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

        AXIOS.service(EmployeeApiUrl + '/' + eid, 'GET')
            .then((result) => {
                if (result?.success) {
                    let basic_details = {
                        name: result.data.first_name + ' ' + result.data.last_name,
                        phone: result.data.phone_number,
                        email: result.data.email,
                        rsz: result.data.social_security_number
                    }
                    setBasicDetails(basic_details)
                    setResponse(result.data)
                    let data_left = [
                        { label: t("FIRST_NAME"), value: result.data.first_name },
                        { label: t("LAST_NAME"), value: result.data.last_name },
                        { label: t("USERNAME"), value: result.data.username },
                        { label: t("MOBILE_NUMBER"), value: result.data.phone_number },
                        { label: t("EMAIL"), value: result.data.email },
                        { label: t("GENDER"), value: result.data.gender?.name },
                        { label: t("DATE_OF_BIRTH"), value: result.data.date_of_birth },
                        { label: t("PLACE_OF_BIRTH"), value: result.data.place_of_birth },
                        { label: t("NATIONALITY"), value: result.data.nationality },
                        { label: t("ADDRESS_TITLE"), value: result.data.street_house_no + ", " + result.data.city + ", " + result.data.country + ", " + result.data.postal_code },

                    ]
                    let data_right = [
                        { label: t("SSN"), value: result.data.social_security_number },
                        { label: t("EXPIRY_DATE"), value: result.data.license_expiry_date },
                        { label: t("BANK_ACCOUNT_NUMBER"), value: result.data.account_number },
                        { label: t("LANGUAGE"), value: result.data.language?.name },
                        { label: t("MARITAL_STATUS"), value: result.data.marital_status?.name },
                        { label: t("DEPENDANT_SPOUSE"), value: result.data.dependent_spouse?.name },
                        { label: t("CHILDREN"), value: result.data.children },
                    ]
                    setDataLeft(data_left);
                    setDataRight(data_right)
                    // setBasicDetails(result.data)

                } else {
                    // setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })

        AXIOS.service(EmployeeContractApiUrl + "/" + eid, 'GET')
            .then((result) => {
                if (result?.success) {
                    setActiveContracts(result.data.active_contracts)
                    setToggleOpen(result.data.active_contracts[0]?.id)
                    setExpieredContracts(result.data.expired_contracts)

                } else {
                    // setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })

        // }, [])
        // EmployeeExtraBenefitsApiUrl
        // call api and set values
        AXIOS.service(EmployeeBenefitsApiUrl + '/' + eid, 'GET')
            .then((result) => {
                if (result?.success) {
                    let benefits = result.data.benefits
                    setExtraBenefitsData(result.data)

                    let data_right = [
                        // { label: 'Social secretary number', value: "12345678901"},
                        // { label: 'Contact number', value: "1239872321" },
                    ]

                    let data_left = [
                        { label: t("SSN"), value: result.data.social_secretary_number },
                        { label: t("CONTRACT_NUMBER"), value: result.data.contract_number },
                        { label: t("COMPANY_CAR"), value: benefits?.company_car ? "Yes" : "No" },
                        { label: t("COMPANY_FUEL_CARD"), value: benefits?.fuel_card ? "Yes" : "No" },
                        { label: t("CLOTHING_COMPENSAT"), value: benefits?.clothing_compensation },
                        { label: t("MEAL_VOUCHER"), value: benefits?.meal_voucher?.name },
                        { label: t("MEAL_VOUCHER_AMOUNT"), value: benefits?.meal_voucher?.amount_formatted },
                    ]
                    setExtraBenefitsLefttdata(data_left)
                    setExtraBenefitsRightdata(data_right)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [eid, dataRefresh, pastContracts])

    //to handle switch
    const onChange = () => {
        setPastContracts(!pastContracts)
        setEditStatus(false)
    }

    const deleteContract = (contractId) => {
        AXIOS.service(EmployeeContractApiUrl + "/" + contractId, 'DELETE')
            .then((result) => {
                if (result?.success) {
                    setDataRefresh(!dataRefresh)
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
        <div>
            {popupOpen && <AddContractPopup
                // onConfirm={() => setOpenPopup(false)}
                onHide={() => setOpenPopup(false)}
                employeeContractOptions={employeeContractOptions}
                eid={eid}
                setOpenPopup={setOpenPopup}
                setDataRefresh={setDataRefresh}
                dataRefresh={dataRefresh}
            ></AddContractPopup>}

            <div className="col-md-12 row m-0 pb-1 pt-4 px-4 border-bottom">
             
                    <div className="manage_employee_tabs d-flex px-2 align-items-center">
                        <img className="employee-icon rounded-circle mx-2 " src={EmployeeIcon} alt={t("ICON")}></img>
                        <p className="mb-1 font-22">{basicDetails.name}</p>
                        <p className="text-secondary font-18"></p>
                    </div>
             
                <div className="manage_employee_tabs px-2">
                    <p className="mb-1"><img className="mr-2" src={PhoneIcon}></img>{basicDetails.phone}</p>
                    <p className="mb-1"><img className="mr-2" src={EmailIcon}></img> {basicDetails.email}</p>
                </div>
                <div className="manage_employee_tabs px-2">
                    <p className="mb-1"><img className="mr-2" src={RSZIcon}></img>{basicDetails.rsz}</p>
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
                            {!editStatus && <img className="float-right pr-3 pt-0 pointer mt-3" src={EditIcon} onClick={() => setShowDetails(true)} alt={t("EDIT")} title={t("EDIT")} />}
                            {!showDetails && <EmployeeUpdate tab="tab1" edit={editStatus} setEditStatus={setEditStatus} dataLeft={dataLeft} dataRight={dataRight} setDataLeft={setDataLeft} setDataRight={setDataRight} setShowDetails={setShowDetails} ></EmployeeUpdate>}
                            {showDetails && <EmployeeDetailsUpdateForm tab="tab1" eid={eid} response={response} setShowAddress={setShowAddress} setShowDetails={setShowDetails} showAddress={showAddress} showDetails={showDetails} setDataRefresh={setDataRefresh} dataRefresh={dataRefresh} showExtraBenifits={showExtraBenifits} setShowExtraBenefits={setShowExtraBenefits}></EmployeeDetailsUpdateForm>}
                        </div>
                    </TabPanel>

                    <TabPanel>

                        <div className="customscroll employee-detail-height py-3 px-0 border m-3">
                            <div className="d-flex">
                                <CustomButton buttonName={t("CREATE")} ActionFunction={() => setOpenPopup(true)} CustomStyle="mx-3 mb-2"></CustomButton>
                                <CustomButton buttonName={'Oth plans'} ActionFunction={() => navigate("/oth-planning/" + eid)} CustomStyle="mx-3 mb-2"></CustomButton>
                                <Switch label={t("PAST_CONTRACTS")} id="switch4" styleClass="col-md-5 align-self-center row m-0" onChange={onChange} ></Switch>
                            </div>
                            {(pastContracts ? expiredContracts : activeContracts)?.map((contract, index) => {
                                return (
                                    <div className="border shadow-sm rounded mx-3 px-2 my-2" key={contract.id}>
                                        <div className={"d-flex mx-4 mb-0 justify-content-between" + (toggleOpen === contract.id ? " border-bottom mb-2" : "")}><h5 className="pt-1">{"Contract " + (index + 1)}</h5><img className="shortcut-icon" src={DownArrow} onClick={() => { setToggleOpen(toggleOpen === contract.id ? "" : contract.id); setEditStatus(false) }}></img></div>
                                        {!editStatus && toggleOpen === contract.id && <>
                                            <img className="float-right pr-5 pt-2 pointer" src={EditIcon} onClick={() => setEditStatus(true)} alt={t("EDIT")} title={t("EDIT")} />
                                            <img className="float-right profile-icon pr-2 pb-2 pointer" src={DeleteIcon} onClick={() => deleteContract(contract.id)} alt={t("DELETE")} title={t("DELETE")} />
                                        </>}
                                        {/* {toggleOpen === contract.id && <EmployeeUpdate tab="tab2" edit={editStatus} setEditStatus={setEditStatus} dataLeft={tab2Data} dataRight={[]} setDataLeft={setDataLeft} setDataRight={setDataRight} ></EmployeeUpdate>} */}
                                        {toggleOpen === contract.id && <UpdateEmployeeContractDetailsForm eid={eid} edit={editStatus} setEditStatus={setEditStatus} data={contract} employeeContractOptions={employeeContractOptions} setToggleOpen={setToggleOpen} toggleOpen={toggleOpen} dataRefresh={dataRefresh} setDataRefresh={setDataRefresh} ></UpdateEmployeeContractDetailsForm>}
                                    </div>
                                )
                            })}
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className="customscroll employee-detail-height py-3 px-0 border m-3">
                            <div className="border mx-3 px-2">
                                <div className={"d-flex mx-4 my-1 mb-0 justify-content-between" + (toggleOpen ? " border-bottom mb-2" : "")}><h4 className="pt-2">{t("HOLIDAY_COUNTER")}</h4><img className="profile-icon" src={DownArrow} onClick={() => setToggleOpen(!toggleOpen)} alt={t("ICON")} /></div>
                                {!editStatus && toggleOpen && <img className="float-right pr-5 pt-2 pointer" src={EditIcon} onClick={() => setEditStatus(true)} alt={t("EDIT")} title={t("EDIT")} />}
                                {toggleOpen && <EmployeeUpdate tab="tab3" edit={editStatus} setEditStatus={setEditStatus} dataLeft={tab3Data} dataRight={[]} setDataLeft={setDataLeft} setDataRight={setDataRight} ></EmployeeUpdate>}
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className="customscroll employee-detail-height px-0 border m-3">
                            <EmployeeUpdate tab="tab4" edit={editStatus} setEditStatus={setEditStatus} dataLeft={tab4Left} dataRight={tab4Right} setDataLeft={setDataLeft} setDataRight={setDataRight}></EmployeeUpdate>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className="customscroll employee-detail-height py-3 px-0 border m-3">
                            {<img className="float-right pr-3 pt-0 pointer" src={EditIcon} onClick={() => setEditStatus(true)} alt={t("EDIT")} title={t("EDIT")} />}
                            <CalendarLayout view={'availability'} eid={eid}></CalendarLayout>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="customscroll employee-detail-height py-3 px-0 border m-3">
                            {!editStatus && <img className="float-right pr-3 pt-0 pointer" src={EditIcon} onClick={() => { setShowExtraBenefits(true); setShowDetails(false); setShowAddress(false) }} alt={t("EDIT")} title={t("EDIT")}></img>}
                            {!showExtraBenifits && <EmployeeUpdate tab="tab2" edit={editStatus} setEditStatus={setEditStatus} dataLeft={exrtraBenefitsLeftData} dataRight={exrtraBenefitsRightData} setDataLeft={setDataLeft} setDataRight={setDataRight} setShowDetails={setShowDetails}></EmployeeUpdate>}
                            {showExtraBenifits && <EmployeeDetailsUpdateForm tab="tab6" eid={eid} response={extraBenefitsData} setShowAddress={setShowAddress} setShowDetails={setShowDetails} showAddress={showAddress} showDetails={showDetails} setDataRefresh={setDataRefresh} dataRefresh={dataRefresh} showExtraBenifits={showExtraBenifits} setShowExtraBenefits={setShowExtraBenefits} ></EmployeeDetailsUpdateForm>}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}
