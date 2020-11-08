import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";

import Header from "./Header";
import monitorApi from "../apis/monitor-api";

const MainPage = () => {
  const [redisList, setRedisList] = useState([]);
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    monitorApi.get("/api/redis_list").then((response) => {
      setRedisList(response.data);
    });
  }, []);

  const addHost = async () => {
    if (!host || !port) {
      alert("Host and Port fields cannot be empty");
    } else {
      let response = await monitorApi.post("/api/add", {
        host,
        port,
        password,
      });

      console.log(response.data);
      setRedisList([...redisList, response.data]);
      // console.log(response.data);
    }
  };

  const deleteHost = async (redisMd5) => {
    let response = await monitorApi.delete(`/api/del?md5=${redisMd5}`);
    alert(response.data.msg);
    setRedisList(redisList.filter((redis) => redis.md5 !== redisMd5));
  };

  return (
    <>
      <Header />
      <div>
        <h1>Redis Instance List - Redis Monitor Informations </h1>

        <form>
          Host:{" "}
          <input
            type="text"
            onChange={(e) => setHost(e.target.value)}
            value={host}
            placeholder="Redis host / ip"
          />
          &nbsp;&nbsp; Port:{" "}
          <input
            type="number"
            onChange={(e) => setPort(e.target.value)}
            value={port}
            placeholder="6379"
          />
          &nbsp;&nbsp; Password:{" "}
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password"
          />
          &nbsp;&nbsp;
          <input type="button" onClick={addHost} defaultValue="Add / Update" />
          &nbsp;
          <input type="button" onClick={() => {}} defaultValue="Example" />
        </form>

        <table
          width="100%"
          border="0"
          cellPadding="10"
          cellSpacing="1"
          style={{ margin: "1em 0" }}
        >
          <tbody>
            <tr>
              <th width="40%" bgcolor="#DDEEFF">
                Redis Information
              </th>
              <th width="40%" bgColor="#DDEEFF">
                Add Datetime
              </th>
              <th width="20%" bgColor="#DDEEFF">
                Operation
              </th>
            </tr>
            {redisList.map((redis, i) => {
              return (
                <tr key={i}>
                  <td>
                    <Link to={redis.md5}>
                      {redis.host}:{redis.port}
                    </Link>
                  </td>
                  <td>
                    {redis.add_time} [
                    <TimeAgo datetime={redis.add_time || new Date()} />]
                  </td>
                  <td>
                    <input
                      type="button"
                      onClick={() => deleteHost(redis.md5)}
                      defaultValue="Delete"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MainPage;
