import Repository from './Repository';

const resource = '/v1';

export default {
  cardVerify(payload) {
    return new Promise((resolve, reject) => {
      Repository.post(`${resource}/customer/ecomm/verify`, payload)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  },
  verifyCustomer(payload) {
    return new Promise((resolve, reject) => {
      Repository.post(`${resource}/customer/verification`, payload)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  },
  getCustomerInfo(payload) {
    return new Promise((resolve, reject) => {
      Repository.post(`${resource}/customer/ecomm`, payload)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  },
  createEcom(payload) {
    return new Promise((resolve, reject) => {
      Repository.post(`${resource}/customer/ecomm/create`, payload)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  }
}