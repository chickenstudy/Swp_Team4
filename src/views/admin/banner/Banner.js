import React, {useEffect, useState} from 'react'
import axios from "axios";

export default function Banner() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movie/listMovie")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="container">
      {data.map((item) =>{
        <tr key={item.id}>Banner</tr>
      })}
    </div>
  )
}
