import { Container, Grid } from "@mui/material";
import Form from "./Form";
import Liste from "./Liste";
import "./Home.module.css";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";

const Home = () => {
  const { user } = useAuthContext();
  const { docs, error } = useCollection("harcamalar");

  return (
    <Container sx={{ mt: 8 }}>
      <Grid container spacing={10}>
        <Grid item md={8} sm={12} xs={12}>
          {error && <p>{error}</p>}
          {docs && <Liste harcamalar={docs} />}
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <Form uid={user.uid} />
        </Grid>
      </Grid>
    </Container>
  );
};
export default Home;
