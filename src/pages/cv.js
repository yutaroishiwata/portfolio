import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import Layout from "../components/layout"

const About = ({ data: { cv } }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={cv.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{cv.title}</h1>
        <p className="sheet__lead">{cv.subtitle}</p>
        <div className="sheet__gallery">
          <Img fluid={cv.photo.fluid} />
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

export default About

export const query = graphql`
  query CvQuery {
    cv: datoCmsCv {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      subtitle
      photo {
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
      bioNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
