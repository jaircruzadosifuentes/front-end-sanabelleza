import { TOKEN_CONSULTA_DNI } from "src/config/config"

export async function  EntityCreate (endpoint, entity) { 
  try {
    return await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(entity),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  catch (error) {
    throw error
  }
}
export async function EntityUpload (endpoint, entity) { 
  try {
    return await fetch(endpoint, {
      method: 'POST',
      body: entity,
    })
  }
  catch (error) {
    throw error
  }
}
export async function EntityUpdate (endpoint, data ) {
  try { 
    return await fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    throw error  
  }
}
export async function EntityGetAll (endpoint) {
  try {
    const res = await fetch(endpoint, {
      method: 'GET',
    })
    return await res.json()
  } catch (error) {
    throw error     
  }
}
export async function EntityGetById (endpoint, id) {
  try {
    const res = await fetch(endpoint, id, {
      method: 'GET',
    })
    return await res.json()
  } catch (error) {
    throw error  
  }
}
export async function EntityDelete (endpoint, id) {
  try {
    const res = await fetch(endpoint, id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return await res.json()
  } catch (error) {
    throw error  
  }
}
export async function EntityGetByDni (dni) {
  try {
    let endpoint = `https://apiperu.dev/api/dni/${dni}`
    const res = await fetch(endpoint, {
      method: 'GET',
      contentType: 'application/json',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${TOKEN_CONSULTA_DNI}`
      }
    })
    return await res.json()
  } catch (error) {
    throw error     
  }
}