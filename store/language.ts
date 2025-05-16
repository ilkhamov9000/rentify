import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Language = "en" | "ru" | "uz";

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "rentify-language-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useLanguageStore;