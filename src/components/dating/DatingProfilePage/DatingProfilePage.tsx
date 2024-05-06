import { useMyDatingProfileQuery } from '../../../hooks/react-query/dating/dating-profile/useMyDatingProfileQuery'
import DatingLayout from '../DatingLayout/DatingLayout'

type Props = {}

const DatingProfilePage = ({ ...props }: Props) => {
  const { data } = useMyDatingProfileQuery()
  return (
    <DatingLayout>
      <div>{JSON.stringify(data)}</div>
    </DatingLayout>
  )
}

export default DatingProfilePage
