import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { urls } from "../../../utils/urls"

export const useMangaPanelsQuery = (itemId: string) => {
  return useQuery<string[], AxiosError>([urls.api.mangaPanels(itemId)])
}
