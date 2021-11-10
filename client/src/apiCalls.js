export async function getUsersCall (dataSet) {
  const response = await window.fetch(`${process.env.REACT_APP_SERVER_URL}/${process.env.REACT_APP_API_VERSION}/users?dataset=${dataSet}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
  return response.json()
}
