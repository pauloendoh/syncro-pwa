type Props = {
  userImages: string[]
}

export const OverlappedUserImages = ({ ...props }: Props) => {
  return (
    <div className="OverlappedUserImages">
      {props.userImages.map((userImage, index) => {
        return (
          <div
            key={index}
            style={{
              display: 'inline',
              position: 'relative',
            }}
          >
            <img
              src={userImage}
              alt="User"
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                position: 'relative',
                right: index * 8,
                zIndex: props.userImages.length + index,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
