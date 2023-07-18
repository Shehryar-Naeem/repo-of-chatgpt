
"use client"
import React from "react";
// import DarkMode from "../../DarkMode";
import { useState } from "react";
import axios from "axios";
import { useEffect, useRef } from "react";

// import vectorimage from "../../../assets/vectorimage.png";


// const imageModels = ["DALL·E", "OpenJourney"];
const findpage = (props) => {
  const [like, setLike] = useState([]); //like count
  const [getImg, setGetImg] = useState([]); // get image data 
  const [sortdata, setSortData] = useState([]); /// all sort data like ,date ,include , exclude
  const [sortToggle, setSortToggle] = useState(false); // toggle for map
  const [includesToggle, setIncludesToggle] = useState(false);
  const [excludesToggle, setExcludesToggle] = useState(false);
  const [sortvalue, setSortvalue] = useState(""); // exclude include inter value
  const [likedImageId, setLikedImageId] = useState(null); // like id

  const GetImageData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getImages");

      setGetImg(response.data);
    } catch (error) {
      console.error(error); // Handle the error
    }
  };
  //validaton for get image
  const isImageFile = (filename) => {
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;
    return imageRegex.test(filename);
  };
  //*************** * *************************************************************/
  //Sorting States
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const dateDrop = () => { 
    setIsOpen2(!isOpen2);
    setIsOpen1(false);
  };
  const likeDrop = () => {
    setIsOpen1(!isOpen1);
    setIsOpen2(false);
  };

  const Fromservices = () => {
    setIsOpen3(!isOpen3);
    setIsOpen2(false);
  };
  

  useEffect(() => {
    GetImageData();
  }, []);

/************************************************** */
 ///for like out side event

