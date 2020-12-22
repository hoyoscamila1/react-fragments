/**
 * SAMPLE: 
 * IMPLEMENTATION OF SITE LANGUAGE TOGGLE MENU
 * USING REACT HOOKS
 * BASED ON GATSBY-NODE-SAMPLE.JS AND GRQAPHQL-SAMPLE.JS
 * 
 * SOME FILES IMPORTED BELOW ARE OUT OF CONTEXT OF THIS SCOPE SAMPLE AND NOT AVAILABLE HERE
 */

import "./language-menu.scss"

import classNames from "classnames"
import { Link } from "gatsby"
import * as React from "react"

import ChevronDown from "../../../images/icon-arrow-down.svg"
import Globe from "../../../images/icon-globe.svg"
import { getTranslation } from "../../../utils/helpers"
import { ProjectProps, RelatedPages } from "../../../utils/pageContext"


interface PageProps {
  language: string
  slug: string
  name: string
  iso: string
}

export interface LanguageMenuProps {
  origin: string
  project: ProjectProps
  relatedPages: RelatedPages[]
}

const LanguageMenu: React.FC<LanguageMenuProps> = ({
  origin,
  project,
  relatedPages,
}) => {
  const [open, toggleMenu] = React.useState<boolean>(false)
  const addScroll = relatedPages && relatedPages.length > 2 ? "y-scroll" : null
  const isOpen = open ? "options-open" : "options-closed"
  const pages: PageProps[] =
    relatedPages.length > 0
      ? relatedPages
      : [
          {
            language: project.language === `en` ? `de` : `en`,
            slug: project.language === `en` ? `/de/` : `/`,
            name: project.language === `en` ? `Deutsch` : `English`,
            iso: project.language === `en` ? `de-DE` : `en-EN`,
          },
        ]

  return (
    <div className={"language-menu-wrapper"}>
      <div className={"language-menu "}>
        <Globe className="globe" />
        <div className={"dropdown"}>
          <button
            onClick={() => {
              toggleMenu(!open)
            }}
            className={"dropdown-item active"}
            name={getTranslation("language_menu")}
          >
            {project.language.toUpperCase()} -{" "}
            {project.language === "en" ? "English" : "Deutsch"}
            <ChevronDown className="chevron-down" />
          </button>
          <div
            className={classNames(
              "options animated slideInLangMenu faster",
              isOpen,
              addScroll
            )}
          >
            {pages.map((page: PageProps, i: number) => {
              return (
                <Link
                  to={
                    relatedPages.length > 0 && origin !== undefined
                      ? `${origin}${page.slug}`
                      : page.slug
                  }
                  hrefLang={page.iso}
                  key={`lang-menu-${page.language}-${i}`}
                  id={`lang-menu-${page.language}`}
                  rel={relatedPages.length > 0 && "alternate"}
                >
                  <div className={`dropdown-item `}>
                    {page.language.toUpperCase()} -{" "}
                    {project.language === "en" ? "Deutsch" : "English"}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LanguageMenu
