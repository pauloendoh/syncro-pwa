import { Box } from '@mantine/core'
import { useRouter } from 'next/router'
import DefaultLayout from '../_common/layout/DefaultLayout'
import UsersDashboard from './UsersDashboard/UsersDashboard'

type Props = {}

const AdminPage = ({ ...props }: Props) => {
  const router = useRouter()

  const main = router.query.main as string
  const sub = router.query.sub as string

  return (
    <DefaultLayout>
      {router.query.main} / {router.query.sub}
      <Box mt={24}>
        {main === 'dashboard' && sub === 'users' && <UsersDashboard />}
      </Box>
    </DefaultLayout>
  )
}

export default AdminPage
