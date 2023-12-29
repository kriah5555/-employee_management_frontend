import React, { useEffect, useState } from "react";
import Table from "../atoms/Table";
import { useNavigate } from "react-router-dom";
import { SectorApiUrl, MonthlyMinimumSalariesApiurl, HourlyMinimumSalariesApiurl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import TextInput from "../atoms/formFields/TextInput";
import Dropdown from "../atoms/Dropdown";
import CustomButton from "../atoms/CustomButton";
import BackIcon from "../../static/icons/BackIcon.png";
import TextField from '@material-ui/core/TextField';
import { MTableEditField } from 'material-table';
import ModalPopup from "../../utilities/popup/Popup";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { ToastContainer, toast } from 'react-toastify';
import { t } from "../../translations/Translation";

export default function ManageSalaries() {

    const navigate = useNavigate();
    const [selectedSector, setSelectedSector] = useState('');
    const [noSectorMessage, setNoSectorMessage] = useState(t("SELECT_SECTOR_SALARY_TYPE"));
    const [salaryData, setSalaryData] = useState([]);


    const [headers, setHeaders] = useState();
    const [listData, setListData] = useState([]);
    const [title, setTitle] = useState(t("MANAGE_MINIMUM_SALARIES"));
    const [sectors, setSectors] = useState([])
    const [incrementPage, setIncrementPage] = useState(false)
    const [coefficient, setCoefficient] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [errors, setErrors] = useState([]);
    const [salaryType, setSalaryType] = useState("");
    const [tempData, setTempData] = useState([])
    const [tempHeader, setTempHeader] = useState([])
    // Input field from material table package for editing data in bulk
    const CustomInput = (props) => {
        return (
            <MTableEditField
                value={props.value}
                onChange={props.onChange}
                columnDef={props.columnDef}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                />
            </MTableEditField>
        );
    };

    // Header data for Salaries overview
    const salary_header = [
        {
            title: t("LEVEL"),
            field: 'level',
            editable: 'never',
            size: 500,
        }
    ];

    const salaryTypeOptions = [
        {
            value: 1,
            label: t("MONTHLY")
        },
        {
            value: 2,
            label: t("HOURLY")
        }
    ]


    useEffect(() => {
        if (selectedSector && salaryType && !incrementPage) {
            // Initial API call to fetch salaries and levels
            let ApiUrl = salaryType.value == 1 ? MonthlyMinimumSalariesApiurl : HourlyMinimumSalariesApiurl
            AXIOS.service(ApiUrl + '/' + selectedSector.value + '/get')
                .then((result) => {
                    if (result.data.levels) {
                        let categories = new Array(result.data.categories).fill(1);
                        let salary_data = result.data.salaries
                        let header_arr = [...salary_header];
                        let emptySalary = []
                        // Set headers
                        categories.map((cat, i) => {
                            let header = {
                                title: 'Category ' + (i + 1),
                                field: 'cat' + (i + 1),
                                size: 200,
                                editComponent: CustomInput
                            }
                            header_arr.push(header);
                        })
                        // setHeaders(header_arr);
                        setTempHeader(header_arr)

                        // Set salaries data
                        salary_data.map((val, i) => {
                            val['id'] = i + 1;
                            emptySalary.push(val);
                        })

                        // setListData(emptySalary);
                        setTempData(emptySalary)
                        setSalaryData(emptySalary)
                    }
                })
        }
    }, [selectedSector.value, salaryType.value, incrementPage])


    useEffect(() => {
        // setListData(salaryData);

        // Api call to get sector list data
        AXIOS.service(SectorApiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    if (sectors.length === 0) {
                        result.data.map((val, index) => {
                            sectors.push({ value: val.id, label: val.name })
                        })
                    }
                } else {
                    setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }, [])

    // Function to update to salary increment page
    const getIncrementPage = (val) => {
        setIncrementPage(val);
        // If increment page
        if (val) {
            setNoSectorMessage(coefficient === '' ? t("INCREMENT_COEFFIFICENT_NEW_MMINIMUM_SALARIES") : '')
            // setListData([]);
            setTitle(t("INCREASE_MINIMUM_SALARIES"));
            setHeaders([{
                title: t("LEVEL"),
                field: 'level',
                editable: 'never',
                size: 500,
            }])
        } else {
            // If back to manage page
            setTitle(t("MANAGE_MINIMUM_SALARIES"));
            // setListData([]);
            setCoefficient('');
            setIncrementPage(false);
            setNoSectorMessage('')
        }
    }


    // Function to get incremented salaries
    const getSalaries = () => {
        if (selectedSector && salaryType) {
            if (!incrementPage) {
                setNoSectorMessage('')
            } else if (incrementPage && coefficient) {
                setNoSectorMessage('')
            }
            let incremented_salary = []
            if (coefficient) {
                let ApiUrl = salaryType.value == 1 ? MonthlyMinimumSalariesApiurl : HourlyMinimumSalariesApiurl
                AXIOS.service(ApiUrl + '/' + selectedSector.value + '/get')
                    .then((result) => {
                        if (result?.success) {
                            let categories = new Array(result.data.categories).fill(1);
                            let salary_data = result.data.salaries
                            let header_arr = [...salary_header];
                            // Set headers
                            categories.map((cat, i) => {
                                let header = {
                                    title: 'Category ' + (i + 1),
                                    field: 'cat' + (i + 1),
                                    size: 200,
                                    editComponent: CustomInput
                                }
                                header_arr.push(header);
                            })
                            // Set salaries
                            salary_data.map((val, i) => {
                                setHeaders(header_arr);
                                val['id'] = i + 1;
                                Object.keys(val).map((cat, j) => {
                                    if (cat !== 'id' && cat !== 'level' && cat !== 'tableData') {
                                        // Calculate salaries based on coefficient added (Incrementing)
                                        val[cat] = (parseFloat(val[cat].replace(',', '.')) + (parseFloat(val[cat].replace(',', '.')) * (parseFloat(coefficient.replace(',','.')) / 100))).toFixed(4);
                                    }
                                })
                                incremented_salary.push(val);
                            })
                            setListData(incremented_salary);
                            setSalaryData(incremented_salary)
                        } else {
                            setErrors(result.message)
                        }
                    })
            } else {
                setHeaders(tempHeader)
                setListData(tempData);
            }
        }

    }

    // Function to save updated salaries
    const SaveSalaries = (new_salaries) => {
        let requestData = {
            salaries: []
        }
        // Formating request data
        new_salaries.map((level, i) => {
            let data = { level: '', categories: [] }
            Object.keys(level).map((val, j) => {
                data.level = level['level']
                if (val !== 'id' && val !== 'level' && val !== 'tableData') {
                    let cat_obj = { "category": data.categories.length + 1, "minimum_salary": level[val] }
                    data.categories.push(cat_obj)
                }
            })
            requestData.salaries.push(data);
        });

        // API call to save updated salaries
        let ApiUrl = salaryType.value == 1 ? MonthlyMinimumSalariesApiurl : HourlyMinimumSalariesApiurl
        AXIOS.service(ApiUrl + '/' + selectedSector.value + '/update', 'POST', requestData)
            .then((result) => {
                if (result?.success) {
                    // setSuccessMessage(result.message[0])
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

    // Function to revert back to saved salaries
    const undoSalaries = () => {
        let ApiUrl = salaryType == 1 ? MonthlyMinimumSalariesApiurl : HourlyMinimumSalariesApiurl
        AXIOS.service(ApiUrl + '/' + selectedSector.value + '/undo', 'POST')
            .then((result) => {
                if (result?.success) {
                    setWarningMessage('');
                    getIncrementPage();
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
    //function to set old data to listData if increment not saved
    const clearNewData = () => {
        getIncrementPage(false)
        setHeaders(tempHeader)
        setListData(tempData)
    }


    return (
        <div className="company-tab-width mt-3 border bg-white">
            {warningMessage && <ModalPopup
                title={t("WARNING_TITLE")}
                body={(warningMessage)}
                onConfirm={undoSalaries}
                onHide={() => setWarningMessage('')}
            ></ModalPopup>}
            {/* {successMessage && <ModalPopup
                title={('SUCCESS')}
                body={(successMessage)}
                onHide={() => setSuccessMessage('')}
            ></ModalPopup>} */}
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
                title={t("VALIDATION_ERROR")  + ("!")}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            <div className={"d-flex col-md-12 justify-content-between py-3 border-thick"}>
                <h4 className="text-color mb-0"><img className="shortcut-icon mr-2 mb-1 pointer" onClick={() => incrementPage ? clearNewData() : navigate('/configurations')} src={BackIcon}></img>{title}</h4>
            </div>

            <div className="col-md-12 mb-2 d-flex justify-content-between">
                <div className={incrementPage ? "col-md-10 px-0 row m-0" : "col-md-8 px-0 row m-0"}>
                    <Dropdown
                        options={sectors}
                        selectedOptions={selectedSector}
                        onSelectFunction={(e) => setSelectedSector(e)}
                        CustomStyle="my-2 col-md-3"
                        title={t("SECTORS")}
                        required={true}
                        isMulti={false}
                    ></Dropdown>
                    <Dropdown
                        options={salaryTypeOptions}
                        selectedOptions={salaryType}
                        onSelectFunction={(e) => setSalaryType(e)}
                        CustomStyle="my-2 col-md-3"
                        title={t("SALARY_TYPE")}
                        required={true}
                        isMulti={false}
                    ></Dropdown>
                    {incrementPage && <div className="col-md-4 px-0 row m-0">
                        <TextInput
                            title={t("INCREMENT_COEFFICIENT")}
                            name={'increment_coef'}
                            CustomStyle={"col-md-8 mt-4"}
                            required={true}
                            value={coefficient}
                            setValue={(e) => setCoefficient(e)}
                            age={true}
                        ></TextInput>
                        <CustomButton buttonName={t("CHECK_TEXT")} ActionFunction={() => getSalaries()} CustomStyle="mt-5 mb-3"></CustomButton>
                    </div>}
                    {!incrementPage && <CustomButton buttonName={t("GET_SALARIES")} ActionFunction={() => getSalaries()} CustomStyle="mt-5 mb-3"></CustomButton>}
                </div>

                {incrementPage && coefficient && <div className="d-flex mr-5">
                    <CustomButton buttonName={t("SAVE")} ActionFunction={() => SaveSalaries(listData)} CustomStyle="mt-5 mb-3"></CustomButton>
                    <CustomButton buttonName={t("UNDO")} ActionFunction={() => setWarningMessage(t("CONFIRMATION_SLARIES_REVERT_BACK"))} CustomStyle="mt-5 mb-3"></CustomButton>
                </div>}

                {noSectorMessage === '' && !incrementPage && <p className="text-color pointer mt-5 mr-5 mb-3" onClick={() => getIncrementPage(true)}>
                    <u>{t("INCREMENT_SALARIES")}</u>
                </p>}
            </div>

            <div className="tablescroll">
                {noSectorMessage && <h5 className="text-danger ml-2 pl-4">{noSectorMessage}</h5>}
                {noSectorMessage === '' && <Table columns={headers} rows={listData} setRows={setListData} tableName={'min_salary'} height={'calc(100vh - 162px)'} SaveSalaries={SaveSalaries}></Table>}
            </div>
        </div>

    )
}
