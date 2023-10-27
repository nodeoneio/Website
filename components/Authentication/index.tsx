'use client';
import { useContext } from 'react';
import AuthContext from '@/context/auth-context';
import { Button } from '../ui/button';

const Authentication = () => {
    const auth = useContext(AuthContext);

    return (
        <div className="flex items-center gap-1">
            {auth.session?.actor ? (
                <Button
                    type="submit"
                    className="bg-primary-500 text-white font-bold"
                    onClick={auth.onLogout}
                >
                    {auth.session.actor.toString()} Logout
                </Button>
            ) : (
                <Button
                    type="submit"
                    className="bg-primary-500 text-white font-bold"
                    onClick={auth.onLogin}
                >
                    Wallet Login
                </Button>
            )}
        </div>
    );
};

export default Authentication;
