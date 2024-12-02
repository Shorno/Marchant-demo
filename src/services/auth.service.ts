import { getFromLocalStorage, setToLocalStorage } from "../utils/local-storage";
import { authKey } from "../utils/storageKey";
import { decodedToken } from '../utils/jwt';

type AuthResponse = {
  access: string;
  refresh: string; 
};

export const storeUserInfo = ({ access }: AuthResponse) => {
  setToLocalStorage(authKey, access);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  return authToken ? decodedToken(authToken) : null;
};

export const isLoggedIn = () => !!getFromLocalStorage(authKey);

export const removeUserInfo = () => {
  localStorage.removeItem(authKey);
};
