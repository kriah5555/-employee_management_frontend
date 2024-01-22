import React, { useState, useEffect } from "react";
import FormsNew from "../molecules/FormsNew";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { SalaryCoefficientApiUrl, TaxesApiUrl } from "../../routes/ApiEndPoints"
import { t } from "../../translations/Translation";

export default function AddSalaryCoefficient() {

    const [formData, setFormData] = useState({
        "from_date": "",
        "to_date": "",
        "coefficient": "",
        "sector_id": "",
        "employee_type_id": "",
    })

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const [sectorList, setSectorList] = useState([])
    const [sector, setSector] = useState([])
    const [employeeType, setEmployeeType] = useState("")
    const [employeeTypeList, setEmployeeTypeList] = useState([])



    useEffect(() => {

        AXIOS.service(SalaryCoefficientApiUrl + '/create', 'GET')
            .then((result) => {
                if (result?.success) {
                    setSectorList(result.data.sectors)
                    setEmployeeTypeList(result.data.employee_types)
                }
            })
            .catch((error) => {
                console.log(error);
            })

        if (params.id !== undefined) {
            AXIOS.service(SalaryCoefficientApiUrl + '/' + params.id, 'GET')
                .then((result) => {
                    if (result?.success) {
                        let data = {
                            "from_date": result.data.from_date,
                            "to_date": result.data.to_date,
                            "coefficient": result.data.coefficient, 
                            "sector_id": result.data.sector?.value,
                            "employee_type_id": result.data.employee_type?.value,
                        }
                        setFormData(data)
                        setSector(result.data.sector)
                        setEmployeeType(result.data.employee_type)
                    } else {
                        setErrors(result.message)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })

        }
    }, [])


    const setValues = (index, name, value, field) => {
        const newData = { ...formData };
        if (field !== 'dropdown') {
            newData[name] = value
        } else {
            if (name === 'sector_id') {
                setSector(value)
                newData[name] = value.value
            } else if (name === 'employee_type_id') {
                setEmployeeType(value)
                newData[name] = value.value
            }
        }
        setFormData(newData);
    }


    const onSave = () => {

        let url = SalaryCoefficientApiUrl
        let method = 'POST'

        // Update url and method
        if (params.id !== undefined) {
            url = SalaryCoefficientApiUrl + '/' + params.id
            method = 'PUT'
        }
        // APICall for create and update of salary coefficient
        AXIOS.service(url, method, formData)
            .then((result) => {
                if (result?.success) {
                    navigate('/manage-social-secretary-and-reporting-configurations/salary_coefficient');
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



    const Taxfields = [
        { title: t("EMPLOYEE_TYPE"), name: "employee_type_id", options: employeeTypeList, isMulti: false, selectedOptions: employeeType, required: true, type: "dropdown", style: "col-md-6 mt-2 float-left" },
        { title: t("SECTOR"), name: "sector_id", options: sectorList, isMulti: false, selectedOptions: sector, required: true, type: "dropdown", style: "col-md-6 mt-2 float-left" },
        { title: t("TAX_FROM_DATE"), name: "from_date", required: true, type: "date", style: "col-md-6 mt-4 float-left" },
        { title: t("TAX_TO_DATE"), name: "to_date", type: "date", required: true, style: "col-md-6 float-left mt-4" },
        { title: t("SALARY_COEFFICIENT"), name: "coefficient", required: true, type: "text", style: "col-md-6 mt-4 float-left" },
    ];

    return (
        <div className="right-container add_taxes">
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={t("VALIDATION_ERROR") + ("!")}
                body={(errors)}
                onHide={() => setErrors([])}
                // buttonName={"CLOSE"}
            ></ErrorPopup>}
            <FormsNew
                view="public_holiday"
                formTitle={t("ADD_COEFFICIENT")}
                redirectURL={'/manage-social-secretary-and-reporting-configurations/salary_coefficient'}
                formattedData={formData}
                data={Taxfields}
                SetValues={setValues}
                OnSave={onSave}
            ></FormsNew>
        </div>
    )
}