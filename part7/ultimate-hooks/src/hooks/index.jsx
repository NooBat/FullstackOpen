import { useEffect, useState } from 'react';
import axios from 'axios';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return [
    {
      type,
      value,
      onChange,
    },
    reset,
  ];
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => response.data)
      .then((data) => {
        setResources(data);
      });
  }, [changed]);

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    setChanged(!changed);
    return response.data;
  };

  const service = {
    create,
  };

  return [resources, service];
};
