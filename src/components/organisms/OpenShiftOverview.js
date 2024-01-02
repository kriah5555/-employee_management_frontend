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
import { toast } from 'react-toastify';
import ErrorPopup from "../../utilities/popup/ErrorPopup";



export default function OpenShiftOverview({ setHeaderCompanyDropdown }) {

    const navigate = useNavigate();
    const [popupOpen, setOpenPopup] = useState(false);
    const [draftedShiftList, setDraftedShiftsList] = useState([]);
    const [activeShiftList, setActiveShiftList] = useState([]);
    const [deletedShiftList, setDeletedShiftList] = useState([])
    const [showDrafts, setShowDrafts] = useState(false)
    const [refresh, setRefresh] = useState(false);
    const [shiftId, setShiftId] = useState("");
    const [headers, setHeaders] = useState([]);
    const [errors, setErrors] = useState([]);
    const [filter, setFilter] = useState({
        "start_date": "",
        "location": "",
        "function": "",
    });

    const draftHeaders = [
        {
            title: "Tittle",
            field: "name",
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
            field: "repeat_title",
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

    useEffect(() => {
        showDrafts ? setHeaders(draftHeaders) : setHeaders(activeHeaders)
    }, [showDrafts])

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

    const OnHide = () => {
        setShiftId("");
        setOpenPopup(false)
    }

    const deleteShift = (id) => {

        AXIOS.service(OpenShiftApiUrl + "/" + id, 'DELETE',)
            .then((result) => {
                if (result?.success) {
                    setRefresh(!refresh)
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
                } else {

                    setErrors([result.message[0]])
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Function for onclick of actions in the overview tables
    const viewAction = (data, action) => {
        if (action === 'delete') {
            // setWarningMessage('Are you sure you want to delete this item?')
        }
        if (action === 'edit') {
            setShiftId(data.id)
            setOpenPopup(true)
        } else if (action === 'view') {
            setShiftId(data.id)
            navigate('/manage-plannings/open-shift-view/' + data.id)
        } else {
            deleteShift(data.id)
        }

    }

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
                            item.id = item.vacancy_id
                            item.filled_position = item.responded + "/" + item.vacancy_count
                            active.push(item)
                        } else if (item.status == 2) {
                            item.id = item.vacancy_id
                            drafts.push(item)
                        } else if (item.status == 0) {
                            item.id = item.vacancy_id
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

    return (
        <div className="mt-1">
            {popupOpen && <AddOpenShift
                // onConfirm={() => setOpenPopup(false)}
                onHide={() => OnHide()}
                setOpenPopup={setOpenPopup}
                setHeaderCompanyDropdown={setHeaderCompanyDropdown}
                setRefresh={setRefresh}
                refresh={refresh}
                setShiftId={setShiftId}
                shiftId={shiftId}
            ></AddOpenShift>}
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={('Validation error!')}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            <div className="col-md-12 p-0 bg-white">
                <div className="d-flex">
                    <div className="col-md-10">
                        <Switch label="Drafted" id="switch1" styleClass="col-md-12 align-self-center row m-0 ml-2 mt-4" onChange={onChange} ></Switch>
                    </div>
                    <div className="col-md-2 text-right">
                        <CustomButton buttonName={"create shift"} ActionFunction={() => setOpenPopup(true)} CustomStyle="my-4 mr-2 mt-3"></CustomButton>
                    </div>
                </div>
                <Table columns={headers} rows={showDrafts ? draftedShiftList : activeShiftList} tableName={"open_shifts_overview"} viewAction={viewAction}></Table>
            </div>
        </div>
    )
}   