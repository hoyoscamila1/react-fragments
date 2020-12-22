/**
 * SAMPLE:
 * IMPLEMENTATION OF INTERNATIONLISATION WITHOUT USE OF IL8N PLUGIN,
 * DEFAULT GATSBY PAGE CREATION IS OVERRIDEN.
 * DONE IN ORDER TO INCLUDE TRANSLATED STRINGS IN SITE'S HTML FOR GOOGLE SEO BOTS TO CRAWL.
 */

const path = require(`path`)
const queryAll = require(`./graphql-sample.js`)

// @TODO: Remove once allPages is introduced
const pathPrefix = (lang) => (lang !== "en" ? lang : "")

exports.createPages = async ({
  graphql,
  actions: { createPage, createRedirect },
}) => {
  const homeTemplate = path.resolve(`./src/templates/homePage/index.tsx`)
  const authorTemplate = path.resolve(`./src/templates/authorPage/index.tsx`)
  const defaultTemplate = path.resolve(`./src/templates/defaultPage/index.tsx`)

  await graphql(querySample)
    .then(({ data: { allData } }) => {
      const { allProjects, allTranslations, allPages } = allData

      allProjects.forEach((project) => {
        const globalPageContext = {
          project,
          translations: allTranslations.filter(
            (t) => t.language === project.language
          ),
        }

        allPages.forEach((page) => {
          if (page.language === project.language) {
            const pagesPageContext = {
              id: page.id,
              name: page.name,
              slug: page.slug,
              ...globalPageContext,
              relatedPages: page.relatedPages,
            }
            switch (page.name) {
              case "Home":
                createPage({
                  path: `${pathPrefix(project.language)}/`,
                  component: homeTemplate,
                  context: pagesPageContext,
                })
                break
              case "Author":
                createPage({
                  path: `${page.slug}`,
                  component: authorTemplate,
                  context: pagesPageContext,
                })
                break
              default:
                createPage({
                  path: `${page.slug}`,
                  component: defaultTemplate,
                  context: pagesPageContext,
                })
            }
          }
        })

        const notFoundPage = {
          path: `${pathPrefix(project.language)}/404/`,
          component: notFoundTemplate,
          context: {
            slug: "/404",
            ...globalPageContext,
            relatedPages: [],
          },
        }

        const pages = [notFoundPage]

        // 301 redirect & add trailing slash
        const trailingSlash301 = (page) => {
          if (page.path !== `/`) {
            createRedirect({
              fromPath: `${page.path}`,
              toPath: `${page.path}/`,
              statusCode: 301,
            })
          }
        }

        pages.forEach((page) => {
          if (page) {
            createPage(page)
            trailingSlash301(page)
          }
        })
      })
    })

    .catch((error) => {
      throw new Error(error)
    })
}
