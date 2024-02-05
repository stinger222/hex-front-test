
import { RootState } from ".";
import { api } from "../api";
import { ILink, ILinkSliceState } from "../types/store"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: ILinkSliceState = {
  links: [],
  isLoading: true,
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
      // await new Promise((resolve) => setTimeout(resolve, 1000))

      // thunkAPI.dispatch(setLinks(MOCK_LINKS))
      // thunkAPI.dispatch(setTotalLinksCount(502))
      
      const response = await api
      .get<ILink[]>("api/statistics", { params: {
        limit: pagination.pageLimit,
        order: `${sort.sortDir}_${sort.sortBy}`,
        offset: pagination.page * pagination.pageLimit
        }})
        
      thunkAPI.dispatch(setTotalLinksCount(response.headers["x-total-count"]))
      thunkAPI.dispatch(setLinks(response.data))
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    setLinks: (state, payload: PayloadAction<ILink[]>) => {
      state.links = payload.payload
    },
    setSort: (state, payload: PayloadAction<"short" | "target" | "counter">) => {
      state.sort.sortBy = payload.payload
      state.sort.sortDir = state.sort.sortDir === "asc" ? "desc" : "asc"
    },
    setTotalLinksCount: (state, payload: PayloadAction<number>) => {
      state.pagination.totalCount = payload.payload
    },
    setPage: (state, payload: PayloadAction<number>) => {
      state.pagination.page = payload.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLinks.pending, (state) => {
      if (!state.links.length) state.isLoading = true
    }),
    builder.addCase(fetchLinks.fulfilled, (state) => {
      state.isLoading = false
    }),
    builder.addCase(fetchLinks.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export const { setLinks, setSort, setTotalLinksCount, setPage} = linkSlice.actions

export default linkSlice.reducer