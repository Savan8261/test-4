import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

import { editTask } from "../../slices/taskSlice";

import { formatDate } from "../../helper/formatDate";

import Button from "../../ui/Button";
import FormErrorMessage from "../../ui/FormErrorMessage";
import StyledForm from "../../ui/StyledForm";
import Label from "../../ui/Label";
import Textarea from "../../ui/Textarea";
import Input from "../../ui/Input";
import FormContainer from "../../ui/FormContainer";
import Users from "../../ui/Users";
import User from "../../ui/User";
import SelectedUser from "../../ui/SelectedUser";
import { fetchUsers } from "../../slices/userSlice";
import { HiMagnifyingGlass } from "react-icons/hi2";

const SelectedUserH1 = styled.h1`
  color: #163f68;
`;

const UserParagraph = styled.p`
  color: #163f68;
`;

const SelectedParagraph = styled.p`
  color: #163f68;
`;

const SearchForm = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`;

const SearchBtn = styled.button`
  padding: 3px;
  border-radius: 10px;
`;
const SearchInput = styled.input`
  padding: 1px 2px;
  border-radius: 5px;
`;

function EditTaskForm({ taskToEdit, close }) {
  const [task, setTask] = useState(taskToEdit.task);
  const [description, setDescription] = useState(taskToEdit.description);
  const [startDate, setStartDate] = useState(taskToEdit.startDate);
  const [dueDate, setDueDate] = useState(taskToEdit.dueDate);
  const [userId, setUserId] = useState(taskToEdit.userId);
  const [selectedUser, setSelectedUser] = useState(taskToEdit.users);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(taskToEdit.status);

  const { users: allUsers } = useSelector((store) => store.user);
  const { error: taskError } = useSelector((store) => store.task);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers({}));
  }, [dispatch]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      id: taskToEdit.id,
      task,
      description,
      startDate: formatDate(startDate),
      dueDate: formatDate(dueDate),
      userId,
      status,
    };
    try {
      await dispatch(editTask(taskData)).unwrap();
      close();
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  return (
    <FormContainer>
      <StyledForm fillFor="add" onSubmit={handleFormSubmit}>
        <Label htmlFor="task">Task</Label>
        <Input
          type="text"
          id="task"
          onChange={(e) => setTask(e.target.value)}
          value={task}
          placeholder="Task title"
          aria-label="Task title"
        />
        <Label htmlFor="details">Details</Label>
        <Textarea
          id="details"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Write some details about the task"
          aria-label="Task details"
        />
        <Label htmlFor="startDate">Start Date</Label>
        <DatePicker
          id="startDate"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          aria-label="Start date"
        />
        <Label htmlFor="dueDate">Due Date</Label>
        <DatePicker
          id="dueDate"
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          dateFormat="yyyy-MM-dd"
          aria-label="Due date"
        />
        {taskToEdit && (
          <select
            id="status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        )}
        {taskError && <FormErrorMessage>{taskError}</FormErrorMessage>}
      </StyledForm>

      <StyledForm fillFor="add" onSubmit={(e) => e.preventDefault()}>
        {!userId && (
          <>
            <SearchForm>
              <SearchInput
                type="text"
                placeholder="Find user"
                onChange={(e) => setSearch(e.target.value)}
              />
              <SearchBtn
                onClick={() => dispatch(fetchUsers({ username: search }))}
              >
                <HiMagnifyingGlass />
              </SearchBtn>
            </SearchForm>
            <Users>
              {allUsers.map((user) => (
                <User key={user.id}>
                  <UserParagraph>{user.username}</UserParagraph>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setUserId(user.id);
                      setSelectedUser(user);
                    }}
                  >
                    Select
                  </Button>
                </User>
              ))}
            </Users>
          </>
        )}
        {userId && (
          <>
            <SelectedUser>
              <SelectedParagraph>Assign Task to</SelectedParagraph>
              <SelectedUserH1>{selectedUser.username}</SelectedUserH1>
              <SelectedParagraph>
                Role: <span>{selectedUser.role}</span>
              </SelectedParagraph>
              <Button size="medium" type="button" onClick={handleFormSubmit}>
                Edit
              </Button>
              <Button
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  setUserId(null);
                }}
              >
                Select other
              </Button>
            </SelectedUser>
          </>
        )}
      </StyledForm>
    </FormContainer>
  );
}

export default EditTaskForm;
