import { memo, useEffect, useRef } from 'react'
import { useAuthStoreV2 } from '../../hooks/zustand/useAuthStore'
import SubComponent from './SubComponent'

type Props = {}

const TestPage = ({ ...props }: Props) => {
  const { authUser, test, setTest } = useAuthStoreV2({
    authUser: true,
    test: true,
    setTest: true,
  })

  useEffect(() => {
    console.log('authUser changed')
  }, [authUser])

  useEffect(() => {
    console.log('test changed')
  }, [test])

  useEffect(() => {
    console.log('setTest')
  }, [setTest])

  const renderCountRef = useRef(0)
  renderCountRef.current++

  return (
    <div className="TestPage">
      <div>TestPage</div>
      <div>
        {JSON.stringify({
          test,
          authUserEmail: authUser?.email,
        })}
      </div>
      <button onClick={() => setTest('wow')}>set test</button>
      <button
        onClick={() => {
          console.log(renderCountRef.current)
        }}
      >
        get render count: {renderCountRef.current}
      </button>

      <SubComponent />
    </div>
  )
}

export default memo(TestPage)
