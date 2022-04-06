import * as React from "react"
import Layout from "../components/layout";
import moment from "moment";
import {Grid, Paper, styled} from "@mui/material";
import {StaticImage} from "gatsby-plugin-image";

const Item = styled(Paper)(({ theme }) => ({
    spacing: 0,
    square: true,
    padding: 0,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    elevation: 0
}));

const IndexPage = () => {
  return (
    <Layout>
        <StaticImage src={"../../assets/images/Fingeralphabet_W.jpg"}
                     alt={"W-Logo"}
                     placeholder="tracedSVG"
        />

        <Grid container
              spacing={0}
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              columns={{ xs: 3, sm: 3, md: 1, lg: 1 }}>
            <Grid item sx={{xs: 2}}>
                <Item>xs=8</Item>
            </Grid>
            <Grid item xs={4}>
                <Item>
                    <h1>My landing Page</h1>
                    <div>Date: {moment(new Date(9999234569999)).format('D MMMM YYYY')}</div>
                </Item>
            </Grid>
            <Grid item xs={4}>
                <Item>Hello</Item>
            </Grid>
        </Grid>

    </Layout>
  )
}

export default IndexPage
