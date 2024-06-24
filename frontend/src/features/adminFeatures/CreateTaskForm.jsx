import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import { fetchUsers } from "../../slices/userSlice";
import { assignTask } from "../../slices/taskSlice";
import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import FormErrorMessage from "../../ui/FormErrorMessage";
import StyledForm from "../../ui/StyledForm";
import Label from "../../ui/Label";
import Textarea from "../../ui/Textarea";
import Input from "../../ui/Input";
import FormContainer from "../../ui/FormContainer";
import Users from "../../ui/Users";
import SelectedUser from "../../ui/SelectedUser";
import User from "../../ui/User";
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

function CreateTaskForm() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [userId, setUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState({});
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchedUsers = useSelector((store) => store.user);
  const fetchedTasks = useSelector((store) => store.task);

  const { isLoadingTask, error: taskError } = fetchedTasks;
  const { users } = fetchedUsers;

  useEffect(() => {
    dispatch(fetchUsers({}));
  }, [dispatch]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      task,
      description,
      startDate: startDate.toISOString(),
      dueDate: dueDate.toISOString(),
      userId,
    };
    try {
      await dispatch(assignTask(taskData)).unwrap();

      navigate("/admin/task-list");

      setTask("");
      setDescription("");
      setStartDate(new Date());
      setDueDate(new Date());
      setUserId(null);
      setSelectedUser({});
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  if (isLoadingTask) return <Spinner />;

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
              {users?.map((user) => (
                <User key={user.id}>
                  <UserParagraph>{user?.username}</UserParagraph>
                  <Button
                    onClick={() => {
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
              <SelectedUserH1>{selectedUser?.username}</SelectedUserH1>
              <SelectedParagraph>
                Role: <span>{selectedUser?.role}</span>
              </SelectedParagraph>
              <Button type="button" onClick={handleFormSubmit}>
                Assign task to {selectedUser.username}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setUserId(null);
                }}
              >
                Choose another user
              </Button>
            </SelectedUser>
          </>
        )}
      </StyledForm>
    </FormContainer>
  );
}

export default CreateTaskForm;
