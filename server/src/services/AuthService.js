import axios from 'axios';
import { store } from '../store';
import { userActions } from '../store/userSlice';

const AuthService = {
  async login(username, password) {
    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password,
      });
      const user = response.data;
      store.dispatch(userActions.setUser(user));
      return user;
    } catch (error) {
      throw new Error('Failed to log in');
    }
  },

  async logout() {
    try {
      await axios.post('/api/auth/logout');
      store.dispatch(userActions.setUser(null));
    } catch (error) {
      throw new Error('Failed to log out');
    }
  },

  async register(username, email, password) {
    try {
      const response = await axios.post('/api/auth/register', {
        username,
        email,
        password,
      });
      const user = response.data;
      store.dispatch(userActions.setUser(user));
      return user;
    } catch (error) {
      throw new Error('Failed to register');
    }
  },

  async isAuthenticated() {
    try {
      const response = await axios.get('/api/auth/is-authenticated');
      return response.data.isAuthenticated;
    } catch (error) {
      return false;
    }
  },
};

export default AuthService;
