import './LandingPage.css'
import { Grid2, Stack } from '@mui/material'
import Card from '@mui/material/Card';

function LandingPage() {
  return (
    <Stack direction="column">
      <section className="hero">
        <h2>Your  <span>pet</span>,<wbr /> our <span>passion</span></h2>
        <h3><span>Free</span> of charge / pain / drama. </h3>
        <p>Todays veterinarians are the only doctors educated to protect the health of both animals and people. They work hard to address the health and welfare needs of every species of animal. Veterinarians also play critical roles in environmental protection, research, food safety, and public health.</p>
      </section>
      <Grid2 className="card" container spacing={4} justifyContent="center">
        <Card id="owner">
          <h4>For Pet Owners</h4>
          <p>Follow your pet&apos;s medical history.</p>
          <p>Find the best professionals in one place.</p>
        </Card>
        <Card id="exotic">
          <h4>For Exotic Animals</h4>
          <p>Specialists in exotic pets.</p>
          <p>Unique care for unique animals.</p>
        </Card>
        <Card id="wannabeowner">
          <h4>For Wannabe Owners</h4>
          <p>Find the best pet for you.</p>
          <p>Learn how to take care of your pet.</p>
        </Card>
        <Card id="vet">
          <h4>For Veterinarians</h4>
          <p>Easy cooperation with other clinics.</p>
          <p>Maintainable, modern patient database.</p>
        </Card>
      </Grid2>
    </Stack>
  )
}
export { LandingPage }
