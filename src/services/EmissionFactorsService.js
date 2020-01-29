const baseURL = 'http://localhost:3000/api/emissions/emissionFactors';

export default{
  getEmissionFactors(){
    return fetch(baseURL)
    .then(res => res.json())
  },
  post(payload){
    return fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
  },
}
