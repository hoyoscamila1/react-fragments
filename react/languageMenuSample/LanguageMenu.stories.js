import { withKnobs } from "@storybook/addon-knobs"
import * as React from "react"

import LanguageMenu from "./languageMenu"
import languageMenuMockData from "./mockData"

export default {
  title: "Language Menu",
  component: LanguageMenu,
  decorators: [
    withKnobs,
    story => <div style={{ padding: "2em" }}>{story()}</div>,
  ],
}

export const basic = () => {
  return <LanguageMenu {...languageMenuMockData} />
}
