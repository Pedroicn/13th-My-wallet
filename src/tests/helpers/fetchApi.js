const BASE_URL = 'https://economia.awesomeapi.com.br/json/all';

const getApiCurrencies = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};

export default getApiCurrencies;
