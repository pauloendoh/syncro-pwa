import { AiOutlineArrowLeft, AiOutlineUser } from 'react-icons/ai'
import { FaUser, FaUsers } from 'react-icons/fa'
import { IoMdHeart } from 'react-icons/io'
import { MdChatBubble, MdRateReview, MdStar } from 'react-icons/md'
import { RiFireLine } from 'react-icons/ri'

const MyIcons = {
  ArrowLeftBack: AiOutlineArrowLeft,
  UserOutline: AiOutlineUser,
  Fire: RiFireLine,
  Review: MdRateReview,
  RatingStart: MdStar,
  UserProfile: FaUser,
  People: FaUsers, // multiple users
  Chat: MdChatBubble,
  Heart: IoMdHeart, // like, favorite
}

export default MyIcons

// example
const Test = () => {
  return <MyIcons.Fire />
}
