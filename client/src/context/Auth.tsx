import {
    createContext,
    createRef,
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState
} from "react";
import Login from "../pages/Login";
import { AuthCredential, IAuthErrorEventBus, IAuthService } from "../services/auth";

type Props = {
    authService: IAuthService;
    authErrorEventBus: IAuthErrorEventBus;
    children: React.ReactNode;
};

type AuthContextType = {
    user: AuthCredential | undefined;
    signUp: (
        userid: string,
        password: string,
        nickname: string,
        email: string,
        avatar?: string,
        bg?: string,
        bio?: string
    ) => Promise<void>;
    logIn: (userid: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const contextRef = createRef();

export function AuthProvider({ authService, authErrorEventBus, children }: Props) {
    const [user, setUser] = useState<AuthCredential | undefined>(undefined);

    useImperativeHandle(contextRef, () => (user ? user.token : undefined));

    useEffect(() => {
        authErrorEventBus.listen((err) => {
            console.log(err);
            setUser(undefined);
        });
    }, [authErrorEventBus]);

    useEffect(() => {
        authService.me().then(setUser).catch(console.error);
    }, [authService]);

    const signUp = useCallback(
        async (
            userid: string,
            password: string,
            nickname: string,
            email: string,
            avatar?: string,
            bg?: string,
            bio?: string
        ) =>
            authService
                .register(userid, password, nickname, email, avatar, bg, bio)
                .then((user: AuthCredential) => setUser(user)),
        [authService]
    );

    const logIn = useCallback(
        async (userid: string, password: string) => authService.login(userid, password).then((user) => setUser(user)),
        [authService]
    );

    const logout = useCallback(async () => authService.logout().then(() => setUser(undefined)), [authService]);

    const context = useMemo(
        () => ({
            user,
            signUp,
            logIn,
            logout
        }),
        [user, signUp, logIn, logout]
    );

    return (
        <AuthContext.Provider value={context}>
            {user ? (
                children
            ) : (
                <div className='app'>
                    <Login onRegister={signUp} onLogin={logIn} />
                </div>
            )}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export const fetchToken = () => contextRef.current;
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
