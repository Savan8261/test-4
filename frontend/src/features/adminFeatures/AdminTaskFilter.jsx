import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { fetchTasks } from "../../slices/taskSlice";
import Label from "../../ui/Label";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchUsers } from "../../slices/userSlice";

const Filter = styled.div`
  background-color: #0f3659;
  color: white;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  margin-top: 20px;
`;

const FilterSelect = styled.select`
  border: none;
  margin-right: 20px;
`;

const AdminTaskFilter = ({ page, limit, setPageNumber }) => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const users = useSelector((state) => state.user.users);

  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  useEffect(
    function () {
      dispatch(
        fetchTasks({
          page,
          limit,
          startDate,
          dueDate,
          selectedStatus,
          userId: selectedUserId,
          status: selectedStatus,
        })
      );
      dispatch(fetchUsers({}));
    },
    [dispatch, page, limit, startDate, dueDate, selectedStatus, selectedUserId]
  );

  const statuses = ["pending", "completed", "overdue"];

  const handleReset = () => {
    dispatch(fetchTasks({ page, limit }));
    setPageNumber(1);
    setSelectedUserId("");
    setSelectedStatus("");
    setStartDate("");
    setDueDate("");
  };

  return (
    <Filter>
      <label htmlFor="user">User:</label>
      <FilterSelect
        id="user"
        value={selectedUserId}
        onChange={(e) => {
          setSelectedUserId(e.target.value);
          setPageNumber(1);
          dispatch(
            fetchTasks({
              userId: e.target.value,
              status: selectedStatus,
              startDate: startDate,
              dueDate: dueDate,
              page: 1,
              limit,
            })
          );
        }}
      >
        <option value="allUsers">All Users</option>
        {users?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </FilterSelect>

      <label htmlFor="status">Status:</label>
      <FilterSelect
        id="status"
        value={selectedStatus}
        onChange={(e) => {
          setSelectedStatus(e.target.value);
          setPageNumber(1);
          dispatch(
            fetchTasks({
              userId: selectedUserId,
              status: e.target.value,
              startDate: startDate,
              dueDate: dueDate,
              page: 1,
              limit,
            })
          );
        }}
      >
        <option value="allStatus">All Statuses</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </FilterSelect>

      <Label htmlFor="startDate">Start Date</Label>
      <DatePicker
        id="startDate"
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          dispatch(
            fetchTasks({
              userId: selectedUserId,
              status: selectedStatus,
              startDate: date,
              dueDate: dueDate,
              page: 1,
              limit,
            })
          );
        }}
        dateFormat="yyyy-MM-dd"
        aria-label="Due date"
      />

      <Label htmlFor="dueDate">Due Date</Label>
      <DatePicker
        id="dueDate"
        selected={dueDate}
        onChange={(date) => {
          setDueDate(date);
          dispatch(
            fetchTasks({
              userId: selectedUserId,
              status: selectedStatus,
              startDate: startDate,
              dueDate: date,
              page: 1,
              limit,
            })
          );
        }}
        dateFormat="yyyy-MM-dd"
        aria-label="Due date"
      />

      <button onClick={handleReset}>Reset Filters</button>
    </Filter>
  );
};

export default AdminTaskFilter;
