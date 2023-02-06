import {
  getRefreshTokenFromLS,
  clearLocalStorage,
  getAccessTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS,
  getProfileFromLS
} from './../auth';
import { describe, it, expect } from 'vitest';

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDY0MjQwNmQ3YzYyMDM0MDg0ZmRhMyIsImVtYWlsIjoicTFAcXEucXEiLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAyLTA1VDEwOjM0OjE0Ljk0NFoiLCJpYXQiOjE2NzU1OTMyNTQsImV4cCI6MTY3NTU5MzI2NH0.zxHjqa0I6X_POzG9RjaHcDkiw_TVKGlIum72B_abiMA';

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDY0MjQwNmQ3YzYyMDM0MDg0ZmRhMyIsImVtYWlsIjoicTFAcXEucXEiLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAyLTA1VDEwOjMzOjEzLjQ1OFoiLCJpYXQiOjE2NzU1OTMxOTMsImV4cCI6MTY4OTQxNzE5M30.PhPhWqV9Pd3zyKVOeKttVpjdYftRtDj3BYMah6W5BvE';

const profile: User = {
  _id: '63d642406d7c62034084fda3',
  roles: ['User'],
  email: 'q1@qq.qq',
  createdAt: '2023-01-29T09:54:08.493Z',
  updatedAt: '2023-02-05T10:20:12.542Z',
  address: '123123123',
  avatar: 'b789129a-a450-4035-becd-762e46161053.jpeg',
  date_of_birth: '1993-04-03T17:00:00.000Z',
  name: 'hello',
  phone: '090923234'
};

describe('setAccessTokenToLS', () => {
  it('setAccessTokenToLS method that save access token to local storage', () => {
    setAccessTokenToLS(access_token);
    expect(getAccessTokenFromLS()).toEqual(access_token);
  });
});

describe('setRefreshTokenToLS', () => {
  it('setAccessTokenToLS method that save access token to local storage', () => {
    setRefreshTokenToLS(refresh_token);
    expect(getRefreshTokenFromLS()).toEqual(refresh_token);
  });
});

describe('setProfileToLS', () => {
  it('setProfileToLS method that save user profile to LS', () => {
    setProfileToLS(profile);
    expect(localStorage.getItem('profile')).toMatchObject(JSON.stringify(profile));
  });
});

describe('clearLocalStorage', () => {
  it('clearLocalStorage method that clear whole data in LS', () => {
    clearLocalStorage();
    expect(getAccessTokenFromLS()).toBe('');
    expect(getRefreshTokenFromLS()).toBe('');
    expect(getProfileFromLS()).toBeNull();
  });
});
