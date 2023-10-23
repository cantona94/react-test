import { useEffect, useState } from 'react';
import { Search, User, Popup } from '../../components';
import styles from './Home.module.scss';
import { axiosUsersFromApi } from '../../api';
import { IUser } from '../../types';

export const Home = () => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [nameSearch, setNameSearch] = useState<string>('');
  const [visibility, setVisibility] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const axiosUsers = async (nameSearch: string) => {
    await axiosUsersFromApi(nameSearch)
      .then(({ data }) => setUsers(data))
      .catch((err) => setError(err));
  };

  useEffect(() => {
    axiosUsers(nameSearch);
  }, [nameSearch]);

  return (
    <div className={styles.conteiner}>
      <Search
        nameSearch={nameSearch}
        setNameSearch={setNameSearch}
        setError={setError}
      />
      {!users?.length || error ? (
        <h1 className={styles.error}>Users not found</h1>
      ) : (
        <div className={styles.users}>
          {users.map((user) => (
            <User
              user={user}
              setVisibility={setVisibility}
              setUserName={setUserName}
              key={user.name}
            />
          ))}
        </div>
      )}
      {userName && (
        <Popup
          userName={userName}
          setUserName={setUserName}
          visibility={visibility}
          setVisibility={setVisibility}
        />
      )}
    </div>
  );
};
