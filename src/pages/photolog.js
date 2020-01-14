import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import Layout from "../components/layout"

const About = ({ data: { photolog } }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={photolog.seoMetaTags} />
      <div className="sheet__inner">
        <div className="sheet__gallery">
          <Img fluid={photolog.photo.fluid} />
        </div>
      </div>
    </article>
  </Layout>
)

export default About

export const query = graphql`
  query PhotologQuery {
    photolog: datoCmsPhotolog {
      photo {
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`
