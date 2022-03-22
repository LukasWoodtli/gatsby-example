const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
//const { addDatesToFiles } = require('./tools/helper')


exports.onCreateNode = ({ node, getNode, actions }: any) => {
    const { createNodeField } = actions;
    if (node.internal.type === 'MarkdownRemark') {
        const slug = createFilePath({ node, getNode,
            basePath: 'pages' });
        createNodeField({
            node,
            name: 'slug',
            value: slug,
        });
    }
};

exports.createPages = async ({ actions, graphql, reporter }: any) => {

    const { createPage } = actions;

    const BlogPostTemplate =
        path.resolve('./src/templates/blog-page.tsx');

    const BlogPostQuery = await graphql(`
    {
        allMarkdownRemark(filter: { frontmatter: { type: { eq: "Blog" } } })
        {
            nodes
            {
                frontmatter {
                    date
                }
                fields
                {
                    slug
                }
            }
        }
    }`
    );

    if (BlogPostQuery.errors) {
        reporter.panicOnBuild('Error while running GraphQL query.');
        return;
    }

    let nodes = BlogPostQuery.data.allMarkdownRemark.nodes;
    //nodes = addDatesToFiles({"a": {created: 9, modified: 3}}, nodes);

    nodes.forEach(({fields: { slug, date }}: any) => {
        console.log(date);
        createPage({
            path: `blog${slug}`,
            component: BlogPostTemplate,
            context: {
                slug: slug,
                dates: { created: 123, modified: 987 }
            },
        });
    });
};
