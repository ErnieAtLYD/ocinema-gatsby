/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const EventTemplate = path.resolve("./src/templates/Event.js")
  const PageTemplate = path.resolve("./src/templates/Page.js")
  const result = await graphql(`
    {
      allTribeEvents {
        edges {
          node {
            slug
            id
          }
        }
      }
      allWordpressPage {
        edges {
          node {
            slug
            id
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const BlogPosts = result.data.allTribeEvents.edges
  BlogPosts.forEach(post => {
    createPage({
      path: `/event/${post.node.slug}`,
      component: EventTemplate,
      context: {
        id: post.node.id,
      },
    })
  })
  const Pages = result.data.allWordpressPage.edges
  Pages.forEach(page => {
    createPage({
      path: `/${page.node.slug}`,
      component: PageTemplate,
      context: {
        id: page.node.id,
      },
    })
  })
}
