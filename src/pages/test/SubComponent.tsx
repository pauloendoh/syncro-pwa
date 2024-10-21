import { memo, useRef } from 'react'
import { useAuthStoreV2 } from '../../hooks/zustand/useAuthStore'

type Props = {}

const SubComponent = ({ ...props }: Props) => {
  const { test, test2, setTest2 } = useAuthStoreV2({
    test: true,
    test2: true,
    setTest2: true,
  })
  const renderCountRef = useRef(0)
  renderCountRef.current++

  return (
    <div
      className="SubComponent"
      style={{
        border: '1px solid red',
        padding: 4,
      }}
    >
      <div>SubComponent</div>
      <div>
        {JSON.stringify({
          test2,
        })}
      </div>
      <button onClick={() => setTest2('wow')}>set test 2</button>
      <div>get render count: {renderCountRef.current}</div>
    </div>
  )
}

export default memo(SubComponent)
