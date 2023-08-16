import React,{useState} from "react";
import TextInput from "../components/atoms/formFields/TextInput";
import TextInputType2 from "../components/atoms/formFields/TextInputType2";
import Dropdown from "../components/atoms/Dropdown";
import AddIcon from "../static/icons/AddPlusIcon.png";
import DeleteIcon from "../static/icons/Delete.svg";
import CustomButton from "../components/atoms/CustomButton";

export default function Addlocation({locations,setLocations}) {
    

    const handleAddAnotherLocation =()=>{
        if(locations.length<=3) {

            setLocations([...locations,{location:"", loc_street:"", loc_HouseNum:"", loc_postal_code:"", loc_postbox_num:"", loc_city:"", loc_country:""}]);
        }
       
    }
    //add location fields
    const locationFieldsArray=[
        {title:"Location", name:"location", value:locations, placeholder:"Location", required:true, type:"input_field"},
        {title:"Street", name:"loc_street", value:locations, placeholder:"Street",  required:true, type:"input_field"},
        {title:"House Number", name:"loc_HouseNum", value:locations, placeholder:"House number", required:true, type:"input_field"},
        {title:"Postbox Number", name:"loc_postbox_num", value:locations,  placeholder:"Postbox number", required:true, type:"input_field"},
        {title:"Postal code", name:"loc_postal_code", value:locations, placeholder:"Postal code", required:true, type:"input_field"},
        {title:"City", name:"loc_city", value:locations,  placeholder:"City", required:true, type:"input_field"},
        {title:"Country", name:"loc_country", value:locations, placeholder:"Country", required:true, type:"input_field"},
    ]

    return(
        <>
        <form className="container-fluid mt-3">    
            <span className="form-subHeading">Add location</span>

          {  locations.map((x,i)=>{
            return(
                <div className="row border-bottom">
                {locationFieldsArray.map((field,index)=>{
                   
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
                                    const newLocation=[...locations];
                                    newLocation[i][name]=value;
                                     setLocations(newLocation);
                                }}
                                placeholder={field.placeholder}
                                error={field.error}/>
                           </div>
                            );
                        } 
                })}
                <div className="col-md-12 d-flex my-4 justify-content-end">
                 {locations.length>1&&<img className="shortcut-icon my-auto mx-5" onClick={()=>{
                        const newLocations=[...locations];
                        console.log(i);
                        newLocations.splice(i,1);
                        setLocations(newLocations);
                           }} src={DeleteIcon}></img>}
                {i==locations.length-1&&<img className="shortcut-icon my-auto " onClick={handleAddAnotherLocation} src={AddIcon}></img>}
                           </div>
                </div>
            );
          })}
          </form>
        </>
    );
}