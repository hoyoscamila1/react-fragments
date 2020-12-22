import { LanguageMenuProps } from "."

export const homePageMockData = { project: { language: "de", name: "Deutsche", slug: "/de/", iso: "de-DE"} }

const languageMenuMockData: LanguageMenuProps = {
  origin: "http://localhost",
  project: { id: "1", language: "en", name: "English", slug: "/en/" },
  relatedPages: [
    {
      id: "2",
      slug: "/de/kategorie/marketing/",
      language: "de",
      name: "German",
      path: "de",
    },
    {
      id: "3",
      slug: "/at/",
      language: "at",
      name: "Austria",
      path: "/at/",
    },
  ],
}

export default languageMenuMockData
