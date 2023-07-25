import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function History() {
  const [data, setData] = useState([]);
  const id = localStorage.getItem("id");
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/tickets/listBooking?userId=${id}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="table">
      <div className="table-header">
        <div>ID</div>
        <div>Name</div>
        <div>Ghế</div>
        <div>Tiền</div>
        <div>Ngày</div>
        <div>Actions</div>
      </div>
      {/* {seatData.map((item) => (
        <div className="table-row" key={item.id}>
          <div>{item.id}</div>
          <div>{item.name}</div>
          <div>{item.ghế}</div>
          <div>{item.tiền}</div>
          <div>{item.ngày}</div>
          <div>{item.actions}</div>
        </div>
      ))} */}
    </div>
  );
}
