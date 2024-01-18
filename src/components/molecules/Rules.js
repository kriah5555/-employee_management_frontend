import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../static/icons/BackIcon.png";
import { t } from "../../translations/Translation";
import Dropdown from "../atoms/Dropdown";
import CustomTable from "../atoms/CustomTable";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { GetCompanyParametersApiUrl, GetDefaultParamApiUrl, GetParametersApiUrl, GetParametersOptionsApiUrl, UpdateCompanyParametersApiUrl, UpdateDefaultParamApiUrl, UpdateParameterApiUrl } from "../../routes/ApiEndPoints";
import { ToastContainer, toast } from 'react-toastify';
import Table from "../atoms/Table";
import ModalPopup from "../../utilities/popup/Popup";
import CustomCheckBox from "../atoms/formFields/CustomCheckBox";
import TextInput from "../atoms/formFields/TextInput";



export default function Rules({ overviewContent }) {

    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState();
    const [listData, setListData] = useState([]);
    const [options, setOptions] = useState();
    const [selectedId, setSelectedId] = useState();
    const [selectedSectorId, setSelectedSectorId] = useState();
    const [popupOpen, setPopupOpen] = useState(false);
    const [value, setValue] = useState('');
    const [popupData, setPopupData] = useState();
    const types = overviewContent === 'parameters' ? [
        { value: 1, label: t("EMPLOYEE_TYPE") },
        { value: 2, label: t("SECTOR") },
        { value: 3, label: t("EMPLOYEE_TYPE_SECTOR") },
    ] : [
        { value: 1, label: t("EMPLOYEE_TYPE") },
        { value: 2, label: t("SECTOR") },
        { value: 3, label: t("EMPLOYEE_TYPE_SECTOR") },
        { value: 4, label: t("COMPANY") },
        { value: 5, label: t("LOCATION") }
    ]
    const [defaultValueStatus, setDefaultValueStatus] = useState(false);
    // let count = 1
    // const max_type = overviewContent === 'parameters' ? 3 : 5
    // while (count <= max_type) {
    //     types.push({ value: count, label: count })
    //     count = count + 1
    // }



    useEffect(() => {
        AXIOS.service(GetParametersOptionsApiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    setOptions(result.data)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const params_header = [
        {
            title: t("NAME_TEXT"),
            field: 'name',
            size: 200,
            editable: 'never',
        },
        {
            title: t('DESCRIPTION'),
            field: 'description',
            size: 200,
            editable: overviewContent === 'parameters' ? 'never' : 'onUpdate'
        },
        {
            title: t('VALUE'),
            field: 'value',
            size: 200,
            editable: 'onUpdate'
        },
    ]

    const rules_header = [
        {
            title: t("NAME_TEXT"),
            field: 'name',
            size: 200,
        },
        {
            title: t('DESCRIPTION'),
            field: 'description',
            size: 200,
        },
        {
            title: t('DEFAULT_VALUE'),
            field: 'value',
            size: 200,
        },
        {
            title: t('VALUE'),
            field: 'value',
            size: 200,
        },
    ]

    useEffect(() => {
        if (selectedType?.value) {
            let apiUrl = overviewContent === 'default_param' ? GetDefaultParamApiUrl : overviewContent === 'parameters' ? GetParametersApiUrl : GetCompanyParametersApiUrl
            let req_data = {
                'type': selectedType.value,
                'id': selectedId?.value,
                'sector_id': selectedSectorId?.value
            }
            AXIOS.service(apiUrl, 'POST', req_data)
                .then((result) => {
                    if (result?.success) {
                        setListData(result.data)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [selectedType, selectedId, selectedSectorId])

    useEffect(() => {
        setSelectedId(''); setSelectedSectorId('')
    }, [selectedType])

    const UpdateRow = (newData) => {
        let id = newData.id
        newData['type'] = selectedType?.value
        newData['id'] = selectedId?.value
        newData['sector_id'] = selectedSectorId?.value
        newData['value'] = overviewContent === 'rules' ? value : newData['value']
        newData['use_default'] = defaultValueStatus

        let apiUrl;
        apiUrl = overviewContent === 'default_param' ? UpdateDefaultParamApiUrl : overviewContent === 'parameters' ? UpdateParameterApiUrl : UpdateCompanyParametersApiUrl

        AXIOS.service(apiUrl + '/' + id, 'PUT', newData)
            .then((result) => {
                if (result?.success) {
                    if (overviewContent === 'rules') { setPopupOpen(false) }
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

    const viewAction = (data, action) => {
        setPopupOpen(true)
        setPopupData(data)
        setDefaultValueStatus(data?.use_default)
        setValue(data?.use_default ? data?.value : '')
    }


    const checkboxList = [
        {
            name: t("COPY_DEFAULT"),
            key: 'copy',
            checked: defaultValueStatus,
        },
    ]


    return (
        <div className={overviewContent !== 'rules' && "company-tab-width mt-3 border bg-white"}>
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

            {popupOpen && <ModalPopup
                size="md"
                title={t("UPDATE_RULE")}
                startplanButton={t('SAVE')}
                close={true}
                body={
                    <div>
                        <div className="col-12 px-0 d-flex">
                            <label className="col-md-4 mb-1 pr-0 font-weight-bold">{t('NAME_TEXT')}:</label>
                            <p className="mb-0 col-md-8">{popupData?.name}</p>
                        </div>
                        <div className="col-12 px-0 d-flex">
                            <label className="col-md-4 mb-1 pr-0 font-weight-bold">{t('DESCRIPTION')}:</label>
                            <p className="mb-0 col-md-8">{popupData?.description}</p>
                        </div>
                        <div className="col-12 px-0 d-flex">
                            <label className="col-md-4 mb-1 pr-0 font-weight-bold">{t('DEFAULT_VALUE')}:</label>
                            <p className="mb-0 col-md-8">{popupData?.value}</p>
                        </div>
                        <div className="col-12 px-0 d-flex mt-3">
                            <CustomCheckBox
                                key={t('COPY_DEFAULT')}
                                title={''}
                                checkboxList={checkboxList}
                                changeCheckbox={() => { setDefaultValueStatus(!defaultValueStatus); setValue(!defaultValueStatus ? popupData?.value : '') }}
                                CustomStyle={'col-12'}
                            ></CustomCheckBox>
                        </div>
                        <div className="col-12 px-0 d-flex my-2">
                            <label className="col-md-4 mb-1 pr-0 font-weight-bold">{t('VALUE')}:</label>
                            <input type="text" className="form-control" name={'value'} value={value} onChange={(e) => setValue(e.target.value)} disabled={defaultValueStatus ? true : false} />
                        </div>
                    </div>
                }
                onConfirm={() => UpdateRow(popupData)}
                onHide={() => setPopupOpen(false)}
            ></ModalPopup>}

            {overviewContent !== 'rules' && <div className="d-flex col-md-12 justify-content-between py-3 border-thick">
                <h4 className="text-color mb-0"><img className="shortcut-icon mr-2 mb-1 pointer" onClick={() => navigate('/configurations')} src={BackIcon}></img>{t(overviewContent === 'parameters' ? 'MANAGE_PARAM' : 'MANAGE_DEFAULT_PARAM')}</h4>
            </div>}
            <div className="col-md-12 px-0 mb-2 justify-content-between">
                <div className="d-flex">
                    <Dropdown
                        options={types}
                        selectedOptions={selectedType}
                        onSelectFunction={(e) => setSelectedType(e)}
                        CustomStyle="my-2 col-md-3"
                        title={t("TYPE")}
                        required={true}
                        isMulti={false}
                    ></Dropdown>
                    {overviewContent !== "default_param" && selectedType && selectedType?.value !== 4 && <Dropdown
                        options={selectedType?.value === 2 ? options?.sectors : selectedType?.value === 5 ? options?.locations : options?.employee_types}
                        selectedOptions={selectedId}
                        onSelectFunction={(e) => setSelectedId(e)}
                        CustomStyle="my-2 col-md-3"
                        title={selectedType?.value === 2 ? t("SECTOR") : selectedType?.value === 5 ? t("LOCATIONS") : t("EMPLOYEE_TYPE")}
                        required={true}
                        isMulti={false}
                    ></Dropdown>}
                    {overviewContent !== "default_param" && selectedType && selectedType?.value === 3 && <Dropdown
                        options={options?.sectors}
                        selectedOptions={selectedSectorId}
                        onSelectFunction={(e) => setSelectedSectorId(e)}
                        CustomStyle="my-2 col-md-3"
                        title={t("SECTOR")}
                        required={true}
                        isMulti={false}
                    ></Dropdown>}
                </div>
                {overviewContent !== 'rules' && <CustomTable title={''} columns={params_header} rows={listData} setRows={setListData} tableName={'rules'} height={'calc(100vh - 162px)'} UpdateRow={UpdateRow}></CustomTable>}
                {overviewContent === 'rules' && <Table columns={rules_header} rows={listData} tableName={overviewContent} viewAction={viewAction} multiPurpose={true}></Table>}
            </div>
        </div>
    )
}
