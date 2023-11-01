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
import Dropdown from "../atoms/Dropdown";
import BackIcon from "../../static/icons/BackIcon.png";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { toast } from 'react-toastify';
import TimeInput from "../atoms/TimeInput";
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";

export default function AddSector() {

    const [active, setActive] = useState(true);
    const [inactive, setInactive] = useState(false);

    const [sectorName, setSectorName] = useState('');
    const [paritairCommittee, setParitairCommittee] = useState('');
    const [description, setDescription] = useState('');
    const [employeeType, setEmployeeType] = useState([]);
    const [categoryNumber, setCategoryNumber] = useState('');
    const [nightHourStartTime, setNightHourStartTime] = useState('');
    const [nightHourEndTime, setNightHourEndTime] = useState('');

    const [experience, setExperience] = useState([{ 'level': 0, 'from': '', 'to': '' }]);
    const [age, setAge] = useState([{ 'age': '', 'percentage': '', 'max_time_to_work': '' }])

    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState([]);

    const [emp_type_state, setEmpTypeState] = useState(true);
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

    const AgeHeaders = [
        { title: 'Age', style: 'col-md-3 pl-3' },
        { title: 'Salary percentage', style: 'col-md-3 text-center' },
        { title: 'MaxTime', style: 'col-md-3 text-center' },
        { title: 'Actions', style: 'col-md-3 text-right pr-5' },
    ]

    // Sectors tabs
    const TabsData = [
        { tabHeading: ("Information"), tabName: 'information' },
        { tabHeading: ("Experience"), tabName: 'experience' },
        { tabHeading: ("Age"), tabName: 'age' },
    ]

    const [ageRow, setAgeRow] = useState([1]);
    const ageData = []
    const MaximumAgeCount = 21;
    let ageCount = 15
    while (ageCount <= MaximumAgeCount) {
        ageData.push({ value: ageCount, label: ageCount })
        ageCount = ageCount + 1
    }


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
                if (result?.success && result.data.length !== employeeTypeList.length) {
                    result.data.map((val, index) => {
                        employeeTypeList.push({ value: val.id, label: val.name })
                    })
                } else {
                    setErrors(result.message)
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
                    if (result?.success) {
                        setEmployeeType(getFormattedDropdownOptions(result.data.employee_types));
                        setSectorName(result.data.name);
                        setParitairCommittee(result.data.paritair_committee);
                        setDescription(result.data.description ? result.data.description : '');
                        setCategoryNumber({ value: result.data.category, label: result.data.category })
                        setExperience(result.data.salary_config.salary_steps);
                        setLevelsCount(result.data.salary_config.salary_steps)
                        setAge(result.data.sector_age_salary);
                        setAgeRow(result.data.sector_age_salary);

                        if (result.data.status) { setActive(true) } else { setInactive(true); setActive(false) }
                    } else {
                        setErrors(result.message)
                    }
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

    const night_shift_start = {
        title: "Night shift strart time",
        type: 'night_hour_start_time',
        value: nightHourStartTime,
        required: true
    }

    const night_shift_end = {
        title: "Night shift end time",
        type: "night_hour_end_time",
        value: nightHourEndTime,
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
        } else if (type === 2) {
            setParitairCommittee(value);
        } else if (type === 3) {
            setEmployeeType(value);
        } else if (type === 4) {
            setCategoryNumber(value);
        } else if (type === 'from') {
            const data = [...experience];
            data[index]['from'] = value
            setExperience(data);
        } else if (type === 'to') {
            const data = [...experience];
            data[index]['to'] = value
            setExperience(data);
        } else if (type === 'age') {
            const data = [...age];
            data[index]['age'] = value.value
            setAge(data);
        } else if (type === 'salary') {
            const data = [...age];
            data[index]['percentage'] = value
            setAge(data);
        } else if (type === 'max_time') {
            const data = [...age];
            data[index]['max_time_to_work'] = value
            setAge(data);
            // setHourMin(value);
        } else if (type === 'night_hour_start_time') {
            setNightHourStartTime(value)
        } else if (type === 'night_hour_end_time') {
            setNightHourEndTime(value)
        }
        else {
            setDescription(value);
        }
    }

    // Function for onSubmit for creating and updating sectors
    const OnSave = () => {
        if (sectorName && paritairCommittee && categoryNumber && employeeType.length !== 0) {
            // Request params
            let status = 1
            if (inactive) { status = 0 }
            let emp_type_ids = []
            employeeType.map((val, index) => {
                emp_type_ids.push(val.value)
            })
            let age_arr = age
            if (age.length === 1 && age[0].age === '') {
                age_arr = []
            }

            let data = {
                'name': sectorName,
                'paritair_committee': paritairCommittee,
                'description': description,
                'employee_types': emp_type_ids,
                'category': categoryNumber.value,
                'night_hour_start_time': nightHourStartTime,
                'night_hour_end_time': nightHourEndTime,
                'status': status,
                'experience': experience,
                'age': age_arr
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
                    if (result?.success) {
                        // setSuccessMessage(result.message);
                        navigate('/manage-configurations/sectors');
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
        } else {
            setErrors(['Please fill required fields'])
        }
    }

    // Function to add new row in experience/age tab
    const AddNewRow = (type) => {
        const rowsInput = 1;
        // Adding empty object for each row on add row click
        if (type !== 'age') {
            const rowData = {
                'level': levelsCount.length,
                'from': '',
                'to': '',
            }
            setExperience([...experience, rowData])
            if (levelsCount !== undefined) {
                setLevelsCount([...levelsCount, rowsInput])
            }
        } else {
            const rowData = {
                'age': '',
                'percentage': '',
            }
            setAge([...age, rowData])
            if (ageRow !== undefined) {
                setAgeRow([...ageRow, rowsInput])
            }
        }
    }

    // Function to delete each row in experience/age tab
    function DeleteRow(index, type) {
        if (type !== 'age') {
            // Remove data from experience data
            const rows = [...levelsCount];
            rows.splice(index, 1);
            setLevelsCount(rows);
            // Remove row from experience rows array
            const data = [...experience];
            data.splice(index, 1);
            setExperience(data);
        } else {
            // Remove data from age data
            const rows = [...ageRow];
            rows.splice(index, 1);
            setAgeRow(rows);
            // Remove row from age rows array
            const data = [...age];
            data.splice(index, 1);
            setAge(data);
        }
    }


    return (
        <div className="right-container">
            {/* Success message popup */}
            {/* {successMessage && <ModalPopup
                title={('SUCCESS')}
                body={(successMessage)}
                onHide={() => navigate('/manage-configurations/sectors')}
            ></ModalPopup>} */}
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={('Validation error!')}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            <div className="form-container my-5 border bg-white">
                <h2 id="text-indii-blue" className="col-md-12 p-3 mb-0 ml-2"><img className="shortcut-icon mr-2 mb-1" onClick={() => navigate("/manage-configurations/sectors")} src={BackIcon}></img>{('Add Sectors')}</h2>

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
                            field8={night_shift_start}
                            field9={night_shift_end}
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
                                                <p className="mb-0">{index}</p>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="row m-0 justify-content-center">
                                                    <TextInput
                                                        title={''}
                                                        name={'from_range'}
                                                        CustomStyle={"col-md-4 float-left"}
                                                        required={false}
                                                        value={experience[index]['from'] !== '' ? experience[index]['from'] : undefined}
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
                                                {<img className="header-icon mr-4" src={AddIcon} onClick={() => AddNewRow('experience')}></img>}
                                                {levelsCount.length > 1 && <img className="header-icon" src={DeleteIcon} onClick={() => DeleteRow(index, 'experience')}></img>}
                                            </div>}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className="d-flex">
                            <div className="col-md-12 px-0 border pb-5">
                                <div className="row col-md-12 table-head-bg p-2 m-0">
                                    {AgeHeaders.map((head, i) => {
                                        return (
                                            <div className={head.style} key={head.title}>
                                                <p className="mb-0 font-weight-bold">{head.title}</p>
                                            </div>
                                        )
                                    })}
                                </div>

                                {ageRow.map((val, index) => {
                                    return (
                                        <div className="row col-md-12 p-3 m-0 border-bottom" key={val}>
                                            <div className="col-md-3 pl-0">
                                                <Dropdown
                                                    options={ageData}
                                                    selectedOptions={[{ value: age[index]['age'], label: age[index]['age'] }]}
                                                    onSelectFunction={(e) => SetValues(e, 'age', index)}
                                                    CustomStyle="col-md-4 pl-0 float-left"
                                                    title={''}
                                                    required={false}
                                                    isMulti={false}
                                                    error={''}
                                                    styleMargin={''}
                                                ></Dropdown>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="row m-0 justify-content-center">
                                                    <TextInput
                                                        key={ageData.age}
                                                        title={''}
                                                        name={ageData.age}
                                                        CustomStyle={"col-md-5 float-left"}
                                                        required={false}
                                                        value={age[index]['percentage'] ? age[index]['percentage'] : undefined}
                                                        setValue={(e) => SetValues(e, 'salary', index)}
                                                        // error={''}
                                                        age={true}
                                                    ></TextInput>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="row m-0 justify-content-center">
                                                    <TimeInput
                                                        setTime={(e) => SetValues(e, 'max_time', index)}
                                                        value={age[index]['max_time_to_work']}
                                                        type="max_time"
                                                        index={index}
                                                        customStyle='col-5'
                                                    ></TimeInput>
                                                </div>
                                            </div>
                                            {index === ageRow.length - 1 && <div className="col-md-3 text-right pr-4">
                                                {<img className="header-icon mr-4" src={AddIcon} onClick={() => AddNewRow('age')}></img>}
                                                {ageRow.length > 1 && <img className="header-icon" src={DeleteIcon} onClick={() => DeleteRow(index, 'age')}></img>}
                                            </div>}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </TabPanel>

                    {/* <TabPanel>
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
                    </TabPanel> */}
                </Tabs>
                <div className={"col-md-12 my-4 text-right pr-2"}>
                    {(params.id !== undefined || (params.id === undefined && selectedTab === 2)) && <CustomButton buttonName={'Save'} ActionFunction={() => OnSave()} CustomStyle=""></CustomButton>}
                    <CustomButton buttonName={'Back'} ActionFunction={() => navigate('/manage-configurations/sectors')} CustomStyle="mr-3"></CustomButton>
                </div>
            </div>

        </div>
    )
}