import LoginForm from "../features/authentication/LoginForm.jsx";
import Logo from "../ui/Logo.jsx";

function Login() {
  return (
    <main className="grid h-dvh content-center justify-center gap-10 bg-gray-50">
      <Logo />
      <h4>Log in to your account</h4>
      <LoginForm />
    </main>
  );
}

export default Login;
