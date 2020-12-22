module.exports = `
query queryAll {
  allData {
    allProjects {
      id
      name
      language
      slug
      iso
      google_analytics_ua_code
    }
    allTranslations {
      language
      identification
      value
    }
    allPages {
      id
      name
      language
      slug
      iso
      relatedPages {
        id
        slug
        language
        iso
      }
    }
  }
}
`
