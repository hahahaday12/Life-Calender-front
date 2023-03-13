const TOKEN_KEY = 'token';

const TokenRepository = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(response) {
    localStorage.setItem(TOKEN_KEY, response.data.token);
  },
  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },
};

export default TokenRepository;
