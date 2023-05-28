import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/', // URL base para todas as requisições
  timeout: 5000, // Tempo limite de 5 sec
  headers: {
    'Content-Type': 'application/json', //Tipo de conteúdo das requisições
  },
});

export default api;
