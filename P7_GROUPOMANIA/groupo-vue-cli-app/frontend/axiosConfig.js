import axios from 'axios';

// Config globale par défaut d'axios

// Refactoring préfixe URL de l'application
axios.defaults.baseURL = 'http://localhost:3000/';

// Gestion des tokens par axios
axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token'); //token à la place de AUTH_TOKEN


