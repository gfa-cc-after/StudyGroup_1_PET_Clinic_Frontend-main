import { http, HttpResponse } from 'msw'
 
export const handlers = [
  // Intercept "post https://example.com/user" requests...

  //http.post(import.meta.env.REACT_BACKENTD_URL+'/register', (req, res, ctx) => {
    http.post('http://localhost:8081/register', (req, res, ctx) => {
    // ...and respond to them using this JSON response.
    const { data } = req.body

    return res(
      ctx.json({
        email: data.email,
        username: data.username,
        password: data.password,
      }),
      ctx.ok("User registered successfully"))
    })
]