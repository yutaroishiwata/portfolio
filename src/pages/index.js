import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/layout"

const IndexPage = ({ data }) => (
  <Layout>
    <div className="showcase">
      {data.allDatoCmsWork.edges.map(({ node: work }) => (
        <div key={work.id} className="showcase__item">
          <figure className="card">
            <Link to={`/works/${work.slug}`} className="card__image">
              <GatsbyImage image={work.coverImage.gatsbyImageData} />
            </Link>
            <figcaption className="card__caption">
              <h6 className="card__title">
                <Link to={`/works/${work.slug}`}>{work.title}</Link>
              </h6>
              <div className="card__description">
                <p>{work.excerpt}</p>
              </div>
              <div className="card__outline">
                <p>{work.outline}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      ))}
    </div>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexQuery($language: String!) {
    allDatoCmsWork(
      locale: $language,
      sort: { fields: [position], order: ASC }) 
    {
      edges {
        node {
          id
          title
          slug
          excerpt
          outline
          coverImage {
            gatsbyImageData(
              width: 450
              placeholder: BLURRED
            )
          }
        }
      }
    }
  }
`
