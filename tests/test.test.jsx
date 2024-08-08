import { jwtDecode } from "jwt-decode"
import { it,  describe} from 'vitest'

describe('RegistrationForm', () => {
    it('should render the form', async () => {
        const jwt= "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwic3ViIjoiYUBtLmNvbSIsImlhdCI6MTcyMzEzNjc0OCwiZXhwIjoxNzIzMTM4NTQ4fQ.aFhxwDe4IDUbr_VlmSxjG1t7bsXL3eilZW6bvTuX3aA"
        
        const decodedToken = jwtDecode(jwt)

        console.log(decodedToken.role)
    })
})