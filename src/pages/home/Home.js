import { Container, Grid, Paper } from "@mui/material";
import Form from "./Form";
import "./Home.module.css";

import { useAuthContext } from "../../hooks/useAuthContext";

const Home = () => {
  const { user } = useAuthContext();
  return (
    <Container sx={{ mt: 8 }}>
      <Grid container spacing={3}>
        <Grid item md={8} sm={12} xs={12}>
          <Paper> List</Paper>
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <Form uid={user.uid} />
        </Grid>
      </Grid>
    </Container>
  );
};
export default Home;
