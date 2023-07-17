import React, { useState } from "react";
import Forms from "../molecules/Forms";

export default function AddGroupFunction() {

    const [active, setActive] = useState(true);
    const [inactive, setInactive] = useState(false);

    const [sector, setSector] = useState('');
    const [functionTitle, setFunctionTitle] = useState('');
    const [description, setDescription] = useState('');
    const [functionCategory, setFunctionCategory] = useState('');


    const changeCheckbox = (type) => {
        if (type === 'active') {
            setActive(true);
            setInactive(false);
        } else {
            setActive(false);
            setInactive(true);
        }
    }

    const checkboxList = [
        {
            name: 'Active',
            key: 'active',
            checked: active,
        },
        {
            name: 'Inactive',
            key: 'inactive',
            checked: inactive,
        }
    ]

    const sectorList = [
        //sector options
        {value: 'sector1' , label: 'Sector1'},
        {value: 'sector2' , label: 'Sector2'},
        {value: 'sector3' , label: 'Sector3'},
    ]

    const FunctionsList = [
        //functions options
        {value: 'function1' , label: 'Function1'},
        {value: 'function2' , label: 'Function2'},
        {value: 'function3' , label: 'Function3'},
    ]

    const categoriesList = []
    let count = 1
    while (count <= 5) {
        categoriesList.push({value: count , label: count})
        count = count + 1
    }
    
    // Fields data
    const sector_title = {
        title: 'Sector',
        name: 'sector',
        placeholder: '',
        required: true,
        value: sector,
        options: sectorList,
        isMulti: false
    }

    const function_category = {
        title: 'Function category',
        name: 'function_category',
        placeholder: '',
        required: true,
        value: functionCategory,
        options: categoriesList,
        isMulti: false
    }

    const function_title = {
        title: 'Function title',
        name: 'function_title',
        required: true,
        options: FunctionsList,
        value: functionTitle,
        isMulti: true
    }

    const group_function_desc = {
        title: 'Description',
        name: 'sector_desc',
        required: false,
        value: description
    }

    const group_function_status = {
        title: 'Status',
        required: true
    }


    // Type:
    // 2: Function
    // 3: Description
    // 4: Sector
    // 5: Function category

    const SetValues = (value, type) => {
        if (type === 2) {
            setFunctionTitle(value)
        } else if (type === 3) {
            setDescription(value)
        } else if (type === 4) {
            setSector(value)
        } else {
            setFunctionCategory(value)
        }
    }

    // On submit function
    const OnSave = () => {
        let status = true
        if (inactive){ status = false }

        let data = {
            'sector': sector,
            'function_category': functionCategory,
            'function_title': functionTitle,
            'description':description,
            'status':status
        }
        console.log(data);
    }

    return (
        <div className="right-container">
            <Forms 
                formTitle={'Add Group Function'}
                redirectURL={'/manage-configurations/group_functions'}
                changeCheckbox={changeCheckbox}
                checkboxList={checkboxList}
                field1=''
                field2={function_title}
                field3={group_function_desc}
                field4={group_function_status}
                field5={sector_title}
                field6={function_category}
                SetValues={SetValues}
                onSave={OnSave}
                view={'group_function'}
            ></Forms>
        </div>
    )
}