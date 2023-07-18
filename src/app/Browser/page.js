"use client"
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faSearch } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
const Browser = () => {
  const [URLValue, setURLValue] = useState("");
  const [URL, setaURL] = useState([...URLValue]);
  const pattern =
  /(https:\/\/www\.\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
  const Iframeurl = () => {
    // if(pattern.test(URLValue)){
    //   alert("true")
    // }else{
    //   alert("false")
    // }
    setaURL(URLValue);
  
  };
  const submitForm=(event)=>{
    if (event.key === 'Enter') {
      Iframeurl();
    }
  }
  return (
    <div className="browser-main h-full mh-[100%] bg-[#e2e8f0] p-[15px] grid content-center">
      <div className=" w-full m-auto  ">
        <div className={`browser-inner bg-white h-[85vh] overflow-hidden flex justify-center flex-col	` }  >
          <div className="browser-top-bar w-full pb-[20px]">
            <div className="flex items-center">
              <div className="w-[100%] search-frame " style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div className="border rounded-[2rem] pl-[20px] py-[10px] shadow">
                  <input
                    type="text"
                    placeholder="Paste or Type Url"
                    className="browsser-input border px-2 p-1 outline-none border-none w-[400px]"
                    onChange={(e) => setURLValue(e.target.value)}
                    onKeyDown={submitForm}
                  />

                  <button
                    className="h-full py-[6px] px-[20px]"
                    onClick={Iframeurl}
                  >
                    <FontAwesomeIcon style={{fontSize:"18px"}} icon={faSearch}></FontAwesomeIcon>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {URL.length >0 && <div className="browser-box  ">
            <div className="iframe-box ">
              <iframe
                src={URL}
                height="400"
                width="100%"
                title="Iframe Example"
                className="h-[63vh]"
              ></iframe>
            </div>
          </div>
          }
          
        </div>
      </div>
    </div>
  );
};
export default Browser;

