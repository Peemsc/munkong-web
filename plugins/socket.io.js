import io from 'socket.io-client'
// const URL = process.env.API_URL || 'http://localhost:3010'
const URL = "https://munkong-api.gramick.com"
const socket = io(URL)

export default socket
