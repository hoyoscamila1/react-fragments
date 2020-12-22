import { shallow } from "enzyme"
import * as React from "react"

import LanguageMenu from "."
import languageMenuMockData from "./mockData"
import { homePageMockData } from "./mockData"

let realUseContext: object
let useContextMock: any

// setup mock
beforeEach(() => {
  realUseContext = React.useContext
  useContextMock = jest.fn()
})
// cleanup mock
afterEach(() => {
  realUseContext
})


describe("Language Menu", () => {

  it("should render language menu correctly", () => {
    useContextMock.mockReturnValue(homePageMockData)
    const languageMenu = shallow(
      <LanguageMenu {...languageMenuMockData} />
    )
    expect(languageMenu).toMatchSnapshot()
  })
  
  it("renders language menu no relatedpages", () => {
    useContextMock.mockReturnValue(homePageMockData)
    const languageMenu = shallow(
      <LanguageMenu
        project={homePageMockData.project}
        relatedPages={[]}
        origin={languageMenuMockData.origin}
      />
    )
    expect(languageMenu).toMatchSnapshot()
  })

  it("should set css class on menu open click", () => {
    useContextMock.mockReturnValue(homePageMockData)
    const languageMenu = shallow(
      <LanguageMenu {...languageMenuMockData}/>
    )

    languageMenu.find("button").simulate("click")
    expect(languageMenu.find(".options-open").length).toBe(1)
    languageMenu.find("button").simulate("click")
    expect(languageMenu.find(".options-closed").length).toBe(1)
  })
})
