import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/layout"

const CV = ({ data: { cv } }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={cv.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{cv.title}</h1>
        <p className="sheet__lead">{cv.subtitle}</p>
        <div className="sheet__gallery">
          <GatsbyImage image={cv.photo.gatsbyImageData} />
        </div>
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: cv.bioNode.childMarkdownRemark.html,
          }}
        />
      </div>
    </article>
  </Layout>
)

export default CV

export const query = graphql`
  query CvQuery($language: String!) {
    cv: datoCmsCv(locale: $language) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      subtitle
      photo {
        gatsbyImageData(
          width: 600
          placeholder: BLURRED
          forceBlurhash: false
        )
      }
      bioNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
