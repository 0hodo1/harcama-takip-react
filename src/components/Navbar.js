import styles from "./Navbar.module.css";
import { AppBar, Box, Typography, Toolbar, Button } from "@mui/material";

import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <Link component="button" to="/" className={styles.link}>
              Harcama Takip
            </Link>
          </Typography>
          {!user && (
            <>
              <Button variant="outlined" color="inherit">
                <Link component="button" to="/login" className={styles.link}>
                  Login
                </Link>
              </Button>
              <Button variant="text" color="secondary">
                <Link component="button" to="/signup" className={styles.link}>
                  Signup
                </Link>
              </Button>
            </>
          )}
          {user && (
            <>
              <Typography variant="caption">
                Hello, {user.displayName}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                sx={{ ml: 5 }}
                onClick={logout}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
