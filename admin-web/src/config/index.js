console.log(import.meta.env.MODE)
export default {
    baseUrl: import.meta.env.MODE === 'development' ? 'http://127.0.0.1:10882' : 'https://fz-api.586213.xyz',
    systemName: '电动瓦力'
}
