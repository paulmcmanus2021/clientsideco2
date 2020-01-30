const baseURL = 'https://co2byu.herokuapp.com/api/heroku_2sb8cf67/users'

export default{
  getUserData(){
    return fetch(baseURL)
    .then(res => res.json())
  },
  postFootprint(payload){
    return fetch(baseURL,{
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    }
  }
