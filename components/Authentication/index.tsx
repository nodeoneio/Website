'use client';
import { useContext } from 'react';
import AuthContext from '@/context/auth-context';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

const Authentication = () => {
    const auth = useContext(AuthContext);
    const [t] = useTranslation();
    return (
        <div className="flex items-center gap-1 max-md:hidden">
            {auth.session?.actor ? (
                <Button
                    type="submit"
                    className="bg-primary-500 text-white font-bold"
                    onClick={auth.onLogout}
                >
                    {auth.session.actor.toString()} {t('Logout')}
                </Button>
            ) : (
                <Button
                    type="submit"
                    className="bg-primary-500 text-white font-bold"
                    onClick={auth.onLogin}
                >
                     {t('Login')}
                </Button>
            )}
        </div>
    );
};

export default Authentication;
