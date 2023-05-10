import { APICALL as AXIOS } from '../services/AxiosServices';
import {fetchTranslations} from '../routes/ApiEndPoints';
import { GET_CONSTANTS } from '../applicationConstants/AppConstants';
// statics handler

function translate(key) {
  let lang = localStorage.getItem('active_language') || 'en'
  return new Promise(function (resolve, reject) {
    let postData = {
      strings : JSON.stringify(key),
      token : localStorage.getItem('token'),
    }
    AXIOS.service(fetchTranslations,'POST', postData) // if string not exists, then store that in table
      .then(result => { 
        if (result && result.status === 200 ){
          let translation = result.data
          // let translation = result.data[0][lang][key]
          resolve(translation)
        }
    })
  });
}

export function t(key){
  let lang = localStorage.getItem('active_language') || 'en'
  let translated_str = localStorage.getItem('translations') && JSON.parse(localStorage.getItem('translations'))[lang][key] ? (JSON.parse(localStorage.getItem('translations')))[lang][key]:  GET_CONSTANTS[key]
  return translated_str
}

export async function GetTranslatedConstants() {
  let translations = localStorage.getItem('translations') ? JSON.parse(localStorage.getItem('translations')) : {'en':{}, 'nl':{}, 'fr':{}}
  let lang = localStorage.getItem('active_language') || 'en'
  let result  = await translate(GET_CONSTANTS);

  Object.keys(GET_CONSTANTS).map(async (key, index) => {
      translations['en'][key] = result[index]['en'][GET_CONSTANTS[key]];
      translations['nl'][key] = result[index]['nl'][GET_CONSTANTS[key]];
      translations['fr'][key] = result[index]['fr'][GET_CONSTANTS[key]];
      localStorage.setItem('translations', JSON.stringify(translations))
  });

  // localStorage.setItem('translations', JSON.stringify(translations))
  // Object.keys(GET_CONSTANTS).map(async (key, index) => {
  //     translations[lang][key] = await translate(GET_CONSTANTS[key])
  //     localStorage.setItem('translations', JSON.stringify(translations))
  // });
}


export default {  
  t,
}  
