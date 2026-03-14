import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useThemeStore = create(
  devtools(
    persist(
      (set) => ({
        theme: "light",
        
        toggleTheme: () => set((state) => ({ 
          theme: state.theme === "light" ? "dark" : "light" 
        })),
        
        setTheme: (theme) => set({ theme }),
      }),
      { name: "theme-store" }
    )
  )
);

export default useThemeStore;
