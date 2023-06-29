import { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Cinema() {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [supplier, setSupplier] = useState([]);

  // call api

  const handleDelete = (id) => {
    if (window.confirm("Muon xoa-id: " + id + "?")) {
      fetch("http://localhost:9999/product/" + id, {
        method: "DELETE",
      })
        .then(() => {
          alert("Delete success");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h2 style={{ textAlign: "center" }}>List Cinema</h2>
          </Col>
        </Row>

        <Row>
          <Col style={{ textAlign: "right" }}>
            <Link to={"/cinema/create"}> Create new Cinema </Link>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Id</th>|<th>Name</th>|<th>Location</th>
                </tr>
              </thead>
              <tbody>
                {product.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>
                      {<Link to={"/product/detail/" + p.id}>{p.name}</Link>}
                    </td>
                    <td>{p.price}</td>
                    <td>
                      <Link to={"/product/edit/" + p.id}>Edit</Link>
                    </td>
                    <td>
                      <Link to={"/"} onClick={() => handleDelete(p.id)}>
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
