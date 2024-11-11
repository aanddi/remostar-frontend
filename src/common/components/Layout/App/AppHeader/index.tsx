import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from '@components';

import { useAppSelector, useAuth, useModal, useModalCitys, useModalLogin } from '@common/hooks';
import { Login, Map } from '@common/icon';

import Logo from '@assets/Logo.svg?react';

import { Layout } from 'antd';

import ProfileMenu from './components/ProfileMenu';

import styles from './AppHeader.module.scss';
import menuData from './menu-data';

const { Header } = Layout;

const AppHeader = () => {
  const location = useLocation();

  const { city } = useAppSelector((state) => state.citys);
  const user = useAuth();

  const { handleOpenModal: handleModalLogin } = useModalLogin();
  const { handleOpenModal: handleModalCity } = useModalCitys();

  const [openMenuMobile, setOpenMenuMobile] = useState(false);

  const { isOpenModal, handleOpenModal, handleCloseModal } = useModal();

  useEffect(() => {
    setOpenMenuMobile(false);
  }, [location.pathname]);

  return (
    <Header className={styles.header}>
      <div className="container">
        <div className={styles.body}>
          <Link to="/" className={styles.logo}>
            <Logo />
          </Link>
          <div className={`${openMenuMobile && styles.isOpenMenu} ${styles.content}`}>
            <div className={styles.wrapper}>
              <nav className={styles.menu}>
                {menuData.map((item) => {
                  const active = () => {
                    return item.activePath.some(
                      (path) =>
                        location.pathname === path || location.pathname.startsWith(`${path}/`),
                    );
                  };
                  return (
                    <Link
                      key={item.key}
                      to={item.path}
                      className={`${styles.item} ${active() && styles.active}`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
              <div className={styles.actions}>
                <Button
                  type="text"
                  size="large"
                  className={styles.city}
                  icon={<Map size={18} />}
                  onClick={() => handleModalCity()}
                >
                  {city}
                </Button>
                {user ? (
                  <ProfileMenu
                    openModal={isOpenModal}
                    handleOpenModal={handleOpenModal}
                    handleCloseModal={handleCloseModal}
                  />
                ) : (
                  <Button
                    type="text"
                    size="large"
                    className={styles.login}
                    icon={<Login size={18} />}
                    onClick={() => handleModalLogin()}
                  >
                    Войти
                  </Button>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpenMenuMobile(!openMenuMobile)}
            className={`${openMenuMobile && styles.isOpen} ${styles.burgerButton}`}
            aria-label="Открыть меню"
          >
            <span />
          </button>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
