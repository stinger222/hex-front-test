export interface ILink {
  id: number,
  short: string,
  target: string // `https${string}`,
  counter: number
}

export type SortOrder = "asc_short" | "desc_short" | "asc_target" | "desc_target" | "asc_counter" | "desc_counter"

export interface ILinkSliceState {
  links: ILink[],
  isFetching: boolean,
  squeezing: {
    inProcess: boolean,
    result: string | null
  },
  pagination: {
    page: number,
    pageLimit: number,
    totalCount: number | null
  },
  sort: {
    sortBy: "short" | "target" | "counter",
    sortDir: "asc" | "desc"
  }
}

export interface IAuthSliceState {
  isAuthorized: boolean
}

export interface ILoginResponse {
  access_token:	string
  token_type: string
}