import React from "react";
import Layout from "../components/layout";

export default function BlogPage() {
    return (
        <Layout>
            <h1>Blog
                Title</h1>
            <div className="flex items-center space-x-2">
                <p>Date</p>
            </div>
            <div>
                Article Body
            </div>
        </Layout>
    );
}
