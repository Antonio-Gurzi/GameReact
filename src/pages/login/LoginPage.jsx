import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../../supabase/supabase-client";
import {
  FormSchema,
  ConfirmSchema,
  getErrors,
  getFieldError,
} from "../../lib/validationForm";

function LoginPage() {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const partialSchema = ConfirmSchema.pick({ email: true, password: true });
    const { error, data } = partialSchema.safeParse(formState);

    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
    } else {
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

  const onBlur = (property) => () => {
    if (!FormSchema.shape[property]) return;
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
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={onSubmit} noValidate>
                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${
                      isInvalid("email") ? "is-invalid" : ""
                    }`}
                    value={formState.email}
                    onChange={setField("email")}
                    onBlur={onBlur("email")}
                    aria-invalid={isInvalid("email")}
                    required
                    placeholder="Inserisci la tua email"
                  />
                  {formErrors.email && (
                    <div className="invalid-feedback">{formErrors.email}</div>
                  )}
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
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
                    placeholder="••••••••"
                  />
                  {formErrors.password && (
                    <div className="invalid-feedback">
                      {formErrors.password}
                    </div>
                  )}
                </div>

                {/* Bottone */}
                <button type="submit" className="btn btn-primary w-100">
                  Accedi
                </button>
              </form>
            </div>
          </div>
          <p className="text-center mt-3 text-muted">
            Non hai un account? <a href="/register">Registrati</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
