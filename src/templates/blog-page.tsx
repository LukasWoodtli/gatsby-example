import React from "react";
import Layout from "../components/layout";
import {graphql} from "gatsby";

const BlogPage = (props: any) => {
        const { data, pageContext } = props;
    console.log(pageContext);
    const { blogpost: { frontmatter: {date, tags, title}, html, tableOfContents}} = data;
    const shortDate = date.split("T")[0];

    return (
        <Layout>
            <h1>{title}</h1>
            <div className="flex items-center space-x-2">
                <p>Date: {shortDate}</p>
            </div>
            <h2>Tags</h2>
            {tags}
            <h2>TOC</h2>
            <div dangerouslySetInnerHTML={{__html:tableOfContents}}/>
            <h2>Content</h2>
            <div dangerouslySetInnerHTML={{__html:html}}/>
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
        html
        tableOfContents
    }
}
`;

export default BlogPage;
