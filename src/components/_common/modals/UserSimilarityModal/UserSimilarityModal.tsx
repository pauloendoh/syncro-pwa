import { Modal, Table, Tooltip } from '@mantine/core'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useUserHighSimilarityTypesQueryUtils } from '../../../../hooks/react-query/rating/user-similarity/useUserHighSimilarityTypesQueryUtils'
import { useUserSimilarityQuery } from '../../../../hooks/react-query/rating/user-similarity/useUserSimilarityQuery'
import { useUserInfoQuery } from '../../../../hooks/react-query/user/useUserInfoQuery'
import { useMyColors } from '../../../../hooks/useMyColors'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import useUserSimilarityModalStore from '../../../../hooks/zustand/modals/useUserSimilarityModalStore'
import { syncroItemTypes } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexVCenter from '../../flex/FlexVCenter'
import Span from '../../text/Span'

const UserSimilarityModal = () => {
  const { userId, closeModal } = useUserSimilarityModalStore()

  const { data: userInfo } = useUserInfoQuery(userId)

  const highSimilarityTypes = useUserHighSimilarityTypesQueryUtils(userId)

  const { data } = useUserSimilarityQuery(userId)

  const { userSimilarity: isOpen } = useMyRouterQuery()

  const { border } = useMyColors()

  return (
    <Modal
      size="sm"
      opened={!!isOpen}
      onClose={closeModal}
      title={`User similarity - ${userInfo?.username}`}
    >
      <Table
        sx={{
          '& thead tr th': {
            borderBottom: 'none',
          },
          '& tbody tr td': {
            borderTop: 'none',
          },
        }}
      >
        <thead>
          <tr>
            <th>Item type</th>
            <th
              style={{
                width: 80,
                textAlign: 'center',
              }}
            >
              Similarity
            </th>
            <th
              style={{
                width: 80,
                textAlign: 'center',
              }}
            >
              Shared
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            style={{
              borderBottom: '1px solid ' + border,
            }}
          >
            <td>Overall</td>
            <td align="center">
              {(data?.allSimilarity?.overallPercentage! * 100).toFixed(0)}%
            </td>
            <td align="center">{data?.allSimilarity.ratedSameItemsCount}</td>
          </tr>
          {syncroItemTypes.map((type) => {
            const info = data?.typeSimilarity?.find(
              (t) => t.itemType === type
            )?.similarityInfo

            const x = useSyncroItemTypeMap({
              itemType: type,
            })

            return (
              <tr key={type}>
                <td>
                  <FlexVCenter gap={8}>
                    {x.getTypeLabel()}{' '}
                    {highSimilarityTypes.includes(type) && (
                      <Tooltip label="Over 50% similarity and over 10 shared items">
                        <Span
                          size="xs"
                          sx={(theme) => ({
                            background: theme.colors.dark[4],
                            paddingBlock: 2,
                            paddingInline: 4,
                            borderRadius: 4,
                            cursor: 'help',
                          })}
                        >
                          High similarity
                        </Span>
                      </Tooltip>
                    )}
                  </FlexVCenter>
                </td>
                <td align="center">
                  {(info?.overallPercentage! * 100).toFixed(0)}%
                </td>
                <td align="center">{info?.ratedSameItemsCount}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Modal>
  )
}

export default UserSimilarityModal
