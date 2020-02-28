import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, setDisplay }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: "",
    code: { hex: "" }
  })

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res)
        setDisplay(true)
      })
      .catch(err => {
        console.log(err.response)
      })
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`colors/${colorToEdit.id}`, color)
      .then(res => {
          console.log(res.data);
          updateColors(colors.filter(item => item.id !== colorToEdit.id))
      })
      .catch(err => {
          console.log(err.response)
      })
  };

  const addColor = color => {
    axiosWithAuth()
      .post(`colors`, newColor)
        .then(res => {
          console.log(res.data);
          setNewColor(updateColors)
        })
        .catch(err =>{
          console.log(err.response)
        })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <h2>Add A Bubble</h2>
      <form onSubmit={addColor}>
            <label htmlFor="color">Color</label>
            <input 
              type="text"
              name="color"
              label="color"
              placeholder="Color Here"
              value={newColor.color}
              onChange={e => setNewColor({ ...newColor, color: e.target.value})}
            />
            <label htmlFor="hex">Hex Code</label>
            <input 
              type="text"
              name="hex"
              label="hex"
              placeholder="Hex Code Here"
              value={newColor.code.hex}
              onChange={e => setNewColor({ ...newColor, code: { hex: e.target.value }})}
            />
            <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ColorList;
