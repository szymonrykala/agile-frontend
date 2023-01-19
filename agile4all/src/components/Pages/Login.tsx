import Layout from '../Layout';
import Header from '../Header';



function Login() {
    return <>
        <Layout.Root
            sx={{
                ...({
                    height: '100vh',
                    overflow: 'hidden',
                }),
            }}
        >
            <Layout.Header>
                <Header />
            </Layout.Header>

            <Layout.Main>
                logowanie


            </Layout.Main>
        </Layout.Root>
    </>
}

export default Login



