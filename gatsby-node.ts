const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');


export function addDatesToFiles(dates: any, files: any) {
    return files.map((file: any) => {
        const d: string | undefined = Object.keys(dates).find(date => file.filepath.endsWith(date));
        if (!d) throw {name:"File not found", message:`No dates found for file '${file.filepath}'. Please update file with dates.`}
        return {
            ...file,
            ...dates[d]
        };
    });
}

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

    BlogPostQuery.data.allMarkdownRemark.nodes.forEach(({fields: { slug, date }}: any) => {
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
