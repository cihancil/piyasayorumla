import ForexData from '@src/models/ForexData'
import { create } from 'zustand'
import computed from "zustand-computed"

type UIStore = {
  editFollowedListEnabled: boolean,
  setEditingFollowedList: (editing: boolean) => void
  bottomSheetForexData: ForexData | null
  setBottomSheetForexData: (data: ForexData | null) => void
}

type ComputedStore = {
}

const computeState = (state: UIStore): ComputedStore => ({

})

export const useUIStore = create<UIStore>()(
  computed(
    (set) => ({
      editFollowedListEnabled: false,
      setEditingFollowedList: (editing: boolean) => {
        set({ editFollowedListEnabled: editing })
      },
      bottomSheetForexData: null,
      setBottomSheetForexData: (data: ForexData | null) => {
        set({ bottomSheetForexData: data })
      },
    }), computeState)
)

