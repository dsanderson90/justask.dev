/** @jsx jsx */
import { jsx } from "../context";
import { graphql, Link } from "gatsby";
import styled from "@emotion/styled";
import { Layout } from "../components/Layout";
import PostWrapper from "../components/PostWrapper";

const IndexWrapper = styled.main`
  display: grid;
  grid-auto-rows: 150px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1em;
`;

export default ({ data }) => {
  return (
    <Layout>
      <IndexWrapper>
        {data.allMdx.nodes.map(({ id, excerpt, frontmatter, fields }) => (
          <PostWrapper key={id}>
            <Link
              sx={{
                textDecoration: "none"
              }}
              to={fields.slug}
            >
              <h1
                sx={{
                  color: "greyBlack",
                  fontFamily: "body"
                }}
              >
                {frontmatter.title}
              </h1>
              <p
                sx={{
                  color: "greyBlack",
                  fontFamily: "body"
                }}
              >
                {frontmatter.date}
              </p>
              <p
                sx={{
                  color: "greyBlack",
                  fontFamily: "body"
                }}
              >
                {frontmatter.category}
              </p>
              <p
                sx={{
                  color: "greyBlack",
                  fontFamily: "body"
                }}
              >
                {excerpt}
              </p>
            </Link>
          </PostWrapper>
        ))}
      </IndexWrapper>
    </Layout>
  );
};

export const query = graphql`
  query HTML_INDEX_QUERY {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { published: { eq: true }, category: { eq: "html" } }
      }
    ) {
      nodes {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date(formatString: "YYYY MMMM Do")
          category
        }
        fields {
          slug
        }
      }
    }
  }
`;
