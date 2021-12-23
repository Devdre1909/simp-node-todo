export default function ({ $axios }) {
  $axios.onRequest((config) => {
    if (process.env.NODE_ENV.toLowerCase() === 'development') {
      console.log(`Making ${config.method} request to ${config.url}`)
    }
  })

  $axios.onError((error) => {
    if (process.env.NODE_ENV.toLowerCase() === 'development') {
      console.dir(error)
    }
  })
}
