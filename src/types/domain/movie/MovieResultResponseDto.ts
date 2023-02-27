import { InterestDto } from "../interest/InterestDto"
import { RatingDto } from "../rating/RatingDto"
import { SyncroItemDto } from "../syncro-item/SyncroItemDto"

export interface Meta {
  operation: string
  requestId: string
  serviceTimeMs: number
}

interface Image {
  height: number
  id: string
  url: string
  width: number
}

interface Role {
  character: string
  characterId: string
}

interface Principal {
  id: string
  legacyNameText: string
  name: string
  category: string
  characters: string[]
  endYear: number
  episodeCount: number
  roles: Role[]
  startYear: number
  disambiguation: string
  attr: string[]
  as: string
  billing?: number
}

interface Image2 {
  height: number
  id: string
  url: string
  width: number
}

interface ParentTitle {
  id: string
  image: Image2
  title: string
  titleType: string
  year: number
}

interface Crew {
  category: string
  job: string
}

interface Summary {
  category: string
  displayYear: string
}

interface KnownFor {
  crew: Crew[]
  summary: Summary
  id: string
  title: string
  titleType: string
  year: number
}

export interface IImdbResultItem {
  id: string
  image: Image
  runningTimeInMinutes: number
  nextEpisode: string
  numberOfEpisodes: number
  seriesEndYear: number
  seriesStartYear: number
  title: string
  titleType: string
  year: number
  principals: Principal[]
  episode?: number
  season?: number
  parentTitle: ParentTitle
  previousEpisode: string
  legacyNameText: string
  name: string
  knownFor: KnownFor[]
  syncroItem?: SyncroItemDto
  myRating?: RatingDto
  myInterest?: InterestDto
}
