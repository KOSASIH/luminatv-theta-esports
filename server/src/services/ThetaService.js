import axios from 'axios';

const ThetaService = {
  async getThetaData(symbol) {
    try {
      const response = await axios.get(`/api/theta/${symbol}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to get Theta data');
    }
  },

  async postThetaData(symbol, data) {
    try {
      const response = await axios.post(`/api/theta/${symbol}`, data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to post Theta data');
    }
  },

  async deleteThetaData(symbol, id) {
    try {
      const response = await axios.delete(`/api/theta/${symbol}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete Theta data');
    }
  },
};

export default ThetaService;
