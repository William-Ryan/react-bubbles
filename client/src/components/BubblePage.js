import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [ display, setDisplay ] = useState(false)

  useEffect(() => {
    axiosWithAuth().get(`colors`)
      .then(res => {
        console.log(res)
        setColorList(res.data)
        setDisplay(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [display])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} setDisplay={setDisplay} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
