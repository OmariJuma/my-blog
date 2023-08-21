import { gql } from "@apollo/client";

const getAuthorsQuery = gql`
    query GetAuthors{
        authors{
            firstName
            lastName
        }
    }
`;

const getArticlesQuery = gql`
    query GetArticles{
        articles {
            id
            title
            text
            author
        }
    }
`;

const addArticleMutation = gql`
    mutation AddArticle($title: String!, $category: String!, $authorId: ID!) {
        addArticle(title: $title, category: $category, authorId: $authorId) {
            id
            title
        }
    }
`;

const getArticleQuery = gql`
    query GetArticle($id: ID) {
        article(id: $id) {
            id
            title
            category
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`;

export { getAuthorsQuery, getArticlesQuery, addArticleMutation, getArticleQuery };
