import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createContact = (newContact) => {
  const request = axios.post(baseUrl, newContact);
  return request.then((response) => response.data);
};

const updateContact = (id, newContact) => {
  const request = axios.put(`${baseUrl}/${id}`, newContact);
  return request.then((response) => response.data);
};

const formService = { getAll, createContact, updateContact };

export default formService
