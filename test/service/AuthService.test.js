// AuthService.test.js
import AuthService from '../../services/AuthService';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

jest.mock('axios');

describe('AuthService', () => {
  let authService;
  let mockAxios;

  beforeEach(() => {
    mockAxios = axios.create();
    authService = new AuthService(mockAxios);
  });

  it('should create an instance of AuthService', () => {
    expect(authService).toBeInstanceOf(AuthService);
  });

  it('should login a user', async () => {
    const userId = uuidv4();
    const token = uuidv4();
    const user = { id: userId, token };
    mockAxios.post.mockResolvedValueOnce({ data: user });
    const result = await authService.login({ username: 'testuser', password: 'testpassword' });
    expect(result).toEqual(user);
  });

  it('should logout a user', async () => {
    const userId = uuidv4();
    const token = uuidv4();
    const user = { id: userId, token };
    mockAxios.delete.mockResolvedValueOnce({ data: user });
    const result = await authService.logout(userId, token);
    expect(result).toEqual(user);
  });

  // Add more test cases as needed
});
