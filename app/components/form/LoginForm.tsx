import React from "react";

interface LoginFormProps {
  className: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (event: React.FormEvent<HTMLFormElement>) => void;
}

function LoginForm({ className, onChange, onSubmit }: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} onChange={onChange} className={className}>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
