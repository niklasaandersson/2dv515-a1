export async function getUsersCall (dataSet) {
  const response = await window.fetch(`${process.env.REACT_APP_SERVER_URL}/api/${process.env.REACT_APP_API_VERSION}/users?dataSet=${dataSet}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
  return response.json()
}

export async function getMatchingUsers (userId, method, limit, dataSet) {
  const response = await window.fetch(`${process.env.REACT_APP_SERVER_URL}/api/${process.env.REACT_APP_API_VERSION}/matching-users?userId=${userId}&method=${method}&limit=${limit}&dataSet=${dataSet}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
  return response.json()
}

export async function getRecommendedMovies (userId, method, limit, dataSet) {
  const response = await window.fetch(`${process.env.REACT_APP_SERVER_URL}/api/${process.env.REACT_APP_API_VERSION}/recommended-movies?userId=${userId}&method=${method}&limit=${limit}&dataSet=${dataSet}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
  return response.json()
}

export async function getRecommendationsItemBased (userId, method, limit, dataSet) {
  const response = await window.fetch(`${process.env.REACT_APP_SERVER_URL}/api/${process.env.REACT_APP_API_VERSION}/recommendations-item-based?userId=${userId}&method=${method}&limit=${limit}&dataSet=${dataSet}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
  return response.json()
}
