

import { davinci } from './Davinci';
import { Dalle } from './Dalle';
import { callGptFromServer } from './callGptFromServer';
import { callOjFromServer } from './callOjFromServer';
import { callSearchGPT } from './callSearchGPT'

// commnon configs

const key = process.env.REACT_APP_OPEN_AI_KEY
let email;
if(typeof window !== 'undefined'){
const userData = JSON.parse(window.localStorage.getItem('userData'));
 email = userData && userData.hasOwnProperty('email') ? userData.email : null
}

const modelsManager = async (aiModel, cleanPrompt, updateMessage, setThinking) => {
  try{
    switch (aiModel) {
      case 'ChatGPT':
        await GPT(cleanPrompt, updateMessage, aiModel)
        break

      case 'SearchGPT':
        await SearchGPT(cleanPrompt, updateMessage, aiModel)
        break

      case 'OpenJourney':
        await OJ(cleanPrompt, updateMessage, aiModel)
        break

      case 'DALL·E':
        await DALL_E(cleanPrompt, updateMessage, aiModel)
        break

      case 'Davinci':
        await davinci(cleanPrompt, updateMessage, aiModel)
        break

      default:
        console.log("Not selected model")
    }
  }catch(e){
    alert("Server error, please try latter")
    console.error("model manager err : ", e)
  }

  setThinking(false);
}


// internal helpers

async function SearchGPT(cleanPrompt, updateMessage, aiModel){
  try{
    const data = await callSearchGPT(cleanPrompt, email)
    data && updateMessage(data, true, aiModel);
  }catch(e){
    alert("Search GPT not works, please try latter")
    console.log("GPT error: ", e)
  }
}

// GPT helper
async function GPT(cleanPrompt, updateMessage, aiModel){
  try{
    const data = await callGptFromServer(cleanPrompt, email)
    data && updateMessage(data, true, aiModel);
  }catch(e){
    alert("GPT not works, please try latter")
    console.log("GPT error: ", e)
  }
}

// OJ helper
async function OJ(cleanPrompt, updateMessage, aiModel){
  try{
    const data = await callOjFromServer(cleanPrompt, email)
    data && updateMessage(data, true, aiModel);
  }catch(e){
    alert("OJ not works, please try latter")
    console.log("OJ error: ", e)
  }
}

// Davinci call helper
async function Davinci(cleanPrompt, updateMessage, aiModel){
  if(!key)
    return alert("No admin Open AI key provied")
  const response = await davinci(cleanPrompt, key);
  const data = response.data.choices[0].message.content;
  data && updateMessage(data, true, aiModel);
}


// DALL E call helper
async function DALL_E(cleanPrompt, updateMessage, aiModel){
  if(!key)
    return alert("No admin Open AI key provied")
  const response = await Dalle(cleanPrompt, key);
  const data = response.data.data[0].url;
  data && updateMessage(data, true, aiModel);
}

export default modelsManager
