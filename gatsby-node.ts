const { createFilePath } = require('gatsby-source-filesystem');

exports.addDatesToFiles = (dates: any, files: any) => {
    const enrichedFiles = files.map((file: any) => {
        const d: string | undefined = Object.keys(dates).find(date => file.filepath.endsWith(date));
        if (!d) throw {name:"File not found", message:`No dates found for file '${file.filepath}'. Please update file with dates.`}
        const ret = {
            ...file,
            ...dates[d]
        };
        return ret;
    });
    return enrichedFiles;
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
