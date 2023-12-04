import React, { useState, useEffect } from "react";
import CustomTable from "../../components/atoms/CustomTable";
import { ToastContainer, toast } from 'react-toastify';
import { GenderApiUrl, MaritalStatusApiUrl, MealVoucherApiUrl, CommuteTypesApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices";


export default function SettingsOverview({ overviewContent, type, title, setErrors }) {

    const [listData, setListData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    //table headers
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

    const meal_voucher_headers = [
        {
            title: 'Title',
            field: 'name',
            size: 200,
        },
        {
            title: 'Amount',
            field: 'amount_formatted',
            size: 200,
        },
        {
            title: 'Sort order',
            field: 'sort_order',
            size: 200,
        },
    ]

    useEffect(() => {
        // Api to get list of genders and marital status
        let apiUrl;
        if (overviewContent === 'gender') {
            apiUrl = GenderApiUrl
        } else if (overviewContent === 'marital_status') {
            apiUrl = MaritalStatusApiUrl
        } else if (overviewContent === 'meal_vouchers') {
            apiUrl = MealVoucherApiUrl
        } else {
            apiUrl = CommuteTypesApiUrl
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
        let apiUrl;
        if (overviewContent === 'gender') {
            apiUrl = GenderApiUrl
        } else if (overviewContent === 'marital_status') {
            apiUrl = MaritalStatusApiUrl
        } else if (overviewContent === 'meal_vouchers') {
            apiUrl = MealVoucherApiUrl
            newData['amount'] = newData.amount_formatted
        } else {
            apiUrl = CommuteTypesApiUrl
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
                    setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Function to call API on editing the row
    const UpdateRow = (newData) => {
        let apiUrl;
        if (overviewContent === 'gender') {
            apiUrl = GenderApiUrl + '/' + newData.id
        } else if (overviewContent === 'marital_status') {
            apiUrl = MaritalStatusApiUrl + '/' + newData.id
        } else if (overviewContent === 'meal_vouchers') {
            apiUrl = MealVoucherApiUrl + '/' + newData.id
            newData['amount'] = newData.amount_formatted
        } else {
            apiUrl = CommuteTypesApiUrl + '/' + newData.id
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
                    setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Function to call API on deleting the row
    const DeleteRow = (newData) => {
        let apiUrl;
        if (overviewContent === 'gender') {
            apiUrl = GenderApiUrl + '/' + newData.id
        } else if (overviewContent === 'marital_status') {
            apiUrl = MaritalStatusApiUrl + '/' + newData.id
        } else if (overviewContent === 'meal_vouchers') {
            apiUrl = MealVoucherApiUrl + '/' + newData.id
        } else {
            apiUrl = CommuteTypesApiUrl + '/' + newData.id
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
        <>
            {type !== 'notification' && <CustomTable title={title} columns={overviewContent === 'meal_vouchers' ? meal_voucher_headers : headers} rows={listData} setRows={setListData} tableName={'function'} height={'calc(100vh - 162px)'} UpdateRow={UpdateRow} CreateRow={CreateRow} DeleteRow={DeleteRow}></CustomTable>}
        </>
    );

}