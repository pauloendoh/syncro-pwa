import { Anchor, Box, Text, Title } from '@mantine/core'
import { useImportConnectorsQuery } from '../../../../hooks/react-query/connectors/useImportConnectorsQuery'
import useConnectorsModalStore from '../../../../hooks/zustand/modals/useConnectorsModalStore'

type Props = {}

const ConnectorsSection = ({ ...props }: Props) => {
  const { data } = useImportConnectorsQuery()
  const { openModal } = useConnectorsModalStore()

  return (
    <Box className="ConnectorsSection">
      <Title order={4}>Connectors</Title>
      <Text mt={4} size="sm" color="dimmed">
        Connected accounts will import ratings automatically every day. This
        way, you can save ratings on external websites and keep your Syncro
        account up to date.
      </Text>

      <Box mt={8}>
        <Anchor onClick={() => openModal('Anilist')}>Anilist</Anchor>
      </Box>
    </Box>
  )
}

export default ConnectorsSection
