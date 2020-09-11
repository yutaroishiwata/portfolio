import React from 'react'
import { graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import Layout from "../components/layout"
import { Helmet } from "react-helmet";

const PhotoLog = ({ data }) => (
  <Layout>
    <Helmet>
      <title>PhotoLog</title>
    </Helmet>
    <Masonry className="showcase">
      {data.allDatoCmsPhotolog.edges.map(({ node: photolog }) => (
        <div key={photolog.id} className="showcase__gallery">
          <Img fluid={photolog.photo.fluid} />
          <figcaption className="showcase__caption">{photolog.caption}</figcaption>
        </div>
      ))}
    </Masonry>
  </Layout>
)

export default PhotoLog

export const query = graphql`
  query PhotologQuery {
    allDatoCmsPhotolog(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          caption
          photo {
            fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`
