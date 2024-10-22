import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

export interface HabitState {
  habits: Habit[];
  addHabit: (name: string, frequency: "daily" | "weekly") => void;
  removeHabit: (id: string) => void;
  toggleHabit: (id: string, date: string) => void;
}

const useHabitStore = create<HabitState>()(
  devtools(
    persist(
      (set) => {
        return {
          habits: [],
          removeHabit: (id: string) =>
            set((state) => ({
              habits: state.habits.filter((habit) => habit.id !== id),
            })),
          addHabit: (name: string, frequency: "daily" | "weekly") =>
            set((state) => ({
              habits: [
                ...state.habits,
                {
                  id: uuidv4(),
                  name,
                  frequency,
                  completedDates: [],
                  createdAt: new Date().toISOString(),
                },
              ],
            })),
          toggleHabit: (id: string, date: string) =>
            set((state) => ({
              habits: state.habits.map((habit) =>
                habit.id === id
                  ? {
                      ...habit,
                      completedDates: habit.completedDates.includes(date)
                        ? habit.completedDates.filter((d) => d !== date)
                        : [...habit.completedDates, date],
                    }
                  : habit
              ),
            })),
        };
      },
      { name: "habits-local", storage: createJSONStorage(() => localStorage) }
    )
  )
);
export default useHabitStore;
