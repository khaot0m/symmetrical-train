import gql from 'graphql-tag';


const Queries = {
  bookQuery: gql`
  {
    books{
      title
      author
    }
  }`

};
export default Queries;
