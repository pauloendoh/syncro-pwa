import { Modal, Table } from '@mantine/core'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useUserSimilarityQuery } from '../../../../hooks/react-query/rating/user-similarity/useUserSimilarityQuery'
import { useUserInfoQuery } from '../../../../hooks/react-query/user/useUserInfoQuery'
import { useMyColors } from '../../../../hooks/useMyColors'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import useUserSimilarityModalStore from '../../../../hooks/zustand/modals/useUserSimilarityModalStore'
import { syncroItemTypes } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

const UserSimilarityModal = () => {
  const { userId, closeModal } = useUserSimilarityModalStore()

  const { data: userInfo } = useUserInfoQuery(userId)

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
          // thead tr th no border bottom
          '& thead tr th': {
            borderBottom: 'none',
          },
          // tbody tr td no border bottom
          '& tbody tr td': {
            borderTop: 'none',
          },
        }}
      >
        <thead>
          <tr>
            <th>Type</th>
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
              Count
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
                <td>{x.getTypeLabel()}</td>
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
