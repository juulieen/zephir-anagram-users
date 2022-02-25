import { gql, useQuery, useSubscription } from "@apollo/client";

const QUERY = gql`
  {
    users {
      email
      id
      fib
    }
  }
`;

const SUBSCRIPTION_NEW_USER = gql`
  subscription {
    userAdded {
      id
      email
      fib
    }
  }
`;

const ListUser = () => {
  const { loading, error, data, subscribeToMore } =
    useQuery<{ users: Array<{ id: string; email: string; fib: string }> }>(
      QUERY
    );
  subscribeToMore<{userAdded: {id: string, email: string, fib: string}}>({
    document: SUBSCRIPTION_NEW_USER,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      if (
        prev.users.find(
          (user) => user.id === subscriptionData.data.userAdded.id
        )
      )
        return prev;
      return Object.assign({}, prev, {
        users: [...prev.users, subscriptionData.data.userAdded],
      });
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        Error : <code>{JSON.stringify(error, null, 4)}</code>
      </p>
    );
  console.log(loading, error, data);
  return (
    <ul>
      {data?.users?.map?.(({ id, email, fib }) => (
        <li key={id}>
          {email} - {fib}
        </li>
      ))}
    </ul>
  );
};

export default ListUser;
