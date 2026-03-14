"use client";
import { useState } from "react";
import styles from "../dashboard.module.css";
import SmallLoad from "@/components/smallLaoding/smallLoad";
import { api } from "@/data/api";
import { useDashAuth } from "../DashCotext/DashContext";
import ToastP from "@/components/popupToast/ToastP";
import { useForm, useToast, useLoading } from "@/customHooks";

const DashboardAuth = () => {
  const { accessToken, setAccessToken } = useDashAuth();

  const { formData, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });
  const { loading, startLoading, stopLoading } = useLoading();
  const { popInfo, showToast } = useToast();
  const { email, password } = formData;

  const handleAuth = async (e) => {
    e.preventDefault();
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
          onChange={handleChange}
          value={email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Ms. Password"
          onChange={handleChange}
          value={password}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? <SmallLoad /> : "Try To Auth"}
        </button>
      </form>
      <ToastP popInfo={popInfo} />
    </aside>
  );
};

export default DashboardAuth;
