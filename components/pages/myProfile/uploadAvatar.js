/*eslint-disable*/

import axios from 'axios';

export default function (url, file, userId, oldPath, name = 'avatar') {
  if (typeof url !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof url}`);
  }

  // You can add checks to ensure the url is valid, if you wish
  const formData = new FormData();
  formData.append(name, file);

  formData.append("userId", userId);
  formData.append("oldPath", oldPath);

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  return axios.post(url, formData, config);
};