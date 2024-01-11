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
import { toast } from 'react-toastify';
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { t } from "../../translations/Translation";
import ModalPopup from "../../utilities/popup/Popup";



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
    const [deleteUrl, setDeleteUrl] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [createData, setCreateData] = useState([])


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


    useEffect(() => {
        if (popupOpen) {
            AXIOS.service(OpenShiftApiUrl + '/create', 'GET')
                .then((result) => {
                    if (result?.success) {
                        if (result.data.length !== 0) {
                            setCreateData(result.data)
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [popupOpen])

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


    const deleteShift = () => {

        AXIOS.service(deleteUrl, 'DELETE',)
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
                    setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Function for onclick of actions in the overview tables
    const viewAction = (data, action) => {
        if (action === 'edit') {
            setShiftId(data.id)
            setOpenPopup(true)
        } else if (action === 'view') {
            setShiftId(data.id)
            navigate('/manage-plannings/open-shift-view/' + data.id)
        } else {
            setWarningMessage('Are you sure you want to delete this item?')
            setDeleteUrl(OpenShiftApiUrl + "/" + data.id)
        }

    }

    const OnHides = () => {
        setShiftId("");
        setOpenPopup(false)
    }


    return (
        <div className="mt-1 h-100">
            {popupOpen && <AddOpenShift
                onHide={() => OnHides()}
                shiftId={shiftId}
                createData={createData}
            ></AddOpenShift>}
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={('Validation error!')}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            {warningMessage && <ModalPopup
                title={t("WARNING_TITLE")}
                body={(warningMessage)}
                onConfirm={deleteShift}
                onHide={() => setWarningMessage('')}
                close={true}
            ></ModalPopup>}
            {!popupOpen && <div className="col-md-12 p-0 bg-white">
                <div className="d-flex">
                    <div className="col-md-10">
                        <Switch label={t("DRAFTED")} id="switch4" styleClass="px-3" lableClick={true} onChange={() => setShowDrafts(!showDrafts)} checked={showDrafts} />
                    </div>
                    <div className="col-md-2 text-right">
                        <CustomButton buttonName={"Create shift"} ActionFunction={() => setOpenPopup(true)} CustomStyle="my-2 mr-2"></CustomButton>
                    </div>
                </div>
                <Table columns={headers} rows={showDrafts ? draftedShiftList : activeShiftList} tableName={"open_shifts_overview"} viewAction={viewAction}></Table>
            </div>}
        </div>
    )
}   