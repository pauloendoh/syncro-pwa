import { create } from 'zustand'

interface IStore {
  screenWidth: number
  setScreenWidth: (width: number) => void
  screenHeight: number
  setScreenHeight: (height: number) => void
}

const useScreenSizeStore = create<IStore>((set, get) => ({
  screenWidth: 0,
  setScreenWidth: (width) => set({ screenWidth: width }),
  screenHeight: 0,
  setScreenHeight: (height) => set({ screenHeight: height }),
}))

export default useScreenSizeStore
