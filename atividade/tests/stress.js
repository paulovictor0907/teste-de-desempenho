import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 200 },
    { duration: '2m', target: 500 },
    { duration: '2m', target: 1000 },
  ],
};
export default function () {
  const url = 'http://localhost:3000/checkout/crypto';
  const payload = JSON.stringify({
    items: [{ id: 'crypto-item', quantity: 1}],
    user: 'stress-test-user',
  });
  const params = {
    headers: {
      'Content-Type': 'application/json' 
    }
  };
  const res = http.post(url, payload, params);

  check(res, {
    'status code is 201': (r) => r.status === 201,
  })
  sleep(1);
}
