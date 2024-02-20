import React, { useEffect, useState } from "react";
import Forms from "../molecules/Forms";
import { GroupFunctionApiUrl, SectorApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { useNavigate, useParams } from "react-router-dom";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { toast } from 'react-toastify';
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";
import { t } from "../../translations/Translation";

export default function AddGroupFunction() {

    const [active, setActive] = useState(true);
    const [inactive, setInactive] = useState(false);

    const [sector, setSector] = useState('');
    const [description, setDescription] = useState('');
    const [functionCategory, setFunctionCategory] = useState('');
    const [groupName, setGroupName] = useState('')
    const [errors, setErrors] = useState([]);

    const [sectorList, setSectorList] = useState([])
    const [categories, setCategories] = useState()
    const [categoriesList, setCategoriesList] = useState([]);

    const navigate = useNavigate();
    const params = useParams();

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
            name: t("ACTIVE"),
            key: 'active',
            checked: active,
        },
        {
            name: t("INACTIVE"),
            key: 'inactive',
            checked: inactive,
        }
    ]


    const SetFunctionCategoryOptions = (sector_id) => {
        let editApiUrl = SectorApiUrl + '/' + sector_id
        let arr = [];
        AXIOS.service(editApiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    let count = 1
                    let max = result.data.category
                    while (count <= max) {
                        arr.push({ value: count, label: count })
                        count = count + 1
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
        setCategoriesList(arr);
    }

    //Fetch dropdown data of sectors
    useEffect(() => {
        let addApiUrl = GroupFunctionApiUrl + '/create'
        AXIOS.service(addApiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    setSectorList(getFormattedDropdownOptions(result.data.sectors));
                    setCategories(result.data.categories);
                } else {
                    setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    // Fetch group function data based on param id to add default inputs
    useEffect(() => {
        if (params.id) {
            let editApiUrl = GroupFunctionApiUrl + '/' + params.id
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        setGroupName(result.data.name);
                        setDescription(result.data.description ? result.data.description : '');
                        setFunctionCategory({ value: result.data.category, label: result.data.category });
                        setSector(getFormattedDropdownOptions(result.data.sector));
                        SetFunctionCategoryOptions(result.data.sector.id)
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
    if (params.id && groupName === '') {
        return
    }


    // Fields data
    const group_function_name = {
        title: t("GROUP_FUNCTION_NAME"),
        name: 'function_name',
        placeholder: t("ENTER_FUNCTION_NAME"),
        required: true,
        value: groupName,
    }
    const sectors = {
        title: t("SECTOR"),
        name: 'sector',
        placeholder: '',
        required: true,
        value: sector,
        options: sectorList,
        isMulti: false
    }
    const function_category = {
        title: t("FUNCTION_CATEGORY"),
        name: 'function_category',
        placeholder: '',
        required: true,
        value: functionCategory,
        options: categoriesList,
        isMulti: false
    }
    const group_function_desc = {
        title: t("DESCRIPTION"),
        name: 'sector_desc',
        required: false,
        value: description
    }
    const group_function_status = {
        title: t("STATUS_TEXT"),
        required: true
    }


    // Type:
    // 1: Group function name
    // 3: Sector
    // 4: Function category
    // 5: Description
    // 6: Active status

    const SetValues = (value, type) => {
        if (type === 1) {
            setGroupName(value);
        } else if (type === 3) {
            SetFunctionCategoryOptions(value.value)
            setSector(value);
            setFunctionCategory("")
        } else if (type === 4) {
            setFunctionCategory(value);
        } else {
            setDescription(value);
        }
    }


    // On submit function for create and update group function
    const OnSave = () => {
        if (groupName && sector && functionCategory) {
            let status = 1
            if (inactive) { status = 0 }

            let data = {
                'name': groupName,
                'category': functionCategory.value,
                'description': description,
                'sector_id': sector.value,
                'status': status
            }

            // Creation url and method
            let url = GroupFunctionApiUrl
            let method = 'POST'

            // Updation url and method
            if (params.id !== undefined) {
                url = GroupFunctionApiUrl + '/' + params.id
                method = 'PUT'
            }

            // APICall for creating and updating group function
            AXIOS.service(url, method, data)
                .then((result) => {
                    if (result?.success) {
                        navigate('/manage-configurations/group_functions');
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
            setErrors([t("PLEASE_FILL_REQUIRED_FIELDS")])
        }
    }

    return (
        <div className="right-container">
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={t("VALIDATION_ERROR") + ("!")}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            <Forms
                formTitle={t("ADD_GROUP_FUNCTION")}
                redirectURL={'/manage-configurations/group_functions'}
                changeCheckbox={changeCheckbox}
                checkboxList={checkboxList}
                field1={group_function_name}
                field3={sectors}
                field4={function_category}
                field5={group_function_desc}
                field6={group_function_status}
                SetValues={SetValues}
                onSave={OnSave}
                view={'group_function'}
            ></Forms>
        </div>
    )
}