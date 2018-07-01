import gql from 'graphql-tag';

const Subscriptions = {
  bookSubscription: gql`
  subscription bookCreated{
    bookCreated{
      title
      author
    }
  }
`
};
export default Subscriptions;
