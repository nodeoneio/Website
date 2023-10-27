'use client';
import React, {
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import { Session, SessionKit } from '@wharfkit/session';
import { getSessionKit } from '@/lib/utils';

type AuthContextType = {
    session: Session | undefined;
    onLogout: () => void;
    onLogin: () => void;
};

const AuthContext = React.createContext<AuthContextType>({
    session: undefined,
    onLogout: () => {},
    onLogin: () => {},
});

let sessionKit: SessionKit;

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession]: [
        Session | undefined,
        Dispatch<SetStateAction<Session | undefined>>
    ] = useState();

    useEffect(() => {
        if (!sessionKit) {
            sessionKit = getSessionKit();
        }
        sessionKit.restore().then((restored) => setSession(restored));
    }, []);

    const logoutHandler = () => {
        sessionKit.logout(session);
        setSession(undefined);
    };

    const loginHandler = async () => {
        const response = await sessionKit.login();
        setSession(response.session);
    };

    return (
        <AuthContext.Provider
            value={{
                session: session,
                onLogout: logoutHandler,
                onLogin: loginHandler,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export default AuthContext;
