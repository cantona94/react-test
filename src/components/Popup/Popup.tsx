import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styles from './Popup.module.scss';
import { IUser } from '../../types';
import { axiosUsersFromApi } from '../../api';

interface IProps {
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  visibility: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
}

export const Popup = ({
  userName,
  setUserName,
  visibility,
  setVisibility,
}: IProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>('');

  const axiosUser = async (userName: string) => {
    await axiosUsersFromApi(userName)
      .then(({ data }) => {
        const user = data.find((el) => el.name === userName);
        if (user) setUser(user);
      })
      .catch((err) => setError(err));
  };

  const handlerPopupClose = () => {
    setVisibility(false);
    setUser(null);
    setUserName('');
    setError('');
  };

  const getDateFormat = (date: string): string => {
    const milliseconds = new Date(Date.parse(date));
    return (
      ('0' + milliseconds.getDate()).slice(-2) +
      '.' +
      ('0' + (milliseconds.getMonth() + 1)).slice(-2) +
      '.' +
      milliseconds.getFullYear()
    );
  };

  useEffect(() => {
    axiosUser(userName);
  }, [userName]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as HTMLElement)
      ) {
        handlerPopupClose();
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [visibility, setVisibility, setUserName]);

  if (!user || error) {
    return <h2>User not found</h2>;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.popup} ref={popupRef}>
        <div className={styles.popup__name}>
          <h2>{user.name}</h2>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handlerPopupClose}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.585786 0.585786C1.36683 -0.195262 2.63317 -0.195262 3.41421 0.585786L10 7.17157L16.5858 0.585786C17.3668 -0.195262 18.6332 -0.195262 19.4142 0.585786C20.1953 1.36683 20.1953 2.63317 19.4142 3.41421L12.8284 10L19.4142 16.5858C20.1953 17.3668 20.1953 18.6332 19.4142 19.4142C18.6332 20.1953 17.3668 20.1953 16.5858 19.4142L10 12.8284L3.41421 19.4142C2.63317 20.1953 1.36683 20.1953 0.585786 19.4142C-0.195262 18.6332 -0.195262 17.3668 0.585786 16.5858L7.17157 10L0.585786 3.41421C-0.195262 2.63317 -0.195262 1.36683 0.585786 0.585786Z"
              fill="black"
            />
          </svg>
        </div>
        <table className={styles.popup__table}>
          <tbody>
            <tr>
              <td className={styles.property}>Телефон:</td>
              <td className={styles.value}>{user.phone}</td>
            </tr>
            <tr>
              <td className={styles.property}>Почта:</td>
              <td className={styles.value}>{user.email}</td>
            </tr>
            <tr>
              <td className={styles.property}>Дата приема:</td>
              <td className={styles.value}>{getDateFormat(user.hire_date)}</td>
            </tr>
            <tr>
              <td className={styles.property}>Должность:</td>
              <td className={styles.value}>{user.email}</td>
            </tr>
            <tr>
              <td className={styles.property}>Подразделение:</td>
              <td className={styles.value}>{user.department}</td>
            </tr>
          </tbody>
        </table>
        <div className={styles.popup__info}>
          <p>Дополнительная информация:</p>
          <span>
            Разработчики используют текст в качестве заполнителя макта страницы.
            Разработчики используют текст в качестве заполнителя макта страницы.
          </span>
        </div>
      </div>
    </div>
  );
};
