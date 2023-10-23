import { ChangeEvent } from 'react';
import styles from './Search.module.scss';
import { Dispatch, SetStateAction } from 'react';

export interface IProps {
  nameSearch: string;
  setNameSearch: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string>>;
}

export const Search = ({ nameSearch, setNameSearch, setError }: IProps) => {
  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setNameSearch(e.target.value);
    setError('');
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        name="name"
        value={nameSearch}
        onChange={handleChangeSearch}
      />
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.8033 13.8033C10.8744 16.7322 6.12563 16.7322 3.1967 13.8033C0.267767 10.8744 0.267767 6.12563 3.1967 3.1967C6.12563 0.267767 10.8744 0.267767 13.8033 3.1967C16.7322 6.12563 16.7322 10.8744 13.8033 13.8033ZM14.1457 14.8545C10.8078 17.8256 5.69007 17.7109 2.48959 14.5104C-0.829864 11.191 -0.829864 5.80905 2.48959 2.48959C5.80905 -0.829864 11.191 -0.829864 14.5104 2.48959C17.7115 5.69065 17.8256 10.8097 14.8529 14.1475L19.4605 18.7551C19.6558 18.9504 19.6558 19.267 19.4605 19.4622C19.2653 19.6575 18.9487 19.6575 18.7534 19.4622L14.1457 14.8545Z"
          fill="#432EAB"
        />
      </svg>
    </div>
  );
};
