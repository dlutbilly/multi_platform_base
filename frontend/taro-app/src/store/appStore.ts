import { create } from 'zustand'

interface AppState {
  loading: boolean
  theme: 'light' | 'dark'
  language: 'zh' | 'en'
  setLoading: (loading: boolean) => void
  setTheme: (theme: 'light' | 'dark') => void
  setLanguage: (language: 'zh' | 'en') => void
}

export const useAppStore = create<AppState>((set) => ({
  loading: false,
  theme: 'light',
  language: 'zh',
  setLoading: (loading) => set({ loading }),
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language })
}))
