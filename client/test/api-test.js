import axios from 'axios';
import { config } from './config';

describe('api', () => {
  it('should create an instance of axios', () => {
    const api = new api.default();
    expect(api).toBeInstanceOf(axios.AxiosInstance);
  });

  it('should have a baseURL', () => {
    const api = new api.default();
    expect(api.baseURL).toEqual(config[environment].apiBaseUrl);
  });

  it('should have axios instance', () => {
    const api = new api.default();
    expect(api.axios).toBeInstanceOf(axios.AxiosInstance);
  });
});
