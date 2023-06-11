import React from 'react'
import Slider from 'react-slick'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { GatsbyImage } from "gatsby-plugin-image";
import { graphql } from 'gatsby'
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsWork.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.datoCmsWork.title}</h1>
        <p className="sheet__lead">{data.datoCmsWork.excerpt}</p>
        <div className="sheet__slider">
          <Slider infinite={true} slidesToShow={2} arrows>
            {data.datoCmsWork.gallery.map(({ fluid }) => (
              <img alt={data.datoCmsWork.title} key={fluid.src} src={fluid.src} />
            ))}
          </Slider>
        </div>
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: data.datoCmsWork.descriptionNode.childMarkdownRemark.html,
          }}
        />
        <div className="sheet__gallery">
          <GatsbyImage image={data.datoCmsWork.coverImage.gatsbyImageData} />
        </div>
      </div>
      <div className="sheet__outline">
        <p>{data.datoCmsWork.outline}</p>
      </div>
    </article>
  </Layout>
)

export const query = graphql`
  query WorkQuery($slug: String!, $language: String!) {
    datoCmsWork(
      locale: $language,
      slug: { eq: $slug }
    ) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
      outline
      gallery {
        fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        gatsbyImageData(
          width: 600
          placeholder: BLURRED
        )
      }
    }
  }
`
