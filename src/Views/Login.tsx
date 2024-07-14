import AuthenticationInterface from '../Components/AuthenticationInterface';
import ViewWrapper from '../Components/ViewWrapper';

const Login: React.FC = () => {
    return (
        <ViewWrapper>
            <AuthenticationInterface />
        </ViewWrapper>
    );
};

export default Login;