import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://api-ecom.duthanhduoc.com/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});
