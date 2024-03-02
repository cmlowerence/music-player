import axios from 'axios';

const authEndpoint = 'https://accounts.spotify.com/authorize?';
const clientID = 'fe08124ff3484aaba7eadce27b5b9613';
const redirectUri = 'http://localhost:3000';
const scope = ['user-library-read', 'playlist-read-private'];

export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectUri}&scopes=${scope.join("%20")}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: 'https://api.spotify.com/v1'
})

export const setClientToken = (token)=>{
  apiClient.interceptors.request.use(async (config)=>{
    config.headers.Authorization = 'Bearer ' + token;
    return config;
  })
}

export default apiClient;