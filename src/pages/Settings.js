import React, { useEffect, useState } from "react";
import EmployeeTypeIcon from "../static/icons/EmployeeType.png";
import NotificationIcon from "../static/icons/notifications.png";
import { t } from "../translations/Translation";
import CustomTable from "../components/atoms/CustomTable";
import { GenderApiUrl, MaritalSttausApiUrl } from "../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../services/AxiosServices";
import { ToastContainer, toast } from 'react-toastify';
import ErrorPopup from "../utilities/popup/ErrorPopup";

export default function Settings() {

    const subTabStyle = "col-md-3 my-3 mx-3 shadow text-center border-0";

    const [overviewContent, setOverviewContent] = useState('gender')
    const [listData, setListData] = useState([]);
    const [title, setTitle] = useState(('Manage Genders'));

    const [refresh, setRefresh] = useState(false);

    const [errors, setErrors] = useState([]);

    const headers = [
        {
            title: 'Title',
            field: 'name',
            size: 200,
        },
        {
            title: 'Sort order',
            field: 'sort_order',
            size: 200,
        },
    ];

     // settings page data
     const settingTabs = [
        { title: t('GENDER'), icon: EmployeeTypeIcon, styleClass: subTabStyle, url: '', type: 'gender' },
        { title: t('MARITAL_STATUS'), icon: EmployeeTypeIcon, styleClass: subTabStyle, url: '', type: 'marital_status' },
    ]


    useEffect(() => {
        // Api to get list of genders and marital status
        let apiUrl;
        if (overviewContent === 'gender') {
            apiUrl = GenderApiUrl
        } else {
            apiUrl = MaritalSttausApiUrl
        }
        AXIOS.service(apiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    setListData(result.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [overviewContent, refresh])


    // Function to call API on adding new row
    const CreateRow = (newData) => {
        console.log(newData);
        let apiUrl;
        if (overviewContent === 'gender') {
            apiUrl = GenderApiUrl 
        } else {
            apiUrl = MaritalSttausApiUrl 
        }

        AXIOS.service(apiUrl, 'POST', newData)
            .then((result) => {
                if (result?.success) {
                    setRefresh(!refresh);
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
                } else {
                    setErrors(result.message[0])
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Function to call API on editing the row
    const UpdateRow = (newData) => {
        console.log(newData);
        let apiUrl;
        if (overviewContent === 'gender') {
            apiUrl = GenderApiUrl + '/' + newData.id
        } else {
            apiUrl = MaritalSttausApiUrl + '/' + newData.id
        }

        AXIOS.service(apiUrl, 'PUT', newData)
            .then((result) => {
                if (result?.success) {
                    setRefresh(!refresh);
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
                } else {
                    setErrors(result.message[0])
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Function to call API on deleting the row
    const DeleteRow = (newData) => {
        console.log(newData);
        let apiUrl;
        if (overviewContent === 'gender') {
            apiUrl = GenderApiUrl + '/' + newData.id
        } else {
            apiUrl = MaritalSttausApiUrl + '/' + newData.id
        }

        AXIOS.service(apiUrl, 'DELETE')
            .then((result) => {
                if (result?.success) {
                    setRefresh(!refresh);
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
                } else {
                    setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

   


    return (
        <div className="right-container p-3" >
            <div className="col-md-3 bg-white border-right">
                <h2 className="text-center my-4 text-color">Configurations</h2>
                <ul className="p-0 mt-2">
                    {
                        settingTabs.map((val) => {
                            return (
                                <li
                                    key={val.title}
                                    className="list-group-item border-bottom-only"
                                    id={overviewContent === val.type ? "text-indii-dark-blue" : ''}
                                    onClick={() => { setOverviewContent(val.type); setTitle('Manage ' + val.title) }}>
                                    <img className="shortcut-icon" src={val.icon}></img>
                                    {val.title}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="col-md-9 bg-white">
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                {errors !== undefined && errors.length !== 0 && <ErrorPopup
                    title={('Validation error!')}
                    body={(errors)}
                    onHide={() => setErrors([])}
                ></ErrorPopup>}
                {/* <p>Notification</p> */}
                {/* <div><ConfigurationOverviews overviewContent={overviewContent}></ConfigurationOverviews></div> */}
                <CustomTable title={title} columns={headers} rows={listData} setRows={setListData} tableName={'function'} height={'calc(100vh - 162px)'} UpdateRow={UpdateRow} CreateRow={CreateRow} DeleteRow={DeleteRow}></CustomTable>

            </div>
        </div>
    )
}
