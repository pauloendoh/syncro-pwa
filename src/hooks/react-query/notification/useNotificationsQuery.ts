import { useQuery } from "@tanstack/react-query"

import { urls } from "../../../utils/urls"
import { NotificationDto } from "./types/NotificationDto"

export const useNotificationsQuery = () => {
  return useQuery<NotificationDto[], Error>([urls.api.notifications])
}
