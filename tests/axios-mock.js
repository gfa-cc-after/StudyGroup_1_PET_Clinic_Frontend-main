export async function registerUser(email, user, pass) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, username: user, password: pass })
    }
    const response = await fetch(import.meta.env.REACT_BACKENTD_URL, options);
    return response
}