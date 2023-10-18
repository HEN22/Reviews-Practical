import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Socket } from "../socket";
import "./home.css";
import { BASE_URL } from "../axios/axiosMain";

const HomePage = () => {
  const [tabledata, setTableData] = useState(null);
  const [newAdded, setNewlyAdded] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();
  const fetchData = async (val) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/reviews/list?search=${val}`);
      setTableData(
        data?.data?.map((item, index) => ({
          no: index + 1,
          title: item.title,
          content: item.content,
          date: item.updatedAt?.slice(0, 10),
          id: item._id
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData(searchVal);
  }, [searchVal]);
  useEffect(() => {
    if (!tabledata) return;
    Socket.on("reviews", (data) => {
      if (data.eventType === "create") {
        const { review } = data;
        const newData = {
          title: review.title,
          content: review.content,
          date: review.updatedAt?.slice(0, 10),
          id: review._id,
          event: "create"
        };
        if (tabledata.some((item) => item.id === review._id)) {
          return;
        }

        const newTableData = [newData, ...tabledata];
        setTableData(newTableData);
        setNewlyAdded(review._id);
        setTimeout(() => {
          setNewlyAdded(false);
        }, 6000);
      }
      if (data.eventType === "edit") {
        const { review } = data;
        const currList = tabledata.filter((item) => item.id !== review._id);
        const newData = {
          title: review.title,
          content: review.content,
          date: review.updatedAt?.slice(0, 10),
          id: review._id,
          event: "edit"
        };
        setTableData([newData, ...currList]);
        setNewlyAdded(review._id);
        setTimeout(() => {
          setNewlyAdded(false);
        }, 6000);
      }
      if (data.eventType === "delete") {
        const { review } = data;
        const newTableData = tabledata.filter((item) => item.id !== review._id);
        setNewlyAdded(review._id);
        setTimeout(() => {
          setNewlyAdded(false);
          setTableData(newTableData);
        }, 3000);
      }
    });
  }, [tabledata]);

  const hadleEdit = (item) => {
    navigate(`/${item.id}`, { state: item });
  };
  const hadleDelete = async (item) => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/reviews/delete/${item.id}`);
    } catch (err) {
      console.log(err);
    }
  };
  const handleNew = () => {
    navigate("/new");
  };
  return (
    <div>
      <h2>Reviews</h2>
      <div className="create-button-container">
        <input name="search" className="search-input" placeholder="Search here" value={searchVal} onChange={(e) => setSearchVal(e.target.value)} />
        <button onClick={handleNew} className="new-button">
          Create New Review
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Content</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tabledata?.map((item, index) => (
            <tr
              key={item.id}
              style={{
                background:
                  item.event === "create" && newAdded === item.id ? "#aee1ae" : item.event === "edit" && newAdded === item.id ? "lightblue" : newAdded === item.id ? "salmon" : ""
              }}
            >
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.content}</td>
              <td>{item.date}</td>
              <td>
                <button onClick={() => hadleEdit(item)} className="edit-button">
                  Edit
                </button>
              </td>
              <td>
                <button onClick={() => hadleDelete(item)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
