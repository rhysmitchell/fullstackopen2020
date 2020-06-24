import axios from 'axios';
const baseUrl = '/api/phonebook';

const getAll = () => axios.get(baseUrl);

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then(() => getAll().then((contact) => contact));
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(() => getAll().then((contact) => contact));
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(() => getAll().then((contact) => contact));
};

export default {
  getAll,
  create,
  update,
  remove,
};
