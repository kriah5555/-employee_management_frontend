import React,{useEffect, useState} from "react";
import TextInput from "../components/atoms/formFields/TextInput";
import TextInputType2 from "../components/atoms/formFields/TextInputType2";
import Dropdown from "../components/atoms/Dropdown";
import AddIcon from "../static/icons/add.png"
import CustomButton from "../components/atoms/CustomButton";
import { Link } from "react-router-dom";
import  AddLocation from "../components/molecules/LocationForm";
import CompanyForm from "../components/molecules/CompanyForm";
export default function AddCompany() {

  
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
    const [step, setStep]=useState(1);
    const [titleError, SetTitleError] = useState('');
    const [sectorError, setSectorError] = useState('');
    const [locations, setLocations]=useState([{
        location:"",
        loc_street:"",
        loc_HouseNum:"",
        loc_postal_code:"",
        loc_postbox_num:"",
        loc_city:"",
        loc_country:"",
    }]);
     //data from api
    const options = [{value:1,label:"A"},{value:2,label:"B"},{value:3,label:"C"},{value:4,label:"D"}];

   const nextStep=()=>{
    if(step<=1 && companyName!=="" && sector.length!==0 && street!=="" && houseNum !=="" && postalCode !=="" && city!=="" && country!=="" && name!=="" && email!=="" && telephone!=="") {
       
        setStep(step+1);
    } else {
        console.log(step);
        setErrorMessage("Required");
    }
    
   }
   const prevStep=()=>{
    if(step>1){
        setStep(step-1);
    }
   }

    const onSectorChange=(e)=>{

        setSector(e);
        console.log(sector);
    }

    const handleSubmit =()=>{

    if(companyName===""&& sector.length===0 && street=="" && houseNum==""&& postalCode==""&& city==""&&country==""&&name==""&&email==""&& telephone=="") {
            setErrorMessage("Required");
        } else {
            setErrorMessage("");
             // Create an object with the form data  
            const companyData = {
                company_name: companyName,
                sector:sector,
                employerId:employerId,
                senderNumber:senderNumber,
                username:username,
                jointComissionNum:jointComissionNum,
                RSZNumber:RSZNumber,
                socialSecretaryNumber:socialSecretaryNumber,
                street: street,
                house_num: houseNum,
                postal_code: postalCode,
                city: city,
                country: country,
                name: name,
                email: email,
                telephone: telephone,
                locations:locations,
            };
            // Log the form data for now
            console.log(companyData);
        }
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
        { className:"col-md-6 mt-4", title:"Postbox Number", name:"postbox_num", value:postboxNum, setValue:setPostboxNum, placeholder:"Postbox number", error:postboxNum?"":error, required:true, type:"input_field"},
        { className:"col-md-6 mt-4", title:"Postal code", name:"postal_code", value:postalCode, setValue:setPostalCode, placeholder:"Postal code", error:postalCode?"":error, required:true, type:"input_field"},
        { className:"col-md-6 mt-4", title:"City", name:"city", value:city, setValue:setCity, placeholder:"City", error:city?"":error, required:true, type:"input_field"},
        { className:"col-md-6 mt-4", title:"Country", name:"country", value:country, setValue:setCountry, placeholder:"Country", error:country?"":error, required:true, type:"input_field"},
    ];

   // responsible person fields for company
    const companyResponsiblePersonFieldsArray=[
        {className:"col-md-6 mb-4",title:"Name" ,name:"name", required:true, value:name, setValue:setName, placeholder:"Name", error:name?"":error},
        {className:"col-md-6 mb-4",title:"Email Id" ,name:"email", required:true, value:email, setValue:setEmail, placeholder:"Email Id", error:email?"":error},
        {className:"col-md-6 mb-4",title:"Telephone number" ,name:"telephone", required:true, value:telephone, setValue:setTelephone, placeholder:"Telephone number", error:telephone?"":error},
    ];

    const SetValues = (value, type, index) => {
        if (type === 1) {
            setCompanyName(value);
            if (value === '') { SetTitleError('Required'); } else { SetTitleError(''); }
        } else if (type === 2) {
            setSector(value);
         //console.log(value);
       
         console.log(sector);
            if (value.length>0) { setSectorError('');} else { setSectorError('Required');}
            // console.log(sector);
        } else if (type===3) {
            setEmployerId(value);
        }
    }
    const field1={title:"Company name", name:"company_name", value:companyName, placeholder:"Company name", error1:titleError, required:true, type:"input_field"}
    const field2={title:"Sector name", options:options, isMulti:true, selectedOptions:sector, onSelectFunction:onSectorChange, error2:sectorError, required:true, type:"dropdown"}
    const field3={title:"Employer ID", name:"employer_id", value:employerId, placeholder:"Employer id", error1:titleError, required:true, type:"input_field"}

    return (
        <div className="right-container d-block">
        <div className="m-3 border bg-white">
         {step==1&& <form className="container-fluid mt-3">    
            <span className=" d-block form-subHeading">Add company</span>
            <div className="row">
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
            <div className="row mx-auto my-4 form-subHeading ">Responsible Person</div>
            <div className="row">
            {companyResponsiblePersonFieldsArray.map((field,index)=>{
              return (  <div className={field.className}>
                    <TextInput title={field.title} name={field.name} required={field.required} value={field.value}  setValue={field.setValue} placeholder={field.placeholder} error={field.error}/>
                </div>);
                })}
            </div>
          </form>}
         {step==1&&<CompanyForm field1={field1} SetValues={SetValues} field2={field2} field3={field3} />}
          {step==2 && <AddLocation locations={locations} setLocations={setLocations}/>}
        </div> 
        <div className="container-fluid">
        <div className="row justify-content-between bg-right-container">
          <Link to="/manage-companies" className="dark-color text-decoration-none m-4"><strong className="border-bottom">BACK</strong></Link>
         {step>1&&<CustomButton buttonName="Prev" ActionFunction={prevStep} CustomStyle="button-confirm m-4"/>}
          <CustomButton buttonName="Next" ActionFunction={nextStep} CustomStyle="button-confirm m-4"/>
           {step==2&&<CustomButton buttonName="CONFIRM" ActionFunction={handleSubmit} CustomStyle="button-confirm m-4"/>} 
          </div>
        </div>
    </div>
    );
}