import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { t } from "../../translations/Translation";
import FormsNew from "./FormsNew";
import DeleteIcon from "../../static/icons/Delete.svg";
import AddIcon from "../../static/icons/AddPlusIcon.png";



export default function CreateShifts({ SaveShift, setShiftPopupOpen, shiftData, setShiftData }) {

    const [rowArr, setRowArr] = useState(shiftData.shifts.length === 0 ? [1] : [...shiftData.shifts, 1]);

    const planFields = [
        { title: t("START_TIME"), name: "start_time", required: true, type: "time", style: "col-md-4 mt-2 float-left" },
        { title: t("END_TIME"), name: "end_time", required: true, type: "time", style: "col-md-4 mt-2 float-left" },
        { title: t("CONTRACT_HOURS"), name: 'contract_hours', required: true, type: 'text', style: "col-md-4 mt-2 float-left" },
    ]

    const setValues = (index, name, value, field) => {
        const shift_data = { ...shiftData };

        if (shift_data['shifts']?.length === 0) {
            shift_data['shifts'][index] = {}
            shift_data['shifts'][index][name] = value
        } else {
            shift_data['shifts'][index] = shift_data['shifts'][index] ? shift_data['shifts'][index] : {}
            shift_data['shifts'][index][name] = value
        }
        setShiftData(shift_data);
    }

    const AddRemovePlanRow = (val, index) => {
        if (val === 'add') {
            let arrData = [...rowArr]
            arrData.push(1);
            setRowArr(arrData);

            // let shiftsarr = {...shiftData}
            // shiftsarr.shifts.push(
            //     {
            //         "start_time": "",
            //         "end_time": "",
            //         "contract_hours": ""
            //     }
            // )
            // setShiftData(shiftsarr)
        } else {
            let arrData = [...rowArr]
            arrData.splice(index, 1);
            setRowArr(arrData);

            let shiftsarr = { ...shiftData }
            shiftsarr.shifts.splice(index, 1)
            setShiftData(shiftsarr)
        }

    }

    return (
        <Modal
            show={true}
            onHide={() => setShiftPopupOpen(false)}
            size="xl"
            className=""
            aria-labelledby="contained-modal-title-vcenter"
            centered
            keyboard={true}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className='container' >
                    {t("ADD_EDIT_SHIFTS")}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {rowArr.map((row, index) => {
                    return (
                        <div key={row} className="col-md-12 d-flex mb-3">
                            <div className="col-md-10 ml-2 p-0 border">
                                <FormsNew
                                    view="filters"
                                    planIndex={index}
                                    data={planFields}
                                    SetValues={setValues}
                                    formattedData={shiftData['shifts']}
                                />
                            </div>
                            <div className="col-md-1 ml-4 px-3 text-center py-4 border">
                                <img className="shortcut-icon pointer" src={rowArr.length - 1 === index ? AddIcon : DeleteIcon}
                                    onClick={() => AddRemovePlanRow(rowArr.length - 1 === index ? 'add' : 'remove', index)}></img>
                            </div>
                        </div>
                    )
                })}
            </Modal.Body>
            <Modal.Footer>
                <Button className='button-style float-left' onClick={() => { SaveShift() }}> {/*setPlanPopup(false); */}
                    {t("SAVE")}
                </Button>
                <Button className='button-style' onClick={() => setShiftPopupOpen(false)}>
                    {t('CLOSE')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
