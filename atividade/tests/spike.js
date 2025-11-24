import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '10s', target: 300 },
    { duration: '1m', target: 300 }, 
    { duration: '10s', target: 10 },
    { duration: '30s', target: 10 },
  ],
  thresholds: {
    'http_req_failed': ['rate<0.1'],
  },
};
export default function () {
  const url = 'http://localhost:3000/checkout/simple';
  const payload = JSON.stringify({
    items: [{ id: 'flash-sale-item', quantity: 1}],
    user: 'spike-test-user',
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
