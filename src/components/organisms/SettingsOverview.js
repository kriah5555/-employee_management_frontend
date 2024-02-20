import React, { useState, useEffect } from "react";
import CustomTable from "../../components/atoms/CustomTable";
import { toast } from 'react-toastify';
import { GenderApiUrl, MaritalStatusApiUrl, MealVoucherApiUrl, CommuteTypesApiUrl, DimonaErrorCodesApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import { t } from "../../translations/Translation";

export default function SettingsOverview({ overviewContent, type, title, setErrors }) {

    const [listData, setListData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    //table headers
    const headers = [
        {
            title: t("TITLE_TEXT"),
            field: 'name',
            size: 200,
        },
        {
            title: t("SORT_ORDER"),
            field: 'sort_order',
            size: 200,
        },
    ];

    const meal_voucher_headers = [
        {
            title: t("TITLE_TEXT"),
            field: 'name',
            size: 200,
        },
        {
            title: t("AMOUNT_TEXT"),
            field: 'amount_formatted',
            size: 200,
        },
        {
            title: t("SORT_ORDER"),
            field: 'sort_order',
            size: 200,
        },
    ]

    const dimona_headers = [
        {
            title: t("ERROR_CODE"),
            field: 'error_code',
            size: 200,
            editable: 'never',
        },
        {
            title: t("DESCRIPTION"),
            field: 'description',
            size: 200,
            editable: 'onUpdate',
        },
    ];

    useEffect(() => {
        // Api to get list of genders and marital status
        let apiUrl;
        if (overviewContent === 'gender') {
            apiUrl = GenderApiUrl
        } else if (overviewContent === 'marital_status') {
            apiUrl = MaritalStatusApiUrl
        } else if (overviewContent === 'meal_vouchers') {
            apiUrl = MealVoucherApiUrl
        } else if (overviewContent === 'commute_types') {
            apiUrl = CommuteTypesApiUrl
        } else {
            apiUrl = DimonaErrorCodesApiUrl
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
        } else if (overviewContent === 'commute_types') {
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
        } else if (overviewContent === 'commute_types') {
            apiUrl = CommuteTypesApiUrl + '/' + newData.id
        } else {
            apiUrl = DimonaErrorCodesApiUrl + '/' + newData.id
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
        } else if (overviewContent === 'commute_types') {
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
            {type !== 'notification' && <CustomTable title={title} columns={overviewContent === 'meal_vouchers' ? meal_voucher_headers : overviewContent === 'dimona_error_codes' ? dimona_headers : headers} rows={listData} setRows={setListData} tableName={overviewContent === 'dimona_error_codes' ? 'dimona_error_codes' : 'function'} height={'calc(100vh - 162px)'} UpdateRow={UpdateRow} CreateRow={CreateRow} DeleteRow={DeleteRow}></CustomTable>}
        </>
    );

}