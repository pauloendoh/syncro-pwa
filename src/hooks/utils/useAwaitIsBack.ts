import useIsBackStore from '../zustand/useIsBackStore'

export const awaitIsBack = async (maxAwaitMs = 250) => {
  const result = await new Promise<boolean>((resolve) => {
    const interval = setInterval(() => {
      const isBack = useIsBackStore.getState().isBack

      if (isBack) {
        clearInterval(interval)
        resolve(true)
      }
    }, 50)
    setTimeout(() => {
      clearInterval(interval)
      resolve(false)
    }, maxAwaitMs)
  })

  console.log({
    isBack: result,
  })

  return result
}
