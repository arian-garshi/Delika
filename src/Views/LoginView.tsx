import AuthenticationInterface from '../Components/AuthForm';
import ViewWrapper from '../Components/ViewWrapper';

const Login: React.FC = () => {
    return (
        <ViewWrapper>
            <AuthenticationInterface />
        </ViewWrapper>
    );
};

export default Login;