// src/templates/Page.js
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
const PageTemplate = ({ data }) => (
  <Layout>
    <SEO
      title={data.wordpressPage.title}
      description={data.wordpressPage.excerpt}
    />
    <h1 className="title">{data.wordpressPage.title}</h1>
    <div className="content" dangerouslySetInnerHTML={{ __html: data.wordpressPage.content }} />
  </Layout>
)
export default PageTemplate
export const query = graphql`
  query($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      excerpt
      content
    }
  }
`
