import React, { useEffect, useState } from "react";
import Forms from "../molecules/Forms";
import { EmployeeTypeApiUrl, SectorApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import ModalPopup from "../../utilities/popup/Popup";
import { useNavigate, useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TextInput from "../atoms/formFields/TextInput";
import DeleteIcon from "../../static/icons/Delete.svg"
import AddIcon from "../../static/icons/AddPlusIcon.png";
import CustomButton from "../atoms/CustomButton";


export default function AddSector() {

    const [active, setActive] = useState(true);
    const [inactive, setInactive] = useState(false);

    const [sectorName, setSectorName] = useState('');
    const [paritairCommittee, setParitairCommittee] = useState('');
    const [description, setDescription] = useState('');
    const [employeeType, setEmployeeType] = useState([]);
    const [categoryNumber, setCategoryNumber] = useState('');

    const [experience, setExperience] = useState([{ 'level': 1, 'from': '', 'to': '' }]);
    const [age, setAge] = useState({ '18': '', '17': '', '16': '', '15': '' })

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [titleError, SetTitleError] = useState('');
    const [codeError, setCodeError] = useState('');
    const [CategoryError, setCategoryError] = useState('');
    const [employeeTypeError, setEmployeeTypeError] = useState('');

    const [emp_type_state, setEmpTypeState] = useState(false);
    const [employeeTypeList, setEmployeeTypeList] = useState([])
    const categoriesList = []
    const [selectedTab, setSelectedTab] = useState();
    const [levelsCount, setLevelsCount] = useState([1]);
    const MaximumCategoryNumber = 50;
    let count = 1
    while (count <= MaximumCategoryNumber) {
        categoriesList.push({ value: count, label: count })
        count = count + 1
    }

    const navigate = useNavigate();
    const params = useParams();

    // Experience tab table header data
    const ExperienceHeaders = [
        { title: 'Level', style: 'col-md-4 pl-3' },
        { title: 'Experience range (in months)', style: 'col-md-4 text-center' },
        { title: 'Actions', style: 'col-md-4 text-right pr-5' },
    ]

    // Sectors tabs
    const TabsData = [
        { tabHeading: ("Information"), tabName: 'information' },
        { tabHeading: ("Experience"), tabName: 'experience' },
        { tabHeading: ("Age"), tabName: 'age' },
    ]

    // Age tab data
    const ageData = [
        { label: 'Age of 18 will receive their full salary', age: '18' },
        { label: 'Age of 17 will receive their salary', age: '17' },
        { label: 'Age of 16 will receive their salary', age: '16' },
        { label: 'Age of 15 will receive their salary', age: '15' },
    ]


    // Checkbox status data
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

    //Fetch dropdown data of employee types
    useEffect(() => {
        AXIOS.service(EmployeeTypeApiUrl, 'GET')
            .then((result) => {
                if (result.length !== employeeTypeList.length) {
                    result.map((val, index) => {
                        employeeTypeList.push({ value: val.id, label: val.name })
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    // Fetch sector data based on param id to add default inputs
    useEffect(() => {
        if (params.id) {
            let editApiUrl = SectorApiUrl + '/' + params.id
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result.employee_types.length === 0) { setEmpTypeState(true) }
                    if (result.employee_types.length !== employeeType.length) {
                        result.employee_types.map((val) => {
                            employeeType.push({ value: val.id, label: val.name })
                        })
                    }
                    setSectorName(result.name);
                    setParitairCommittee(result.paritair_committee);
                    setDescription(result.description);
                    setCategoryNumber({ value: result.category, label: result.category })


                    if (result.status) { setActive(true) } else { setInactive(true); setActive(false) }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])

    // Function to stop the rendering till the data gets updated
    if (params.id && (employeeType.length === 0 && !emp_type_state)) {
        return
    }


    // Field data
    const sector_name = {
        title: 'Sector name',
        name: 'sector_name',
        placeholder: 'Enter sector name',
        required: true,
        value: sectorName,
    }

    const paritair_committee = {
        title: 'Paritair committee',
        name: 'paritair_committee',
        placeholder: 'Enter paritair committee',
        required: true,
        value: paritairCommittee
    }

    const sector_desc = {
        title: 'Description',
        name: 'sector_desc',
        required: false,
        value: description
    }

    const employee_type = {
        title: 'Employee type',
        name: 'emp_type',
        required: true,
        options: employeeTypeList,
        value: employeeType,
        isMulti: true
    }

    const category_number = {
        title: 'Number of categories',
        name: 'cat_num',
        required: true,
        options: categoriesList,
        value: categoryNumber,
        isMulti: false
    }

    const sector_status = {
        title: 'Status',
        required: true
    }


    // Type:
    // 1: Sector name
    // 2: Paritair committee
    // 3: employee type
    // 4: category number 
    // 5: sector description
    // 6: Active status

    const SetValues = (value, type, index) => {
        if (type === 1) {
            setSectorName(value);
            if (value === '') { SetTitleError('Required'); } else { SetTitleError(''); }
        } else if (type === 2) {
            setParitairCommittee(value);
            if (value === '') { setCodeError('Required'); } else { setCodeError(''); }
        } else if (type === 3) {
            setEmployeeType(value);
            if (value.length === 0) { setEmployeeTypeError('Required'); } else { setEmployeeTypeError(''); }
        } else if (type === 4) {
            setCategoryNumber(value);
            if (value === '') { setCategoryError('Required'); } else { setCategoryError(''); }
        } else if (type === 'from') {
            experience[index]['from'] = value
        } else if (type === 'to') {
            experience[index]['to'] = value
        } else if (type === 'age') {
            age[index] = value
        } else {
            setDescription(value);
        }
    }

    // Function for onSubmit for creating and updating sectors
    const OnSave = () => {

        if (sectorName === '') {
            SetTitleError('Required');
        }
        if (paritairCommittee === '') {
            setCodeError('Required');
        }
        if (employeeType.length === 0) {
            setEmployeeTypeError('Required');
        }
        if (categoryNumber === '') {
            setCategoryError('Required');
        }


        // if (sectorName && paritairCommittee && categoryNumber && employeeType.length !== 0) {
            // Request params
            let status = 1
            if (inactive) { status = 0 }
            let emp_type_ids = []
            employeeType.map((val, index) => {
                emp_type_ids.push(val.value)
            })

            let data = {
                'name': sectorName,
                'paritair_committee': paritairCommittee,
                'description': description,
                'employee_types': emp_type_ids,
                'category': categoryNumber.value,
                'status': status,
                'experience': experience,
                'age': age
            }

            // Creation url and method
            let url = SectorApiUrl
            let method = 'POST'

            // Updation url and method
            if (params.id !== undefined) {
                url = SectorApiUrl + '/' + params.id
                method = 'PUT'
            }

            // APICall for create and update sectors
            AXIOS.service(url, method, data)
                .then((result) => {
                    if (result && result.status === 200) {
                        console.log(result.message);
                    } else {
                        setSuccessMessage(result.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        // }
    }

    // Function to add new row in experience tab
    const AddNewRow = () => {
        const rowsInput = 1;
        // Adding empty object for each row on add row click
        const rowData = {
            'level': levelsCount.length + 1,
            'from': '',
            'to': '',
        }
        setExperience([...experience, rowData])
        if (levelsCount !== undefined) {
            setLevelsCount([...levelsCount, rowsInput])
        }
    }

    // Function to delete each row in experience tab
    function DeleteRow(index) {
        // Remove data from experience data
        const rows = [...levelsCount];
        rows.splice(index, 1);
        setLevelsCount(rows);
        // Remove row from experience rows array
        const data = [...experience];
        data.splice(index, 1);
        setExperience(data);
    }


    return (
        <div className="right-container">
            {/* Success message popup */}
            {successMessage && <ModalPopup
                title={('SUCCESS')}
                body={(successMessage)}
                onHide={() => navigate('/manage-configurations/sectors')}
            ></ModalPopup>}
            {errorMessage && <ModalPopup
                title={('ERROR')}
                body={(errorMessage)}
                onHide={() => setErrorMessage('')}
            ></ModalPopup>}
            <div className="form-container my-5 border bg-white">
                <h2 id="text-indii-blue" className="col-md-12 p-3 mb-0 ml-2">{('Add Sectors')}</h2>

                <Tabs className={"mx-4 mt-3 border"} onSelect={(index) => setSelectedTab(index)}>
                    <TabList>
                        {TabsData.map((val) => {
                            return (
                                <Tab key={val.tabName} >{val.tabHeading}</Tab>
                            )
                        })}
                    </TabList>

                    <TabPanel>
                        <Forms
                            formTitle={''}
                            redirectURL={'/manage-configurations/sectors'}
                            changeCheckbox={changeCheckbox}
                            checkboxList={checkboxList}
                            field1={sector_name}
                            field2={paritair_committee}
                            field3={employee_type}
                            field4={category_number}
                            field5={sector_desc}
                            field6={sector_status}
                            error1={titleError}
                            error2={codeError}
                            error3={employeeTypeError}
                            error4={CategoryError}
                            SetValues={SetValues}
                            onSave={OnSave}
                            view={'sectors'}
                        ></Forms>
                    </TabPanel>

                    <TabPanel>
                        <div className="d-flex">
                            <div className="col-md-12 px-0 border pb-5">
                                <div className="row col-md-12 table-head-bg p-2 m-0">
                                    {ExperienceHeaders.map((head, i) => {
                                        return (
                                            <div className={head.style} key={head.title}>
                                                <p className="mb-0 font-weight-bold">{head.title}</p>
                                            </div>
                                        )
                                    })}
                                </div>

                                {levelsCount.map((val, index) => {
                                    return (
                                        <div className="row col-md-12 p-3 m-0 border-bottom" key={val}>
                                            <div className="col-md-4 pl-3">
                                                <p className="mb-0">{index + 1}</p>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="row m-0 justify-content-center">
                                                    <TextInput
                                                        title={''}
                                                        name={'from_range'}
                                                        CustomStyle={"col-md-4 float-left"}
                                                        required={false}
                                                        value={experience[index]['from'] ? experience[index]['from'] : undefined}
                                                        setValue={(e) => SetValues(e, 'from', index)}
                                                        error={''}
                                                    ></TextInput>
                                                    <TextInput
                                                        title={''}
                                                        name={'to_range'}
                                                        CustomStyle={"col-md-4 float-left"}
                                                        required={false}
                                                        value={experience[index]['to'] ? experience[index]['to'] : undefined}
                                                        setValue={(e) => SetValues(e, 'to', index)}
                                                        error={''}
                                                    ></TextInput>
                                                </div>
                                            </div>
                                            {index === levelsCount.length - 1 && <div className="col-md-4 text-right pr-4">
                                                {<img className="header-icon mr-4" src={AddIcon} onClick={() => AddNewRow()}></img>}
                                                {levelsCount.length > 1 && <img className="header-icon" src={DeleteIcon} onClick={() => DeleteRow()}></img>}
                                            </div>}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        {ageData.map((ageData, index) => {
                            return (
                                <TextInput
                                    key={ageData.age}
                                    title={ageData.label}
                                    name={ageData.age}
                                    CustomStyle={"col-md-4 my-5 mx-3"}
                                    required={true}
                                    value={age[ageData.age] ? age[ageData.age] : undefined}
                                    setValue={(e) => SetValues(e, 'age', ageData.age)}
                                    // error={''}
                                    age={true}
                                ></TextInput>
                            )
                        })}
                    </TabPanel>
                </Tabs>
                <div className={"col-md-12 my-4 text-right pr-2"}>
                    {(params.id !== undefined || (params.id === undefined && selectedTab === 2)) && <CustomButton buttonName={'Save'} ActionFunction={() => OnSave()} CustomStyle=""></CustomButton>}
                    <CustomButton buttonName={'Back'} ActionFunction={() => navigate('/manage-configurations/sectors')} CustomStyle="mr-3"></CustomButton>
                </div>
            </div>

        </div>
    )
}