import { create } from 'zustand'
import computed from "zustand-computed"

type SampleStore = {
  todos: string[],
  addTodo: (todo: string) => void,
}

type ComputedStore = {
}

const computeState = (state: SampleStore): ComputedStore => ({

})

export const useSampleStore = create<SampleStore>()(
  computed(
    (set) => ({
      todos: [],
      addTodo: (todo: string) => {
        set((state) => {
          return ({
            todos: [...state.todos, todo]
          })
        })
      },
    }), computeState)
)

