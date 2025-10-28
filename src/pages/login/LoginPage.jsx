import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../../supabase/supabase-client";
import {
  FormSchema,
  ConfirmSchema,
  getErrors,
  getFieldError,
} from "../../lib/validationForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  // 🔹 Invia il form
  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    // ✅ valida solo email e password, non tutto lo schema completo
    const partialSchema = ConfirmSchema.pick({ email: true, password: true });
    const { error, data } = partialSchema.safeParse(formState);

    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
    } else {
      console.log("Dati validi:", data);

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (loginError) {
        console.error(loginError);
        alert("Errore nel login 👎!");
      } else {
        alert("Accesso effettuato 👍!");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/");
      }
    }
  };

  // 🔹 Gestione blur con protezione
  const onBlur = (property) => () => {
    if (!FormSchema.shape[property]) return; // evita errori per campi non presenti
    const message = getFieldError(property, formState[property]);
    setFormErrors((prev) => ({ ...prev, [property]: message }));
    setTouchedFields((prev) => ({ ...prev, [property]: true }));
  };

  const isInvalid = (property) => {
    if (formSubmitted || touchedFields[property]) {
      return !!formErrors[property];
    }
    return undefined;
  };

  const setField = (property) => (e) => {
    setFormState((prev) => ({
      ...prev,
      [property]: e.target.value,
    }));
  };

  return (
    <div className="container mt-5">
      <h2>Accedi</h2>
      <form onSubmit={onSubmit} noValidate className="mt-3">
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${isInvalid("email") ? "is-invalid" : ""}`}
            value={formState.email}
            onChange={setField("email")}
            onBlur={onBlur("email")}
            aria-invalid={isInvalid("email")}
            required
          />
          {formErrors.email && (
            <div className="invalid-feedback">{formErrors.email}</div>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={`form-control ${
              isInvalid("password") ? "is-invalid" : ""
            }`}
            value={formState.password}
            onChange={setField("password")}
            onBlur={onBlur("password")}
            aria-invalid={isInvalid("password")}
            required
          />
          {formErrors.password && (
            <div className="invalid-feedback">{formErrors.password}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
}
