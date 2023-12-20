import React, { useEffect, useState } from "react";
import CustomButton from "../atoms/CustomButton";
import CompanyForm from "./CompanyForm";
import { ResponsiblePersonApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"


export default function ResponsiblePersonForm({ customers, setCustomers, getCustomerDropdownData, selectedRole, setSelectedRole, view, update_id }) {

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
                    setRoleList(result.data.roles)
                }
            })
            .catch((error) => {
                console.log(error);
            })


        if (update_id !== '0' && update_id !== undefined) {
            let editApiUrl = ResponsiblePersonApiUrl + '/' + update_id
            // Api call to get detail data
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        let data = [{
                            first_name: result.data.user_basic_details.first_name,
                            last_name: result.data.user_basic_details.last_name,
                            email: result.data.user_contact_details.email,
                            phone_number: result.data.user_contact_details.phone_number,
                            social_security_number: result.data.social_security_number,
                            date_of_birth: result.data.user_basic_details.date_of_birth,
                            role: result.data.roles[0]
                        }]
                        setSelectedRole([{ value: result.data.roles[0], label: result.data.roles[0] }]);
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
        { title: "First name", name: "first_name", required: true, type: "input_field" },
        { title: "Last name", name: "last_name", required: true, type: "input_field" },
        { title: "Rsz number", name: "social_security_number", required: true, type: "input_field" },
        { title: "Email", name: "email", required: true, type: "input_field" },
        { title: "Phone number", name: "phone_number", required: true, type: "phone_input" },
        { title: "Roles", options: rolesList, isMulti: false, selectedOptions: selectedRole, required: true, type: "dropdown" },
        { title: "DOB", name: "date_of_birth", required: true, type: "date" },

    ];


    return (
        <div className="">
            {customers.map((customer, index) => {
                return (
                    <div key={index}>
                        {view !== 'responsible-person-single' && <div className="d-flex mb-3 pos-relative justify-content-end">
                            {customers.length > 1 && <p className="pos-absolute mx-5 text-danger text-decoration-underline" onClick={() => RemoveCustomer(index)}>Remove</p>}
                        </div>}
                        <CompanyForm
                            index={index}
                            view="customer"
                            title1={view !== 'responsible-person-single' ? 'Add Responsible person' : ''}
                            data1={CustomerfieldsData}
                            formattedData1={customers[index]}
                            SetValues={setValues}
                        ></CompanyForm>
                        {view !== 'responsible-person-single' && <div className="d-flex mb-3 pos-relative justify-content-end">
                            {index == customers.length - 1 && <CustomButton buttonName={'Add another +'} ActionFunction={() => AddNewCustomer()} CustomStyle="mr-5"></CustomButton>}
                        </div>}
                    </div>
                );
            })}
        </div>
    );
}