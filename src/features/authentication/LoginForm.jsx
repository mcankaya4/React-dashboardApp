import Form from "../../ui/Form.jsx";
import { useState } from "react";
import FormRowVertical from "../../ui/FormRowVertical.jsx";
import Button from "../../ui/Button.jsx";
import { setLogin } from "../../services/apiAuth.js";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setLogin({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <input
          type="email"
          id="email"
          className="rounded-sm border border-gray-300 bg-white px-3 py-2 shadow-xs"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <input
          type="password"
          className="rounded-sm border border-gray-300 bg-white px-3 py-2 shadow-xs"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">Log in</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
