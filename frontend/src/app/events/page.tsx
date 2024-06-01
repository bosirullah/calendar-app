import CalenderView from "@/components/CalenderView";
import EventListing from "@/components/EventListing";
import { Container, Grid } from "@mui/material";

const Events = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={3} mt={4} mb={6}>
          <Grid item xs={12} sm={6} md={3}>
            <EventListing />
          </Grid>
          <Grid item xs={12} sm={6} md={9}>
            <CalenderView />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Events;
