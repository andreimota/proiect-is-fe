import React from "react";

import { Box, Container, Grid, Typography } from "@mui/material";

const Footer = () => {
  return <footer>
    <Box>
      <Container maxWidth="xl">
        <Grid container>
          <Typography>2022 AceTech</Typography>
          <Typography>All rights reserved.</Typography>
        </Grid>
      </Container>
    </Box>
  </footer>;
};

export default Footer;