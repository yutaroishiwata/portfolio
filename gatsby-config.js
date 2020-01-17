require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Creative Portfolio`,
  },
    plugins: [
      {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          trackingId: "UA-154111836-2",
          head: true,
        },
      },
      {
        resolve: `gatsby-source-datocms`,
        options: {
          apiToken: process.env.DATO_API_TOKEN,
        },
      },
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-sass`,
      `gatsby-transformer-remark`,
    ],
}
