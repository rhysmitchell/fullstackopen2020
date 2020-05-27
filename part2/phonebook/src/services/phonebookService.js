import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/phonebook';

const getAll = () => axios.get(baseUrl);

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then(() => getAll().then((people) => people));
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(() => getAll().then((people) => people));
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(() => getAll().then((people) => people));
};

export default {
  getAll,
  create,
  update,
  remove,
};
