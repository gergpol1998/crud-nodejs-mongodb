import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [update, setUpdate] = useState({
    id: "",
    name: "",
    price: 0,
    qty: 0,
    model: "",
    size: 0,
  });
  const [file, setFile] = useState("");

  const getProduct = async () => {
    const { data } = await axios.get(`http://localhost:4000/product/${id}`);
    setUpdate(data);
  };

  const handleChange = (e) => {
    const newData = {...update};
    newData[e.target.name] = e.target.value;
    setUpdate(newData);
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    let formdata = new FormData();
    formdata.append("id", update.id);
    formdata.append("img", file);
    formdata.append("name", update.name);
    formdata.append("price", update.price);
    formdata.append("qty", update.qty);
    formdata.append("model", update.model);
    formdata.append("size", update.size);

    const res = await axios.put(
        `http://localhost:4000/product/edit/${id}`,formdata,config
    );

    if (res.data.status === 500 || !res.data) {
        console.log("error");
      } else {
        getProduct();
        history("/");
    }
  };
  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <div className="container mt-3">
        <h1 className="text-center mt-2">EDIT PRODUCT</h1>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter ID"
              name="id"
              value={update.id}
              onChange={handleChange}
              required
            />
            <Form.Label>NAME</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter NAME"
              name="name"
              value={update.name}
              onChange={handleChange}
              required
            />
            <Form.Label>PRICE</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter PRICE"
              name="price"
              value={update.price}
              onChange={handleChange}
              required
            />
            <Form.Label>QTY</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter QTY"
              name="qty"
              value={update.qty}
              onChange={handleChange}
              required
            />
            <Form.Label>MODEL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter MODEL"
              name="model"
              value={update.model}
              onChange={handleChange}
              required
            />
            <Form.Label>SIZE</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter SIZE"
              name="size"
              value={update.size}
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
            <Button variant="primary" type="submit" onClick={updateProduct}>
              SAVE
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default EditProduct;
