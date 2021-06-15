const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplates = path.resolve("./src/template/blog-post.js")
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            id
            frontmatter {
              path
              date
              title
              author
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) {
      return Promise.reject(res.errors)
    }
    res.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplates,
      })
    })
  })
}
