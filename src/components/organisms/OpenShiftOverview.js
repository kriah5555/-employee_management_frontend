import React, { useState, useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import FormsNew from "../molecules/FormsNew";
import Table from "../atoms/Table";
import CustomButton from "../atoms/CustomButton";
import AddOpenShift from "../molecules/AddOpenShift";
import { OpenShiftApiUrl } from "../../routes/ApiEndPoints";
import { useNavigate } from "react-router-dom";
import Switch from "../atoms/Switch";
import { Refresh } from "@material-ui/icons";




export default function OpenShiftOverview({ setHeaderCompanyDropdown, showDetails, setShowDetails, setShiftId, shiftId }) {

    const navigate = useNavigate();
    const [popupOpen, setOpenPopup] = useState(false);
    const [draftedShiftList, setDraftedShiftsList] = useState([]);
    const [activeShiftList, setActiveShiftList] = useState([]);
    const [deletedShiftList, setDeletedShiftList] = useState([])
    const [showDrafts, setShowDrafts]=useState(false)
    const [refresh, setRefresh] = useState(false);
    // const [shiftId, setShiftId] = useState();
    const [filter, setFilter] = useState({
        "start_date": "",
        "location": "",
        "function": "",
    });

    const tabList = [
        { tabHeading: ("Active"), tabName: "active" },
        { tabHeading: ("Drafted"), tabName: "drafted" }
    ]

    // table headers
    const tableHeaders = [
        {
            title: "Tittle",
            field: "title",
            status: 200
        },
        {
            title: "Applied by",
            field: "applied_by",
            status: "200",
        },
        {
            title: "Reporting manager",
            field: "reporting_manager",
            status: "200",
        },
        {
            title: "Leave dates",
            field: "leave_date",
            status: "200",
        }
    ]

    const draftHeaders = [
        {
            title: "Tittle",
            field: "title",
            status: 200
        },
        {
            title: "Start date",
            field: "start_date",
            status: "200",
        },
        {
            title: "Vacancy",
            field: "vacancy_count",
            status: "200",
        },
        {
            title: "Function name",
            field: "function_name",
            status: "200",
        },
        {
            title: "Repeat type",
            field: "repeat_type",
            status: "200",
        }
    ]

    const activeHeaders = [
        {
            title: "Shift name",
            field: "name",
            status: 200
        },
        {
            title: "Start date",
            field: "start_date",
            status: "200",
        },
        {
            title: "Function name",
            field: "function_name",
            status: "200",
        },
        {
            title: "Location",
            field: "location_name",
            status: "200",
        },
        {
            title: "Applied",
            field: "applied",
            status: "200",
        },
        {
            title: "filled positions",
            field: "filled_position",
            status: "200",
        },

    ]

    const hidingHeaders = [
        {
            title: 'Search',
            field: 'name',
            size: 100,
        }
    ]

    const [headers, setHeaders] = useState([])


    //dummy row data
    const row = [
        // { title: "Requested on 13th", applied_date: "07-11-2023", applied_by: "sunil", reporting_manager: "vishal", leave_date: "13-11-2023", id: 1, role: "employee" },
        // { title: "Requested on", applied_date: "08-11-2023", applied_by: "laxmi", reporting_manager: "deepa", leave_date: "14-11-2023", id: 2, role: "employee" },
        // { title: "Requested on", applied_date: "06-11-2023", applied_by: "hemant", reporting_manager: "shyam", leave_date: "14-11-2023", id: 3, role: "employee" }
    ]
    //fiedl for filter data
    const filterDataFields = [
        { title: "Start date", name: "start_date", placeholder: "Select date", required: false, type: "date", style: "col-md-4 float-left" },
        { title: "Location", name: "location", placeholder: "location", required: false, type: "text", style: "col-md-4 float-left" },
        { title: "Function", name: "functions", placeholder: "function", required: false, type: "text", style: "col-md-4 float-left" },
    ]

    //to handle switch
    const onChange = () => {

        setShowDrafts(!showDrafts)
    }

    //setting values
    const setValues = (index, name, value, type) => {

    }

    //function to filter
    const onApplyFilter = () => {

    }

    const OnSave = () => {

    }

    // Function for onclick of actions in the overview tables
    const viewAction = (data, action) => {
        if (action === 'delete') {
            // setWarningMessage('Are you sure you want to delete this item?')
        }
        if (action === 'edit') {
            setShiftId(data.id)
            setOpenPopup(true)
            setShiftId(data.id)
        } else if (action === 'view') {
            setShowDetails(true)
            setShiftId(data.id)
            // navigate('/manage-plannings/open-shift-view/' + data.id)
        } else {
            // setDeleteUrl(HolidayCodeApiUrl + '/' + data.id)
        }

    }

    useEffect(() => {
        if (showDetails) {
            setHeaders(hidingHeaders);
        } else {
            setHeaders(activeHeaders);
        }

    }, [showDetails])

    useEffect(() => {

        //to get all vacancies and seggrigating
        AXIOS.service(OpenShiftApiUrl, "GET")
            .then((result) => {
                if (result?.success) {
                    let drafts = []
                    let active = []
                    let deleted = []
                    result.data.map((item, i) => {
                        if (item.status == 1) {
                            item.id = i
                            item.name = getOpenShiftWithOnclickFunction("open shift" + " " + (i + 1), item.repeat_type, i)//replace i with actual id
                            item.filled_position = item.responded + "/" + item.vacancy_count
                            active.push(item)
                        } else if (item.status == 2) {
                            item.id = i
                            item.name = getOpenShiftWithOnclickFunction("open shift" + " " + (i + 1), item.repeat_type, i)//replace i with actual id
                            drafts.push(item)
                        } else if (item.status == 0) {
                            item.id = i
                            item.name = getOpenShiftWithOnclickFunction("open shift" + " " + (i + 1), item.repeat_type, i)//replace i with actual id
                            deleted.push(item)
                        }

                    })

                    setDraftedShiftsList(drafts)
                    setActiveShiftList(active)
                    setDeletedShiftList(deleted)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [refresh])


    const showOpenShiftDetails = (id) => {
        setShowDetails(true);
        setShiftId(id)
        console.log(id);
    }

    //Function to render open shifts with show details function 
    const getOpenShiftWithOnclickFunction = (name, repeat_type, id) => {
        return (
            <div key={id} className="row m-0" onClick={() => showOpenShiftDetails(id)}>
                {/* {!showDetails && <div><img className="employee-icon mr-2 rounded-circle" src={EmployeeIcon}></img></div>} */}
                <div><h6 className="mb-0 font-inherit">{name}</h6><p className="mb-0 mt-1 font-12 text-secondary">{repeat_type}</p></div>
            </div>
        )
    }

    return (
        <div className="mt-1">
            {popupOpen && <AddOpenShift
                // onConfirm={() => setOpenPopup(false)}
                onHide={() => setOpenPopup(false)}
                setOpenPopup={setOpenPopup}
                setHeaderCompanyDropdown={setHeaderCompanyDropdown}
                setRefresh={setRefresh}
                refresh={refresh}
                setShiftId={setShiftId}
                shiftId={shiftId}
            ></AddOpenShift>}
            <div className="col-md-12 p-0 bg-white">
                {!showDetails && <> <div className="d-flex">
                    <div className="col-md-8">
                        <div className="d-flex border-top container-fluid pt-2">
                            <FormsNew
                                view="filters"
                                formTitle={''}
                                formattedData={filter}
                                data={filterDataFields}
                                SetValues={setValues}
                            ></FormsNew>
                            <div className="">
                                <CustomButton buttonName={"Apply"} ActionFunction={() => onApplyFilter()} CustomStyle="my-4 mr-2"></CustomButton>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-2">
                        <Switch label="Drafted" id="switch4" styleClass="col-md-12 align-self-center row m-0 ml-2 mt-4" onChange={onChange} ></Switch>
                    </div>
                    <div className="col-md-2 text-right">
                        <CustomButton buttonName={"create shift"} ActionFunction={() => setOpenPopup(true)} CustomStyle="my-4 mr-2 mt-3"></CustomButton>
                    </div>
                </div></>}
                {!showDetails && <Table columns={headers} rows={showDrafts?draftedShiftList:deletedShiftList} tableName={"open_shifts_overview"} viewAction={viewAction}></Table>}
                {showDetails && <Table columns={headers} rows={showDrafts?draftedShiftList:deletedShiftList} tableName={"open_shifts_overview"} showDetails={showDetails}></Table>}
            </div>
        </div>
    )
}   