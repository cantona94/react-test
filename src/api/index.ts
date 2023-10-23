import axios from 'axios';
import { IUser } from '../types';

export const axiosUsersFromApi = (name: string) => {
  return axios.get<IUser[]>('http://localhost:3000/', {
    params: {
      term: name,
    },
  });
};
