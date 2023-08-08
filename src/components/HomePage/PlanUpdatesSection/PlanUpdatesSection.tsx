import { usePlanUpdatesQuery } from '../../../hooks/react-query/interest/usePlanUpdatesQuery'
import useAuthStore from '../../../hooks/zustand/useAuthStore'

type Props = {}

const PlanUpdatesSection = (props: Props) => {
  const { authUser } = useAuthStore()
  const { data, isLoading } = usePlanUpdatesQuery(authUser?.id)
  return null
  // return (
  //   <FlexCol gap={16}>
  //     <Title order={4}>Plan updates</Title>
  //     <MyPaper maw={360}>
  //       {isLoading && <CenterLoader />}

  //       <ScrollArea.Autosize mah={300}>
  //         <FlexCol gap={16}>
  //           {data?.map((item) => (
  //             <PlanUpdatesSectionItem item={item} />
  //           ))}
  //         </FlexCol>
  //       </ScrollArea.Autosize>
  //     </MyPaper>
  //   </FlexCol>
  // )
}

export default PlanUpdatesSection
