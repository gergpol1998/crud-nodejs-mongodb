import React, { useEffect, useState, useCallback } from "react";
import Table from "react-bootstrap/Table";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Home = () => {
  let count = 0;

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  const getProducts = async () => {
    const res = await axios.get(
      `http://localhost:4000/products?query=${query}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.status === 500 || !res.data) {
      console.log("error");
    } else {
      setData(res.data);
    }
  };

  const delProduct = useCallback(async (id) => {
    const res = await axios.delete(
      `http://localhost:4000/product/delete/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.status === 500 || !res.data) {
      console.log("error");
    } else {
      console.log("product delete");
      getProducts();
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [delProduct]);

  return (
    <>
      <div className="container mt-2">
        <h1 className="text-center mt-2 mb-3">CRUD MINIPROJECT</h1>
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-success " onClick={getProducts}>Search</button>
        <div className="text-end">
          <button className="btn btn-primary">
            <NavLink to="/product" className="text-decoration-none text-white">
              ADD PRODUCT
            </NavLink>
          </button>
        </div>
        <Table striped bordered hover variant="dark" className="mt-4">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>ID</th>
              <th>IMG</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>QTY</th>
              <th>MODEL</th>
              <th>SIZE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0
              ? data.map((el, i) => {
                  count++;
                  return (
                    <tr className="text-center" key={el.id}>
                      <td>{count}</td>
                      <td>{el.id}</td>
                      <td>
                        <img
                          src={`http://localhost:4000/uploads/${el.imgpath}`}
                          alt={`${el.name}`}
                          width="60"
                          height="60"
                        ></img>
                      </td>
                      <td>{el.name}</td>
                      <td>{el.price}</td>
                      <td>{el.qty}</td>
                      <td>{el.model}</td>
                      <td>{el.size}</td>
                      <td>
                        <div>
                          <NavLink to={`edit/${el._id}`}>
                            <button className="btn btn-warning">EDIT</button>
                          </NavLink>
                          <button
                            className="btn btn-danger"
                            onClick={() => delProduct(el._id)}
                          >
                            DELETE
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Home;
