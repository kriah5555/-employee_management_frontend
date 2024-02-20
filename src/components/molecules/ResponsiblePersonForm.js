import React, { useEffect, useState } from "react";
import CustomButton from "../atoms/CustomButton";
import CompanyForm from "./CompanyForm";
import { ResponsiblePersonApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { t } from "../../translations/Translation";


export default function ResponsiblePersonForm({ customers, setCustomers, selectedRole, setSelectedRole, getCustomerDropdownData, view, update_id }) {

    // const [customers, setCustomers] = useState([{
    //     first_name: "",
    //     last_name: "",
    //     email: "",
    //     phone: "",
    //     rsz_number: "",
    //     date_of_birth: "",
    //     role: "",
    // }]);

    const [rolesList, setRoleList] = useState([])
    // const rolesList = [{ value: 'customer_admin', label: 'customer admin' }, { value: 'manager', label: 'manager' }]

    useEffect(() => {
        AXIOS.service(ResponsiblePersonApiUrl + '/create', 'GET')
            .then((result) => {
                if (result?.success) {
                    setRoleList(result.data.roles);
                    result.data.roles.map((val, i) => {
                        if (val.value === customers[0]?.role) {
                            setSelectedRole([val])
                        }
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })


        if (update_id && update_id !== '0' && update_id !== undefined) {
            let editApiUrl = ResponsiblePersonApiUrl + '/' + update_id
            // Api call to get detail data
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        let data = [{
                            first_name: result.data.first_name,
                            last_name: result.data.last_name,
                            email: result.data.email,
                            phone_number: result.data.phone_number,
                            social_security_number: result.data.social_security_number,
                            date_of_birth: result.data.date_of_birth,
                            role: result.data.role.value
                        }]
                        setSelectedRole([result.data.role]);
                        setCustomers(data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])

    const AddNewCustomer = () => {
        if (customers.length <= 3) {
            setCustomers([...customers, {
                first_name: "",
                last_name: "",
                email: "",
                phone_number: "",
                social_security_number: "",
                date_of_birth: "",
                role: "",
            }]);
        }
    }

    const RemoveCustomer = (index) => {
        const newCustomer = [...customers];
        newCustomer.splice(index, 1);
        setCustomers(newCustomer);
    }

    function formatDate(value) {

        const firstSixDigits = value.toString().replace(/[^\d]/g, '').slice(0, 6);
        // Check if the extracted 6 digits are not digits
        if (!/^\d+$/.test(firstSixDigits)) {
            return ""; // Return an empty string if not digits
        }

        const yy = firstSixDigits.slice(0, 2);
        const xx = yy >= 23 ? '19' : '20';
        const formattedDate = `${firstSixDigits.slice(4, 6)}-${firstSixDigits.slice(2, 4)}-${xx}${yy}`;
        return formattedDate;

    }

    const setValues = (index, name, value, field) => {
        const customer_arr = [...customers]
        if (field === 'address') {
            customer_arr[index][field][name] = value
        } else if (field !== 'dropdown') {
            if (name === 'first_name') {
                customer_arr[index][name] = value
                getCustomerDropdownData(index, value)
            } else if (name === 'social_security_number') {
                if (value.length <= 15) {
                    customer_arr[index][name] = [2, 5, 8, 12].includes(value.length) ? (value + (value.length === 8 ? '-' : '.')) : value
                }
                if (value.length >= 8) {
                    customer_arr[index]["date_of_birth"] = formatDate(value)
                }
            } else {
                customer_arr[index][name] = value
            }

        } else {
            setSelectedRole(value);
            customer_arr[index]['role'] = value.value
        }
        setCustomers(customer_arr);
    }


    //responsible person fields for company
    const CustomerfieldsData = [
        { title: t("FIRST_NAME"), name: "first_name", required: true, type: "input_field" },
        { title: t("LAST_NAME"), name: "last_name", required: true, type: "input_field" },
        { title: t("SSN"), name: "social_security_number", required: true, type: "input_field" },
        { title: t("EMAIL"), name: "email", required: true, type: "input_field" },
        { title: t("PHONE_NUMBER"), name: "phone_number", required: true, type: "phone_input" },
        { title: t("ROLES"), options: rolesList, isMulti: false, selectedOptions: selectedRole, required: true, type: "dropdown" },
        { title: t("DATE_OF_BIRTH"), name: "date_of_birth", required: true, type: "date" },

    ];


    return (
        <div className="flex-1">
            {customers.map((customer, index) => {
                return (
                    <div key={index}>
                        {view !== 'responsible-person-single' && <div className="d-flex mb-3 pos-relative justify-content-end">
                            {customers.length > 1 && <p className="pos-absolute mx-5 text-danger text-decoration-underline pointer" onClick={() => RemoveCustomer(index)}>{t("REMOVE")}</p>}
                        </div>}
                        <CompanyForm
                            index={index}
                            view={view !== 'responsible-person-single' ? "multi" : "customer"}
                            title1={view !== 'responsible-person-single' ? t("ADD_RESPONSIBLE_PERSON") : ''}
                            data1={CustomerfieldsData}
                            formattedData1={customers[index]}
                            SetValues={setValues}
                        ></CompanyForm>
                        {view !== 'responsible-person-single' && <div className="d-flex mb-3 pos-relative justify-content-end">
                            {index === customers.length - 1 && <CustomButton buttonName={t("ADD_ANOTHER") + (" + ")} ActionFunction={() => AddNewCustomer()} CustomStyle="mr-5"></CustomButton>}
                        </div>}
                    </div>
                );
            })}
        </div>
    );
}
