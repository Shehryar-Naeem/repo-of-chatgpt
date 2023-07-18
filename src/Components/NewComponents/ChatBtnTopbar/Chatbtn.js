"use client"
import React, { useState, useContext, useEffect } from "react";
import { ChatContext } from "@/Components/Contex/ChatContext";
import axios from "axios";

const Chatbtn = (props,prompt) => {

  const [editableId, setEditableId] = useState(null);

  const [Check, setCheck] = useState(false);
  const [getData, setGetData] = useState([]);
  
  const [store, setStore] = useState([]);
  const [EditData, setEditData] = useState();
  const [messages, addMessage, clearMessages] = useContext(ChatContext);


function clear () {
    clearMessages({});
    axios.post("http://localhost:4000/channels", {
      id:Math.floor((Math.random() * 100000)),
      created_at: Date.now(),
      userId:localStorage.getItem("userData"),
      Title:"uiuiu",
      updated_at:"jkjkjkjk"
    }).then(res=>{
        console.log("newchat",res)
      })
      
    
  }

  //update convo
  const UpdateConvo = async (id) => {
    if (EditData) {
      let responce = await axios.put(`http://localhost:4000/users/${id}`, {
        title: `${EditData}`,
      });
      FetchApi();
      // console.log("--", responce);
    }

    setCheck(false);
  };
  const FetchApi = async () => {
    let responce = await axios.get("http://localhost:4000/getusers");
    let res = await responce.data;
    setGetData(res);
  };

  useEffect(() => {
    FetchApi();
  }, [messages]);

  const EditConvo = async (id) => {
    setEditableId(id);
    const response = await axios.get(`http://localhost:4000/users/${id}`);
    setEditData(response.data.user.title);
    setCheck(true);
  };

  const showOldConv = async (id) => {
    const response = await axios.get(`http://localhost:4000/users/${id}`);
    console.log(response.data.user);
    addMessage(response.data.user);
  };
  return (
    <div className="all-topics w-[200px] leading-10  shadow transition-all duration-300   ">
      <div className={`pl-[10px] my-2 `}>
        <span
          className=" border-black inline-flex items-center border rounded-lg pl-2"
          onClick={() => clear()}
        >
          <i className=" fa-solid fa-plus ml-[4px] text-[#551a8b]"></i>{" "}
          <p className=" cursor-pointer w-[152px] pl-[10px] outline-none te bg-inherit text-[16px] font-bold text-[#551a8b]">
            New Chat
          </p>
        </span>
      </div>
      {getData &&
        getData?.results?.map((item, index) => {
          if (item.title == null) {
            return true;
          } else {
            return (
              <div
                className="all-topic-name  pl-[14px] flex hover:bg-slate-500 hover:text-white hover:cursor-pointer "
                key={index}
              >
                {!Check ? (
                  <>
                    <p
                      className="text-[#551a8b] w-[75%] pl-2"
                      onClick={() => showOldConv(item.id)}
                    >
                      {item.title}
                    </p>
                    <i
                      className="fa-sharp fa-solid fa-pen-to-square mt-[10px] ml-[10px] text-[#551a8b]"
                      onClick={() => EditConvo(item.id)}
                    ></i>
                  </>
                ) : (
                  <>
                    {editableId === item.id ? (
                      <>
                        <input
                          type="text"
                          placeholder="All topics"
                          value={EditData}
                          onChange={(e) => setEditData(e.target.value)}
                          className=" cursor-pointer w-[152px]  outline-none  pl-2 bg-inherit focus:pointer-events-auto"
                        />
                        <i
                          className="fa-solid fa-check text-[#551a8b]"
                          onClick={() => UpdateConvo(item.id)}
                        ></i>
                      </>
                    ) : (
                      <>
                        <p className="text-[#551a8b] w-[75%] pl-2">
                          {item.title}
                        </p>
                        <i
                          className="fa-sharp fa-solid fa-pen-to-square mt-[10px] ml-[10px] text-[#551a8b]"
                          onClick={() => EditConvo(item.id)}
                        ></i>
                      </>
                    )}
                  </>
                )}
              </div>
            );
            //   <div>
            //     {getData &&
            //       getData?.results?.map((item, index) => (
            //         <div
            //           className="all-topic-name pl-[14px] flex hover:bg-slate-500 hover:text-white hover:cursor-pointer"
            //           key={index}
            //         >
            //           {editableId === item.id ? (
            //             <input
            //               type="text"
            //               // value={inputValue}
            //               value={EditData}
            //               onChange={(e) => setEditData(e.target.value)}
            //               // onBlur={handleInputBlur}
            //               autoFocus
            //             />
            //           ) : (
            //             <p onClick={() => handleInputClick(item.id)}>
            //               {item.title}
            //             </p>
            //           )}
            //         </div>
            //       ))}
            //   </div>
            // );
          }
        })}
    </div>
  );
};

export default Chatbtn;
