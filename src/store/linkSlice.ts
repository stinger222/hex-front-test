import { RootState } from "."
import { api } from "../api"
import { ILink, ILinkSliceState } from "../types/store"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: ILinkSliceState = {
  links: [],
  isFetching: true,
  squeezing: {
    inProcess: false,
    result: null
  },
  pagination: {
    page: 0,
    pageLimit: 15,
    totalCount: null
  },
  sort: {
    sortBy: "counter",
    sortDir: "desc"
  }
}

export const fetchLinks = createAsyncThunk(
	"link/fetchLinks",
	async (_, thunkAPI) => {
		try {
      const {sort, pagination} = (thunkAPI.getState() as RootState).link
      
      const response = await api
        .get<ILink[]>("api/statistics", { params: {
          limit: pagination.pageLimit,
          order: `${sort.sortDir}_${sort.sortBy}`,
          offset: pagination.page * pagination.pageLimit
        }})
        
      thunkAPI.dispatch(setTotalLinksCount(response.headers["x-total-count"]))
      thunkAPI.dispatch(setLinks(response.data))

      // await new Promise((resolve) => setTimeout(resolve, 1000))
      // thunkAPI.dispatch(setLinks(MOCK_LINKS))
      // thunkAPI.dispatch(setTotalLinksCount(502))
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const squeezeLink = createAsyncThunk<string, string>(
	"link/squeezeLink",
	async (linkToSqueeze, thunkAPI) => {
		try {
      const response = await api
        .post<{short: string}>("api/squeeze", null, {
          params: {
            link: linkToSqueeze
          }
        })

        thunkAPI.dispatch(fetchLinks())
        return thunkAPI.fulfillWithValue(response.data.short)

      // await new Promise((resolve) => setTimeout(resolve, 1000))
      // thunkAPI.dispatch(fulfillSqueeze("https://short-link-from-backend/s/123"))

		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    setLinks: (state, action: PayloadAction<ILink[]>) => {
      state.links = action.payload
    },
    setSort: (state, action: PayloadAction<"short" | "target" | "counter">) => {
      state.sort.sortBy = action.payload
      state.sort.sortDir = state.sort.sortDir === "asc" ? "desc" : "asc"
    },
    setTotalLinksCount: (state, action: PayloadAction<number>) => {
      state.pagination.totalCount = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload
    },
    resetSqueezing: (state) => {
      state.squeezing.result = null
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchLinks.pending, (state) => {
      if (!state.links.length) state.isFetching = true
    }),
    builder.addCase(fetchLinks.fulfilled, (state) => {
      state.isFetching = false
    }),
    builder.addCase(fetchLinks.rejected, (state) => {
      state.isFetching = false
    }),
    builder.addCase(squeezeLink.pending, (state) => {
      state.squeezing.inProcess = true
    }),
    builder.addCase(squeezeLink.fulfilled, (state, action: PayloadAction<string>) => {
      state.squeezing.inProcess = false
      // state.squeezing.result = env.base_url+action.payload
      state.squeezing.result = `${import.meta.env.VITE_BASE_URL}/s/${action.payload}`
    }),
    builder.addCase(squeezeLink.rejected, (state) => {
      state.squeezing.inProcess = false
    })
  }
})

export const {
  setLinks,
  setSort,
  setTotalLinksCount,
  setPage,
  resetSqueezing,
} = linkSlice.actions

export default linkSlice.reducer