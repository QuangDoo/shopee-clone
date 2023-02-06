import { HttpStatusCode } from 'axios';
import { describe, it, expect, beforeEach } from 'vitest';
import { clearLocalStorage, setAccessTokenToLS, setRefreshTokenToLS } from '../auth';
import http from '../http';

describe('http axios', () => {
  beforeEach(async () => {
    clearLocalStorage();
  });

  const access_token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGY0YTc0NmQ3YzYyMDM0MDg1MDM5OSIsImVtYWlsIjoicXVhbmc2QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDItMDZUMDk6MDc6MTcuODM2WiIsImlhdCI6MTY3NTY3NDQzNywiZXhwIjoxNjc1Njc0NDM4fQ.9GfamwN6LR7WCNIBsGY-fkCeBto314Fjm1FjyFoxDs8';

  const refresh_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGY0YTc0NmQ3YzYyMDM0MDg1MDM5OSIsImVtYWlsIjoicXVhbmc2QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDItMDZUMDk6MDk6MzMuMTg3WiIsImlhdCI6MTY3NTY3NDU3MywiZXhwIjoxNzYyMDc0NTczfQ.b9tf2PNSSkfLv10jGaXyBH4fmBTQ9H5UDTRyWqB6YkU';
  it('test call api', async () => {
    const res = await http.get('products');

    expect(res.status).toEqual(HttpStatusCode.Ok);
  });
  it('Auth req', async () => {
    await http.post('login', { email: 'q1@qq.qq', password: '123456' });
    const res = await http.get('me');

    expect(res.status).toEqual(HttpStatusCode.Ok);
  });

  it('Refresh token', async () => {
    setAccessTokenToLS(access_token);
    setRefreshTokenToLS(refresh_token);
    const res = await http.get('me');
    expect(res.status).toEqual(HttpStatusCode.Ok);
  });
});
