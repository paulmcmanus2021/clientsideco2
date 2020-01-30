const baseURL = 'https://co2byu.herokuapp.com/api/heroku_2sb8cf67/emissionFactors';

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
