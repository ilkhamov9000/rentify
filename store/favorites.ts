import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesState {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      toggleFavorite: (id: string) => {
        const { favoriteIds } = get();
        const isFavorite = favoriteIds.includes(id);
        
        if (isFavorite) {
          set({ favoriteIds: favoriteIds.filter((favId) => favId !== id) });
        } else {
          set({ favoriteIds: [...favoriteIds, id] });
        }
      },
      isFavorite: (id: string) => {
        return get().favoriteIds.includes(id);
      },
      clearFavorites: () => set({ favoriteIds: [] }),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useFavoritesStore;