import React from 'react'
import { graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import Layout from "../components/layout"

const PhotoLog = ({ data }) => (
  <Layout>
    <Masonry className="showcase">
      {data.allDatoCmsPhotolog.edges.map(({ node: photolog }) => (
        <div key={photolog.id} className="showcase__gallery">
          <Img fluid={photolog.photo.fluid} />
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
