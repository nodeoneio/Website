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

let sessionKit: SessionKit | undefined;

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession]: [
        Session | undefined,
        Dispatch<SetStateAction<Session | undefined>>
    ] = useState();

    useEffect(() => {
        try {
            if (!sessionKit) {
                sessionKit = getSessionKit();
            }
            if (sessionKit)
                sessionKit.restore().then((restored) => setSession(restored));
        } catch (error: any) {
            console.log(`Modal manually Closed ${error.message}`);
            return;
        }
    }, []);

    const logoutHandler = () => {
        if (sessionKit) sessionKit.logout(session);
        setSession(undefined);
    };

    const loginHandler = async () => {
        if (sessionKit) {
            const response = await sessionKit.login();
            if (response) setSession(response.session);
        }
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
