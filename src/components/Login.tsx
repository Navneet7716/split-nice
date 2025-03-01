import { Container, Paper, Text, Title } from "@mantine/core";
import classes from "./Login.module.css";
import { GoogleLogin } from "@react-oauth/google";
import { LOGIN_ROUTE } from "../utils/urls";
import { apiClient } from "../utils/axios";

export function Login() {
    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Welcome back!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet? <span>Just login!</span>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        apiClient
                            .post(LOGIN_ROUTE, {
                                token: credentialResponse.credential,
                            })
                            .then((res) => {
                                console.log(res.data);
                            });
                    }}
                    onError={() => {
                        console.log("Login Failed");
                    }}
                />
            </Paper>
        </Container>
    );
}
