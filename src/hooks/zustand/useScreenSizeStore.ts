import { create } from 'zustand'

interface IStore {
  screenWidth: number
  setScreenWidth: (width: number) => void

  screenHeight: number
  setScreenHeight: (height: number) => void

  lvhHeight: number // largest value height
  setLvhHeight: (height: number) => void

  diffLvh: number
  setDiffLvh: (diff: number) => void
}

const useScreenSizeStore = create<IStore>((set, get) => ({
  screenWidth: 0,
  setScreenWidth: (width) => set({ screenWidth: width }),
  screenHeight: 0,
  setScreenHeight: (height) => set({ screenHeight: height }),

  lvhHeight: 0,
  setLvhHeight: (height) => set({ lvhHeight: height }),

  diffLvh: 0,
  setDiffLvh: (diff) => set({ diffLvh: diff }),
}))

export default useScreenSizeStore
