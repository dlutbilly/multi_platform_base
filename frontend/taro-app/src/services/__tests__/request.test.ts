
import { request } from '../request';
import Taro from '@tarojs/taro';

describe('Request Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a GET request successfully', async () => {
    const mockResponse = { code: 200, data: { message: 'success' }, message: 'OK' };
    (Taro.request as jest.Mock).mockResolvedValue({ data: mockResponse });

    const response = await request.get('/test');
    expect(Taro.request).toHaveBeenCalledWith(expect.objectContaining({ method: 'GET' }));
    expect(response).toEqual(mockResponse);
  });

  it('should make a POST request successfully', async () => {
    const mockResponse = { code: 200, data: { id: 1 }, message: 'Created' };
    (Taro.request as jest.Mock).mockResolvedValue({ data: mockResponse });

    const response = await request.post('/test', { name: 'test' });
    expect(Taro.request).toHaveBeenCalledWith(expect.objectContaining({ method: 'POST' }));
    expect(response).toEqual(mockResponse);
  });

  it('should handle request failure with non-200 code', async () => {
    const mockResponse = { code: 400, data: null, message: 'Bad Request' };
    (Taro.request as jest.Mock).mockResolvedValue({ data: mockResponse });

    await expect(request.get('/test')).rejects.toThrow('Bad Request');
    expect(Taro.showToast).toHaveBeenCalledWith({ title: 'Bad Request', icon: 'none' });
  });

  it('should handle network error', async () => {
    const networkError = new Error('Network Error');
    (Taro.request as jest.Mock).mockRejectedValue(networkError);

    await expect(request.get('/test')).rejects.toThrow('Network Error');
    expect(Taro.showToast).toHaveBeenCalledWith({ title: 'Network error', icon: 'none' });
  });

  it('should include Authorization header if token exists', async () => {
    (Taro.getStorageSync as jest.Mock).mockReturnValue('fake-token');
    const mockResponse = { code: 200, data: {}, message: 'OK' };
    (Taro.request as jest.Mock).mockResolvedValue({ data: mockResponse });

    await request.get('/secure-test');
    expect(Taro.request).toHaveBeenCalledWith(expect.objectContaining({
      header: expect.objectContaining({ Authorization: 'Bearer fake-token' })
    }));
  });
});
