export const successResponse = (req) => {
  return {
    error: false,
    message: req.message,
    body: req.data,
  }
}

export const errorResponse = (error) => {
  if (process.env.NODE_ENV === 'development') {
    console.dir({ error })
  }
  return {
    error: true,
    message: error?.response?.error?.message,
    errorBody: error?.response?.error,
  }
}
