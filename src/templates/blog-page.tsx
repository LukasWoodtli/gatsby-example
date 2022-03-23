import React from "react";
import Layout from "../components/layout";
import {graphql} from "gatsby";
import {ListItemButton } from "gatsby-theme-material-ui";
import {Drawer, List, ListItemText, Box, ListItem, Chip, Divider} from "@mui/material";
import moment from "moment";

const headingToHrefFragment = (heading: string): string => {
    return "#" + heading.replace(" ", "-");
}
const calculateTocEntryPadding = (depth: number): number => (
    2 * (depth - 1)
)



const BlogPage = (props: any) => {
        const { data, pageContext } = props;
    console.log(pageContext);
    const { blogpost: { frontmatter: {date, tags, title}, html, headings}} = data;
    console.log(headings);
    const shortDate = date.split("T")[0];

    return (
        <Layout>
            <Box sx={{ display: 'flex' }}>
            <Drawer variant="permanent"
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                    }}>
                <Box sx={{ overflow: 'auto' }}>
                <List>
                    {headings.map((entry: any) => (
                        <Box sx={{pl: calculateTocEntryPadding(entry.depth)}}>
                        <ListItemButton key={entry.value}
                                        to={headingToHrefFragment(entry.value)}>
                            <ListItemText>
                                {entry.value}
                            </ListItemText>
                        </ListItemButton>
                        </Box>
                    ))}
                </List>
                </Box>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3}}>
            <h1>{title}</h1>
            <div className="flex items-center space-x-2">
                <p>Date: {shortDate}</p>
            </div>
            <h2>Tags</h2>
            {tags}
            <h2>TOC</h2>
            <h2>Content</h2>
            <div dangerouslySetInnerHTML={{__html:html}}/>
            </Box>
                <Drawer variant="permanent"
                        anchor='right'
                        sx={{
                            width: 240,
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                        }}>
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            <ListItem>
                                <ListItemText>
                                    Category
                                </ListItemText>
                                <Chip label="My Cat" variant="outlined" />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText>
                                    Tags
                                </ListItemText>
                                {["Dog", "Hund", "Pes"].map((entry: string) => <Chip label={entry} />)}
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText>
                                    Created
                                </ListItemText>
                                {moment(new Date(2022, 3, 21)).format('D. MMMM YYYY')}
                            </ListItem>
                            <Divider />                            <ListItem>
                                <ListItemText>
                                    Modified
                                </ListItemText>
                                {moment(new Date(2022, 3, 22)).format('D. MMMM YYYY')}
                            </ListItem>
                            <Divider />
                        </List>
                    </Box>
                </Drawer>



            </Box>
        </Layout>
    );
}

export const pageQuery = graphql`
query($slug: String!) {
    blogpost: markdownRemark(fields: {slug: {eq: $slug}}) {
        frontmatter {
            date
            title
            tags
        }
        headings {
          value
          depth
        }
        html

    }
}
`;

export default BlogPage;
