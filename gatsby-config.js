require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Yutaro Ishiwata`,
  },
    plugins: [
      {
        resolve: `gatsby-plugin-google-tagmanager`,
        options: {
          id: "GTM-5R3FQLS",
          includeInDevelopment: false,
          defaultDataLayer: { platform: "gatsby" }
        },
      },
      {
        resolve: `gatsby-source-datocms`,
        options: {
          apiToken: process.env.DATO_API_TOKEN,
        },
      },
      {
        resolve: `gatsby-plugin-react-i18next`,
        options: {
          languages: [`en`, `ja`],
          defaultLanguage: `en`,

          // you can pass any i18next options
          // pass following options to allow message content as a key
          i18nextOptions: {
            interpolation: {
              escapeValue: false // not needed for react as it escapes by default
            },
            keySeparator: false,
            nsSeparator: false
          },
        }
      },
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-sass`,
      `gatsby-transformer-remark`,
    ],
}
