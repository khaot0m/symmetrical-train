import gql from 'graphql-tag';


const Queries = {
  bookQuery: gql`
  {
    books{
      title
      author
      id
    }
  }`

};
export default Queries;
