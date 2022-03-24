import type { GatsbyConfig } from "gatsby";


const config: GatsbyConfig = {
  siteMetadata: {
    title: `new`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: ["gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-plugin-mdx", "gatsby-transformer-remark", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    // @ts-ignore
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": `./content`
    },
    // @ts-ignore
    __key: "pages"
  },
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-autolink-headers`,
          options: {
            icon: false,
            className: `custom-anchor-class`,
            maintainCase: true,
            removeAccents: false,
            isIconAfterHeader: false,
          },
        },
        // `gatsby-remark-prismjs` should be placed after `gatsby-remark-autolink-headers`
      ]
    }
  },
  `gatsby-theme-material-ui`,
  `gatsby-transformer-json`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `./timestamps.json`,
    },
  },
  ]
};

export default config;
