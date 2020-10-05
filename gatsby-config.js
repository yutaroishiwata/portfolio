require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Yutaro Ishiwata`,
  },
    plugins: [
      {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          trackingId: process.env.GOOGLE_TRACKING_ID,
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
