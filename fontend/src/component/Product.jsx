import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Product = () => {

  const [create, setCreate] = useState({
    id: "",
    name: "",
    price: 0,
    qty: 0,
    model: "",
    size: 0,
  });
  const [file, setFile] = useState("");

  const history = useNavigate();

  const handleChange = (e) => {
    const newData = {...create};
    newData[e.target.name] = e.target.value;
    setCreate(newData);
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  //add prodcut data
  const addProduct = async (e) => {
    e.preventDefault();

    let formdata = new FormData();
    formdata.append("id", create.id);
    formdata.append("img",file);
    formdata.append("name", create.name);
    formdata.append("price",create.price);
    formdata.append("qty",create.qty);
    formdata.append("model",create.model);
    formdata.append("size", create.size);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await axios.post(
      "http://localhost:4000/product/create",formdata,config
    );

    if (res.data.status === 500 || !res.data) {
      console.log("error");
    } else {
      history("/");
    }
  };

  return (
    <>
      <div className="container mt-3">
        <h1 className="text-center mt-2">ADD PRODUCT</h1>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter ID"
              name="id"
              onChange={handleChange}
              required
            />
            <Form.Label>NAME</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter NAME"
              name="name"
              onChange={handleChange}
              required
            />
            <Form.Label>PRICE</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter PRICE"
              name="price"
              onChange={handleChange}
              required
            />
            <Form.Label>QTY</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter QTY"
              name="qty"
              onChange={handleChange}
              required
            />
            <Form.Label>MODEL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter MODEL"
              name="model"
              onChange={handleChange}
              required
            />
            <Form.Label>SIZE</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter SIZE"
              name="size"
              onChange={handleChange}
              required
            />
            <Form.Label>SELECT YOUR IMAGE</Form.Label>
            <Form.Control
              type="file"
              className="mb-2"
              accept=".jpeg,.png,.jpg"
              name="img"
              onChange={handleFile}
              required
            />
            <Button variant="primary" type="submit" onClick={addProduct}>
              SAVE
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default Product;
