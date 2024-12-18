import { Button } from '@mantine/core'
import { SharedListDto } from '../../../../../hooks/react-query/shared-list/types/SharedListDto'
import { urls } from '../../../../../utils/urls/urls'
import FlexVCenter from '../../../flex/FlexVCenter'
import MyNextLink from '../../../overrides/MyNextLink'
import { OverlappedUserImages } from './OverlappedUserImages/OverlappedUserImages'

type Props = {
  item: SharedListDto
  onClick?: () => void
}

export const SharedListLinkButton = ({ ...props }: Props) => {
  return (
    <MyNextLink
      key={props.item.id}
      href={urls.pages.sharedList.id(props.item.id)}
      style={{
        width: '100%',
      }}
    >
      <Button
        fullWidth
        variant="subtle"
        color="dark"
        sx={{
          borderRadius: 0,
        }}
        onClick={() => {
          if (props.onClick) {
            props.onClick()
          }
        }}
        styles={{
          inner: {
            justifyContent: 'left',
          },
        }}
      >
        <FlexVCenter>
          <OverlappedUserImages
            userImages={props.item.users.map(
              (user) => user.user.profile.pictureUrl
            )}
          />
          <span
            style={{
              fontWeight: 'normal',
            }}
          >
            {props.item.title}
          </span>
        </FlexVCenter>
      </Button>
    </MyNextLink>
  )
}
