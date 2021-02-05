import type { Page, Plugin } from "@vuepress/core"
import { PostFilterOptions } from "./type"

const name = "vuepress-plugin-post-filter"

export const postFilter: Plugin = (options: PostFilterOptions, app) => {
  const {
    frontmatter = { draft: true, published: false },
    productionOnly = true,
  } = options

  return productionOnly && app.env.isProd
    ? { name }
    : {
        name,
        onInitialized(app) {
          const frontmatterFilter = (page: Page) =>
            Object.keys(frontmatter)
              .map((key) => (a: Page) =>
                a.frontmatter[key] !== frontmatter[key]
              )
              .every((fn) => fn(page))

          app.pages = app.pages.filter(frontmatterFilter)
        },
      }
}

export default postFilter
