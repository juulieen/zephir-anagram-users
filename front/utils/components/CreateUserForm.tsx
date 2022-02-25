import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import styles from "../../styles/CreateUserForm.module.css";

const CREATE_USER_QUERY = gql`
  mutation ($user: newUserInput!) {
    addUser(newUserData: $user) {
      id
      email
      fib
    }
  }
`;

const CreateUserForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("")
  const [addUser, { loading, error: mutationError }] =
    useMutation(CREATE_USER_QUERY);

  return (
    <form
      className={styles.form}
      onSubmit={async (e) => {
        e.preventDefault();
        if (!email) {
          setError("Email is required");
          return;
        }
        setError("");
        setEmail("");
        setInfo("");
        const start = Date.now();
        await addUser({ variables: { user: { email } } });
        const end = Date.now();
        setInfo(`Time to add user: ${end - start}ms`);
      }}
    >
      <label className={styles.label}>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => {
            // TODO debounce
            setEmail(e.target.value);
            e.target.value.length > 0
              ? setError("")
              : setError("Email is required");
            e.target.value.endsWith("@zephir.fr")
              ? setError("")
              : setError("Email must end with @zephir.fr");
          }}
        />
        {error}
      </label>
      <button type="submit">Create</button>
      <button type="reset">Reset</button>
      {loading && <p>Loading...</p>}
      {mutationError && <p>Error : {mutationError.message}</p>}
      {info && <p>{info}</p>}
    </form>
  );
};

export default CreateUserForm;
