import React from "react";
import TextInputType2 from "../atoms/formFields/TextInputType2";
import Dropdown from "../atoms/Dropdown";
import AddIcon from "../../static/icons/AddPlusIcon.png";
import DeleteIcon from "../../static/icons/Delete.svg";

export default function WorkstationForm({workstations,setWorkstations}){

    const handleAddAnotherWorkstation=()=>{
           
            setWorkstations([...workstations,{ workstations_name:"", blocked:"", sequence_num:"", addFunctiions:[]}]);
        }

    //options for blocked state
    const options = [{value:1,label:"Yes"},{value:0,label:"No"}];
    //function options api data
    const functionOptions = [{value:1,label:"function 1"},{value:2,label:"function 2"},{value:3,label:"function 3"},{value:4,label:"function 4"}];
    
    const onBlockedStatusChange =(e)=>{
        
        console.log(e);
    }
    const onFunctionsChange = (e)=>{
        setWorkstations();
    }

    const workstationFieldsArray=[
        {title:"Workstation name", name:"workstation_name", value:workstations, placeholder:"Workstation name", required:true, type:"input_field"},
        {title:"Workstation blocked", name:"blocked", options:options, isMulti:false, selectedOptions:workstations ,onSelectFunction:onBlockedStatusChange, required:true, type:"dropdown"},
        {title:"Sequence Number", name:"sequence_num", value:workstations, placeholder:"Sequence number", required:true, type:"input_field"},
        {title:"Add functions", name:"addFunctions", options:functionOptions, isMulti:true, selectedOptions:workstations ,onSelectFunction:onFunctionsChange, required:true, type:"dropdown"},
    ];
    return(
        <>
        <form className="container-fluid mt-3">    
            {/* <span className="form-subHeading">Add Workstation</span> */}
            {workstations.map((x,i)=>{
                 return(
                    <div className="row border-bottom">
                       
                    {workstationFieldsArray.map((field,index)=>{
                            if(field.type=="input_field") {
                                return(
                                    <div key={index} className="col-md-6 p-3">
                                   <TextInputType2
                                    title={field.title}
                                    name={field.name}
                                    required={field.required}
                                    value={(field.value[i][field.name])}
                                    onChange={(e)=>{
                                         const {name, value}=e.target;
                                        const newWorkstation=[...workstations];
                                        newWorkstation[i][name]=value;
                                         setWorkstations(newWorkstation);
                                    }}
                                    placeholder={field.placeholder}
                                    error={field.error}/>
                               </div>
                                );
                            } else if(field.type=="dropdown") {
                                return(
                                    <div key={index} className="col-md-6">
                                     <Dropdown 
                                      options={field.options}
                                      title={field.title}
                                      required={field.required}
                                      isMulti={field.isMulti}
                                      selectedOptions={field.selectedOptions[i][field.name]}
                                      onSelectFunction={(e)=>{
                                        const newWorkstation=[...workstations];
                                        newWorkstation[i][field.name]=e;
                                         setWorkstations(newWorkstation);
                                         console.log(workstations);
                                      }}
                                      error={field.error} />
                                    </div>
                                   );
                            }
                    })}
                    <div className="col-md-12 d-flex my-4 justify-content-end">
                     {workstations.length>1&&<img className="shortcut-icon my-auto mx-5" onClick={()=>{
                            const newWorkstation=[...workstations];
                            console.log(i);
                            newWorkstation.splice(i,1);
                            setWorkstations(newWorkstation);
                               }} src={DeleteIcon}></img>}
                    {i==workstations.length-1&&<img className="shortcut-icon my-auto " onClick={handleAddAnotherWorkstation} src={AddIcon}></img>}
                               </div>
                    </div>
                );
            })}
         </form>
        </>
    );
}
