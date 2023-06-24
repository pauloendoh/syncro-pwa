import { ScrollArea, Title } from '@mantine/core'
import { usePlanUpdatesQuery } from '../../../hooks/react-query/interest/usePlanUpdatesQuery'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import FlexCol from '../../_common/flex/FlexCol'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'
import MyPaper from '../../_common/overrides/MyPaper'
import PlanUpdatesSectionItem from './PlanUpdatesSectionItem/PlanUpdatesSectionItem'

type Props = {}

const PlanUpdatesSection = (props: Props) => {
  const { authUser } = useAuthStore()
  const { data, isLoading } = usePlanUpdatesQuery(authUser?.id)
  return (
    <FlexCol gap={16}>
      <Title order={4}>Plan updates</Title>
      <MyPaper>
        {isLoading && <CenterLoader />}

        <ScrollArea.Autosize mah={300}>
          <FlexCol gap={16}>
            {data?.map((item) => (
              <PlanUpdatesSectionItem item={item} />
            ))}
          </FlexCol>
        </ScrollArea.Autosize>
      </MyPaper>
    </FlexCol>
  )
}

export default PlanUpdatesSection
