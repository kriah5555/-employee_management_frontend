import React from "react";
import TextInput from "../atoms/formFields/TextInput";
import Dropdown from "../atoms/Dropdown";

export default function CompanyForm({view, field1, field2, field3, field4, field5, field6, field7, field8, SetValues}) {

return (
    <div className="">
        <form className="col-md-12 px-0">
    
            <TextInput
            title={field1.title}
            name={field1.name}
            placeholder={field1.placeholder}
            CustomStyle={"col-md-6 float-left" }
            required={field1.required}
            value={field1.value}
            setValue={(e) => SetValues(e, 1)}
            error={field1.error1}
            styleMargin={field1.error1 ? '' : (view === 'group_function' ? 'my-2' : 'mt-2 mb-1')}
            />
            
            {view !== 'location' && <Dropdown
                        options={field2.options}
                        selectedOptions={field2.selectedOptions}
                        onSelectFunction={(e) =>{SetValues(e, 2)}}
                        CustomStyle="col-md-6 float-left"
                        title={field2.title}
                        required={field2.required}
                        isMulti={field2.isMulti}
                        error={field2.error2}
                        styleMargin={field2.error2 ? '' : 'my-2'}
                    ></Dropdown>}
            {view !== 'location' &&  <TextInput
            title={field3.title}
            name={field3.name}
            placeholder={field3.placeholder}
            CustomStyle={"col-md-6 float-left" + (view === 'group_function' ? ' mt-4' : '')}
            required={field3.required}
            value={field3.value}
            setValue={(e) => SetValues(e, 3)}
            error={field3.error1}
            styleMargin={field3.error1 ? '' : (view === 'group_function' ? 'my-2' : 'mt-2 mb-1')}
            />}
              {view !== 'location' && field4 && <TextInput
            title={field4.title}
            name={field4.name}
            placeholder={field4.placeholder}
            CustomStyle={"col-md-6 float-left" + (view === 'group_function' ? ' mt-4' : '')}
            required={field4.required}
            value={field4.value}
            setValue={(e) => SetValues(e, 4 )}
            error={field4.error1}
            styleMargin={field4.error1 ? '' : (view === 'group_function' ? 'my-2' : 'mt-2 mb-1')}
            />}
             {view !== 'location' && field4 && <TextInput
            title={field5.title}
            name={field5.name}
            placeholder={field5.placeholder}
            CustomStyle={"col-md-6 float-left" + (view === 'group_function' ? ' mt-4' : '')}
            required={field5.required}
            value={field5.value}
            setValue={(e) => SetValues(e, 5)}
            error={field5.error1}
            styleMargin={field5.error1 ? '' : (view === 'group_function' ? 'my-2' : 'mt-2 mb-1')}
            />}  
             {view !== 'location' && field4 && <TextInput
            title={field6.title}
            name={field6.name}
            placeholder={field6.placeholder}
            CustomStyle={"col-md-6 float-left" + (view === 'group_function' ? ' mt-4' : '')}
            required={field6.required}
            value={field6.value}
            setValue={(e) => SetValues(e, 6)}
            error={field6.error1}
            styleMargin={field6.error1 ? '' : (view === 'group_function' ? 'my-2' : 'mt-2 mb-1')}
            />}  
        </form>
    </div>
);

}