import Head from "next/head";
import Container from "../../../components/container";
import Layout from "../../../components/layout";
import PostTitle from "../../../components/post-title";
import { CMS_NAME } from "../../../lib/constants";
import Example from "../../../components/template/with_dark_nav_and_footer";
import ExampleCategory from "../../../components/template/with_text_header_and_image_product_grid";

export default function Test() {

    return (
        <Layout preview={false}>
            <Head>
                <title>
                    {`Test | Next.js Blog Example with ${CMS_NAME}`}
                </title>
                <meta
                    property="og:image"
                />
            </Head>


            <ExampleCategory />
            {/* <Example /> */}
        </Layout>
    );
}
