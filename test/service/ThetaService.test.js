// ThetaService.test.js
import ThetaService from '../../services/ThetaService';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

jest.mock('axios');

describe('ThetaService', () => {
  let thetaService;
  let mockAxios;

  beforeEach(() => {
    mockAxios = axios.create();
    thetaService = new ThetaService(mockAxios);
  });

  it('should create an instance of ThetaService', () => {
    expect(thetaService).toBeInstanceOf(ThetaService);
  });

  it('should get a list of streams', async () => {
    const streams = [
      { id: uuidv4(), title: 'Test Stream 1' },
      { id: uuidv4(), title: 'Test Stream 2' },
    ];
    mockAxios.get.mockResolvedValueOnce({ data: streams });
    const result = await thetaService.getStreams();
    expect(result).toEqual(streams);
  });

  it('should get a single stream by ID', async () => {
    const streamId = uuidv4();
    const stream = { id: streamId, title: 'Test Stream' };
    mockAxios.get.mockResolvedValueOnce({ data: stream });
    const result = await thetaService.getStream(streamId);
    expect(result).toEqual(stream);
  });

  // Add more test cases as needed
});
