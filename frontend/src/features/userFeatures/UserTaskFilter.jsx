import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchUserTasksById } from "../../slices/taskSlice";
import Label from "../../ui/Label";
import DatePicker from "react-datepicker";

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

const UserTaskFilter = ({ page, limit, setPageNumber }) => {
  const [selectedStatus, setSelectedStatus] = useState("allStatus");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const statuses = ["pending", "completed", "overdue"];

  const { id } = useSelector((store) => store.auth.user);

  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(
        fetchUserTasksById({
          id,
          page,
          limit,
          status: selectedStatus,
          startDate,
          dueDate,
        })
      );
    },
    [dispatch, id, page, limit, selectedStatus, startDate, dueDate]
  );

  function handleReset() {
    const reset = async () => {
      await dispatch(
        fetchUserTasksById({ id, status: selectedStatus, page, limit })
      );
      setPageNumber(1);
      setSelectedStatus("");
      setStartDate("");
      setDueDate("");
    };
    return reset();
  }

  return (
    <Filter>
      <label htmlFor="status">Filter by Status:</label>
      <FilterSelect
        id="status"
        value={selectedStatus}
        onChange={(e) => {
          setSelectedStatus(e.target.value);
          dispatch(
            fetchUserTasksById({ id, status: e.target.value, page, limit })
          );
          setPageNumber(1);
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
            fetchUserTasksById({
              id,
              status: selectedStatus,
              startDate: date,
              dueDate: dueDate,
              page: 1,
              limit,
            })
          );
          setPageNumber(1);
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
            fetchUserTasksById({
              id,
              status: selectedStatus,
              startDate: startDate,
              dueDate: date,
              page: 1,
              limit,
            })
          );
          setPageNumber(1);
        }}
        dateFormat="yyyy-MM-dd"
        aria-label="Due date"
      />

      <button onClick={handleReset}>Reset Filters</button>
    </Filter>
  );
};

export default UserTaskFilter;
