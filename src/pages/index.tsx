import * as React from "react"
import Layout from "../components/layout";
import moment from "moment";

const IndexPage = () => {
  return (
    <Layout>
      <h1>My landing Page</h1>
        <div>Date: {moment(new Date(9999234569999)).format('D MMMM YYYY')}</div>
    </Layout>
  )
}

export default IndexPage
