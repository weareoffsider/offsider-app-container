import React from "react"
import ReactDOM from "react-dom"
import {ExampleAppState, UIChromeData} from "../ExampleAppData"

export default class DialogScreen extends React.Component<ExampleAppState, any> {
  render () {
    const {l10n, routes, businessData, popScreen} = this.props
    const t_ = l10n.translate

    return <div className="DialogScreen">
      <h2>Some Dialog</h2>
      <p>Hello everyone.</p>
      <span>The counter is {businessData.counter}.</span>
      <a onClick={popScreen}>{t_('dismiss')}</a>
    </div>
  }
}