"use client";
import styles from "../dashboard.module.css";
import SmallLoad from "@/components/smallLaoding/smallLoad";
import { api } from "@/data/api";
import { useDashAuth } from "../DashCotext/DashContext";
import ToastP from "@/components/popupToast/ToastP";
import { useForm, useToast, useLoading } from "@/customHooks";
import { z } from "zod";
import useFormValidation from "@/customHooks/useFormValidation";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const DashboardAuth = () => {
  const { accessToken, setAccessToken } = useDashAuth();

  const { formData, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });
  const { loading, startLoading, stopLoading } = useLoading();
  const { popInfo, showToast } = useToast();
  const { email, password } = formData;
  const { errors, validate, handleBlur, clearError } = useFormValidation(loginSchema);

  const handleAuth = async (e) => {
    e.preventDefault();

    const validation = validate({ email, password });
    if (!validation.isValid) {
      showToast("Please fix the errors below", false);
      return;
    }

    startLoading();
    try {
      const response = await fetch(`${api}/admin/logIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-store",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      showToast(data?.message, data?.success);
      console.log(data);
      if (data?.success) {
        setTimeout(() => {
          setAccessToken(data?.token);
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
  };

  console.log(accessToken);
  return (
    <aside className={styles.dashAuth}>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          name="email"
          placeholder="Mr. Email"
          onChange={(e) => { handleChange(e); clearError("email"); }}
          onBlur={handleBlur}
          value={email}
          className={errors.email ? styles.inputError : ""}
        />
        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        <input
          type="password"
          name="password"
          placeholder="Ms. Password"
          onChange={(e) => { handleChange(e); clearError("password"); }}
          onBlur={handleBlur}
          value={password}
          className={errors.password ? styles.inputError : ""}
        />
        {errors.password && <span className={styles.errorText}>{errors.password}</span>}
        <button type="submit" disabled={loading}>
          {loading ? <SmallLoad /> : "Try To Auth"}
        </button>
      </form>
      <ToastP popInfo={popInfo} />
    </aside>
  );
};

export default DashboardAuth;
