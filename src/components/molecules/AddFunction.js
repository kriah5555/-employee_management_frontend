import React, { useState } from "react";
import CustomButton from "../atoms/CustomButton";
import { useNavigate } from "react-router-dom";

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

    return (
        <div className="right-container d-inline">
            <div className="m-5 p-5 bg-white">
                <h2 id="text-indii-blue">Add Function</h2>
                <form className="form">
                    <div className="row pt-5">
                        <div className="col font-weight-bold">
                            <label className="row m-0 mb-1">{('Function title')} <p className="text-danger mb-0">&nbsp;*</p> </label>
                            <input type="text" className="form-control" placeholder="Enter function title " name="function_title" />
                        </div>
                        <div className="col font-weight-bold">
                            <label className="row m-0 mb-1">{('Function code')} <p className="text-danger mb-0">&nbsp;*</p> </label>
                            <input type="text" className="form-control" placeholder="Enter function code" name="function_code" />
                        </div>
                    </div>
                    <div className="row pt-5">
                        <div className="col font-weight-bold">
                            <label className="row m-0 mb-1">{('Function description')} <p className="text-danger mb-0">&nbsp;*</p> </label>
                            <textarea className="form-control" name="function_title" rows={4} />
                        </div>
                    </div>
                    <div className="row pt-5">
                        <div className="col font-weight-bold">
                            <label className="row m-0 mb-1">{('Status')} <p className="text-danger mb-0">&nbsp;*</p> </label>
                            <div className={"custom-control custom-checkbox mt-2 top-mar"}>
                                <input type="checkbox" className="custom-control-input" id="active" name="active" checked={active} onChange={() => changeCheckbox('active')} />
                                <label className="custom-control-label font-weight-normal" for="active">{("Active")}</label>
                            </div>
                            <div className={"custom-control custom-checkbox mt-2 top-mar"}>
                                <input type="checkbox" className="custom-control-input" id="inactive" name="inactive" checked={inactive} onChange={() => changeCheckbox('inactive')} />
                                <label className="custom-control-label font-weight-normal" for="inactive">{("Inactive")}</label>
                            </div>
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