function useOutsideAlerter(ref) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) ) {
        
        setIsOpen2(false)
      
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

// for date event outside clck
function useOutsideAlerter1(ref) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) ) {
        
       
         setIsOpen1(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const wrapperRef = useRef(null);
useOutsideAlerter(wrapperRef);

const wrapperRef1 = useRef(null);
useOutsideAlerter1(wrapperRef1);


/******************************************************************** */

  const sortData = (sortBy, sortOrder) => {
    if (sortBy === "include") {
      axios
        .get(`http://localhost:4000/include/${sortvalue}`)
        .then((res) => {
          console.log("includeObj", res.data);
          setSortData(res.data);
          GetImageData();
          setIncludesToggle(false);
        })
        .catch((err) => {
          console.log(err.messge);
        });
    } else if (sortBy === "exclude") {
      axios
        .get(`http://localhost:4000/exclude/${sortvalue}`)
        .then((res) => {
          console.log("in", res.data);
          setSortData(res.data);
          setExcludesToggle(false);
        })
        .catch((err) => {
          console.log(err.messge);
        });
    }

    const sortedArray = [...getImg].sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return sortOrder === "Ascending" ? dateA - dateB : dateB - dateA;
      }
      if (sortBy === "likes") {
        console.log("running");

        return sortOrder === "Ascending"
          ? a.likes - b.likes
          : b.likes - a.likes;
      }

      return 0;
    });

    setSortData(sortedArray);
    setSortToggle(true);
  };

  // like Image API

  const LikeImage = async (id, index) => {
    setLikedImageId(id);
    try {
      if (likedImageId !== id && !like.includes(id)) {
        console.log("true");
        const response = await axios.put(
          `http://localhost:4000/likeImages/${id}`
        );
        console.log(response.data); // Handle the response data as needed
        const updatedLikeArr = [...like, id];
        console.log("==", updatedLikeArr);
        setLike(updatedLikeArr);
        GetImageData();
      }
    } catch (error) {
      console.error(error); // Handle the error
    }
  };


  

  return (
  <>

  
    <div className="bg-[#e2e8f0] h-[100%]">
      <div className="container max-w-[1140px] m-auto">
        <div className="getimg-box flex-wrap flex justify-center gap-[23px] ">
          {getImg && !sortToggle
            ? getImg.map((items, index) => {
                return (
                  <div key={index} className=" mb-2 relative ">
                    {isImageFile(items.link_to_image) ? (
                      <img
                        className="object-bottom object-cover max-w-[368px] rounded"
                        src={items.link_to_image}
                        alt=""
                      />
                    ) : (
                      <div className="object-bottom object-cover w-[325px] h-[325px] grid place-content-center	border-2 rounded-xl border-black">
                        <img src={vectorimage} className="w-[50px]" alt="" />
                        <h1>not foud</h1>
                      </div>
                    )}

                    <div className=" left-[10px] leading-[18px]">
                      {like.includes(items.id) ? (
                        <>
                          <p onClick={() => LikeImage(items.id, index)}>
                            <span
                              className={` cursor-pointer text-[20px] text-red-600`}
                            >
                              &#x2665;
                              {items.likes}
                            </span>
                          </p>
                        </>
                      ) : (
                        <>
                          <p onClick={() => LikeImage(items.id, index)}>
                            <span
                              className={` cursor-pointer text-[20px] text-gray-400`}
                            >
                              &#x2665;
                              {items.likes}
                            </span>
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            : sortdata.map((items, index) => {
                return (
                  <div key={index} className=" mb-2 ">
                    {isImageFile(items.link_to_image) ? (
                      <img
                        className="object-bottom object-cover  max-w-[368px] rounded"
                        src={items.link_to_image}
                        alt=""
                      />
                    ) : (
                      <div className="object-bottom object-cover w-[325px] h-[325px] grid place-content-center	border-2 rounded-xl border-black">
                        <img src={vectorimage} className="w-[50px]" alt="" />
                        <h1>not foud</h1>
                      </div>
                    )}
                    {like.includes(items.id) ? (
                      <p onClick={() => LikeImage(items.id, index)}>
                        <span
                          className={` cursor-pointer text-[20px] text-red-600`}
                        >
                          &#x2665;
                          {items.likes}
                        </span>
                      </p>
                    ) : (
                      <p onClick={() => LikeImage(items.id, index, "like")}>
                        <span
                          className={` cursor-pointer text-[20px] text-gray-400`}
                        >
                          &#x2665;
                          {items.likes}
                        </span>
                      </p>
                    )}
                  </div>
                );
              })}
        </div>
        <div className="shortbtn w-full m-auto sm:block py-2 bg-[#e2e8f0] fixed top-[604px] left-0">
          <div className="flex w-[50%] m-auto gap-[1rem]">
            <div className="relative inline-block mr-2 "  ref={wrapperRef1}>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={likeDrop}
              >
                Like
              </button>
              {isOpen1 && (
                <div className=" absolute  top-[-105px] z-10 mt-2 py-2 w-[6rem] bg-white rounded shadow-md left-[-20px]">
                  <button
                    className="block w-full py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => sortData("likes", "Ascending")}
                  >
                    Least
                  </button>
                  <button
                    className="block w-full py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => sortData("likes", "Descending")}
                  >
                    Most
                  </button>
                </div>
              )}
            </div>
            {/* // date sorting */}
            <div className="relative inline-block"  ref={wrapperRef}>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={dateDrop}
              >
                Date
              </button>
              {isOpen2 && (
                <div className="absolute  top-[-105px] z-10 mt-2 py-2 w-[6rem] bg-white rounded shadow-md left-[-20px]">
                  <button
                    className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => sortData("date", "Ascending")}
                  >
                    Oldest
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => sortData("date", "Dscending")}
                  >
                    Newest
                  </button>
                </div>
              )}
            </div>
            {!includesToggle ? (
              <button
                onClick={() => setIncludesToggle(true)}
                className=" flex items-center  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Include Words
              </button>
            ) : (
              <div className="w-[162px] border h-[35px] rounded pt-1 px-1 border-black">
                <input
                  type="text"
                  placeholder="Includes Words"
                  className="w-[120px] outline-none bg-[#e2e8f0]"
                  onChange={(e) => setSortvalue(e.target.value)}
                />{" "}
                <span
                  onClick={() => sortData("include")}
                  className="cursor-pointer"
                >
                  Add
                </span>
              </div>
            )}
            {!excludesToggle ? (
              <button
                onClick={() => setExcludesToggle(true)}
                className=" flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                exclude Words
              </button>
            ) : (
              <div className="w-[162px] border h-[35px] rounded pt-1 px-1 border-black">
                <input
                  type="text"
                  placeholder="Includes Words"
                  className="w-[120px] outline-none bg-[#e2e8f0]"
                  onChange={(e) => setSortvalue(e.target.value)}
                />{" "}
                <span
                  onClick={() => sortData("exclude")}
                  className="cursor-pointer"
                >
                  Add
                </span>
              </div>
            )}

            <div className="relative inline-block mr-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={Fromservices}
              >
                From Services
              </button>
              {isOpen3 && (
                <div className=" absolute  top-[-105px] z-10 mt-2 py-2 w-[6rem] bg-white rounded shadow-md left-[14px]">
                  <button className="block w-full py-2 text-gray-800 hover:bg-gray-200">
                    Add
                  </button>
                  <button className="block w-full py-2 text-gray-800 hover:bg-gray-200">
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default findpage;

