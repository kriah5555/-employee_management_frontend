import React,{useState} from "react";
import TextInput from "../atoms/formFields/TextInput";
import Dropdown from "../atoms/Dropdown";
import CustomButton from "../atoms/CustomButton";
import { useNavigate } from "react-router-dom";

export default function AddCompanyForm() {

  
    const [companyName, setCompanyName] = useState("");
    const [sector, setSector] = useState([]);
    const [employerId,setEmployerId]=useState("");
    const [senderNumber, setSenderNumber]=useState("");
    const [username, setUsername]=useState("");
    const [jointComissionNum, setJointComissionNum]=useState("");
    const [RSZNumber, setRSZNumber]=useState("");
    const [socialSecretaryNumber, setSocialSecretaryNumber]=useState("");
    const [street, setStreet] = useState("");
    const [houseNum, setHouseNum] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [postboxNum, setPostboxNum]=useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [error,setErrorMessage] = useState("");

    const navigate = useNavigate();
 
     //data from api
     const options = [{value:1,label:"A"},{value:2,label:"B"},{value:3,label:"C"},{value:4,label:"D"}];

   
    const onSectorChange=(e)=>{
        setSector(e);
    }

   
    //add company fields 
    const addCompanyFieldsArray=[
        {title:"Company name", name:"company_name", value:companyName, setValue:setCompanyName, placeholder:"Company name", error:companyName?"":error, required:true, type:"input_field"},
        {title:"Sector name", options:options, isMulti:true, selectedOptions:sector ,onSelectFunction:onSectorChange, error: (sector.length > 0)?"":error,required:true, type:"dropdown"},
        {title:"Employer Id", name:"employer_id", value:employerId, setValue:setEmployerId, placeholder:"Employer id", error:``,required:false, type:"input_field"},
        {title:"Sender number", name:"sender_name", value:senderNumber, setValue:setSenderNumber ,placeholder:"Sender number", error:``,required:false, type:"input_field"},
        {title:"Username", name:"username", value:username, setValue:setUsername ,placeholder:"Username", error:``,required:false, type:"input_field"},
        {title:"Joint comission number", name:"jointComissionNum", value:jointComissionNum, setValue:setJointComissionNum ,placeholder:"joint comission number", error:``,required:false, type:"input_field"},
        {title:"RSZ number", name:"RSZNumber", value:RSZNumber, setValue:setRSZNumber ,placeholder:"RSZ number", error:``,required:false, type:"input_field"},
        {title:"Social secretary number", name:"socialSecretaryNumber", value:socialSecretaryNumber, setValue:setSocialSecretaryNumber ,placeholder:"Social secretary number", error:``,required:false,type:"input_field"},
    ];
    //adress fields for company
    const companyAddressFieldsArray=[
        { className:"col-md-12 d-block", title:"Street", name:"street", value:street, setValue:setStreet, placeholder:"Street", error:street?"":error, required:true, type:"input_field"},
        { className:"col-md-6 mt-4", title:"House Number", name:"house_num", value:houseNum, setValue:setHouseNum, placeholder:"House number", error:houseNum?"":error, required:true, type:"input_field"},
        { className:"col-md-6 mt-4", title:"Postal code", name:"postal_code", value:postalCode, setValue:setPostalCode, placeholder:"Postal code", error:postalCode?"":error, required:true, type:"input_field"},
        { className:"col-md-6 mt-4", title:"Postbox Number", name:"postbox_num", value:postboxNum, setValue:setPostboxNum, placeholder:"Postbox number", error:postboxNum?"":error, required:true, type:"input_field"},
        { className:"col-md-6 mt-4", title:"City", name:"city", value:city, setValue:setCity, placeholder:"City", error:city?"":error, required:true, type:"input_field"},
        { className:"col-md-6 mt-4", title:"Country", name:"country", value:country, setValue:setCountry, placeholder:"Country", error:country?"":error, required:true, type:"input_field"},
    ];

    //responsible person fields for company
    const companyResponsiblePersonFieldsArray=[
        {className:"col-md-6 mb-4",title:"Name" ,name:"name", required:true, value:name, setValue:setName, placeholder:"Name", error:name?"":error},
        {className:"col-md-6 mb-4",title:"Email Id" ,name:"email", required:true, value:email, setValue:setEmail, placeholder:"Email Id", error:email?"":error},
        {className:"col-md-6 mb-4",title:"Telephone number" ,name:"telephone", required:true, value:telephone, setValue:setTelephone, placeholder:"Telephone number", error:telephone?"":error},
    ];

    return (
        
        <form className="container-fluid mt-3">    
            {/* <span className=" d-block form-subHeading">Add company</span> */}
            <div className="row" m-0>
            {addCompanyFieldsArray.map((field,index)=>{
                
                if(field.type=="input_field") {
                    return(
                        <div key={index} className="col-md-6 p-3">
                       <TextInput
                        title={field.title} name={field.name}
                        required={field.required}
                        value={field.value}
                        setValue={field.setValue}
                        placeholder={field.placeholder}
                        error={field.error}/>
                   </div>
                    );
                } else if (field.type=="dropdown"){
                   return(
                    <div key={index} className="col-md-6">
                     <Dropdown 
                      options={field.options}
                      title={field.title}
                      required={field.required}
                      isMulti={field.isMulti}
                      selectedOptions={field.selectedOptions}
                      onSelectFunction={field.onSelectFunction}
                      error={field.error} />
                    </div>
                   );
                }
            })}
            </div>
            <span className="d-block my-4 form-subHeading ">Address</span>
            <div className="row">
            {companyAddressFieldsArray.map((field,index)=>{
                
                if(field.type=="input_field") {
                    return(
                        <div className={field.className}>
                       <TextInput title={field.title} name={field.name} required={field.required} value={field.value}  setValue={field.setValue} placeholder={field.placeholder} error={field.error}/>
                   </div>
                    );
                }
            })}
            </div>
            <div className="row mx-auto my-4 form-subHeading">Responsible Person</div>
            <div className="row">
            {companyResponsiblePersonFieldsArray.map((field,index)=>{
              return (  <div className={field.className}>
                    <TextInput title={field.title} name={field.name} required={field.required} value={field.value}  setValue={field.setValue} placeholder={field.placeholder} error={field.error}/>
                </div>);
                })}
            </div>
            <CustomButton buttonName={'Back'} ActionFunction={() => navigate('/manage-companies')} CustomStyle="mr-3 float-right mb-2"></CustomButton>

          </form>
          
    );
}       