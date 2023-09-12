import React, { useState } from "react";
import CustomButton from "../atoms/CustomButton";
import CompanyForm from "./CompanyForm";

export default function ResponsiblePersonForm({ customers, setCustomers, getCustomerDropdownData, selectedRole, setSelectedRole }) {

    // const [customers, setCustomers] = useState([{
    //     first_name: "",
    //     last_name: "",
    //     email: "",
    //     phone: "",
    //     rsz_number: "",
    //     role: "",
    // }]);

    const rolesList = [{ value: 'cadmin', label: 'cadmin' }, { value: 'manager', label: 'manager' }]

    const AddNewCustomer = () => {
        if (customers.length <= 3) {
            setCustomers([...customers, {
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                rsz_number: "",
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
            customer_arr[index][name] = value
            if (name === 'first_name') { getCustomerDropdownData(index, value) }
        } else {
            setSelectedRole(value);
            customer_arr[index]['role'] = value.value
        }
        setCustomers(customer_arr);
    }


    //responsible person fields for company
    const CustomerfieldsData = [
        { title: "First name", name: "first_name", required: false, type: "input_field" },
        { title: "Last name", name: "last_name", required: false, type: "input_field" },
        { title: "Rsz number", name: "rsz_number", required: false, type: "input_field" },
        { title: "Email", name: "email", required: false, type: "input_field" },
        { title: "Phone number", name: "phone", required: false, type: "phone_input" },
        { title: "Roles", options: rolesList, isMulti: false, selectedOptions: selectedRole, required: false, type: "dropdown" },
    ];


    return (
        <div className="">
            {customers.map((customer, index) => {
                return (
                    <div key={index}>
                        <div className="d-flex mb-3 pos-relative justify-content-end">
                            {customers.length > 1 && <p className="pos-absolute mx-5 text-danger text-decoration-underline" onClick={() => RemoveCustomer(index)}>Remove</p>}
                        </div>
                        <CompanyForm
                            index={index}
                            view="customer"
                            title1='Add Responsible person'
                            data1={CustomerfieldsData}
                            formattedData1={customers}
                            SetValues={setValues}
                        ></CompanyForm>
                        <div className="d-flex mb-3 pos-relative justify-content-end">
                            {index == customers.length - 1 && <CustomButton buttonName={'Add another +'} ActionFunction={() => AddNewCustomer()} CustomStyle="mr-5"></CustomButton>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}