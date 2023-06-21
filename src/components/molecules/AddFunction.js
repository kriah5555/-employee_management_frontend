import React, { useState } from "react";
import CustomButton from "../atoms/CustomButton";
import { useNavigate } from "react-router-dom";
import TextInput from "../atoms/formFields/TextInput";
import TextArea from "../atoms/formFields/TextArea";
import CustomCheckBox from "../atoms/formFields/CustomCheckBox";

export default function AddFunction() {

    const navigate = useNavigate();
    const [active, setActive] = useState(true);
    const [inactive, setInactive] = useState(false);

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

    return (
        <div className="right-container d-inline">
            <div className="m-5 p-5 bg-white">
                <h2 id="text-indii-blue">Add Function</h2>
                <form className="form">
                    <div className="row pt-5">
                        <TextInput title={('Function title')} name={"function_title"} placeholder={"Enter function title"} required={true}></TextInput>
                        <TextInput title={('Function code')} name={"function_code"} placeholder={"Enter function code"} required={true}></TextInput>
                    </div>
                    <div className="row pt-5">
                        <TextArea title={('Function description')} name={'function_description'} required={true}></TextArea>
                    </div>
                    <div className="row pt-5">
                        <div className="col font-weight-bold">
                            <CustomCheckBox title={('status')} checkboxList={checkboxList} changeCheckbox={changeCheckbox} required={true}></CustomCheckBox>
                        </div>
                    </div>
                </form>
                <div className="row float-right">
                    <CustomButton buttonName={'Save'} ActionFunction={() => navigate('/settings')}></CustomButton>
                    <CustomButton buttonName={'Back'} ActionFunction={() => navigate('/settings')}></CustomButton>
                </div>
            </div>
        </div>
    )
}
