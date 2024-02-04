
import { RootState } from ".";
import { api } from "../api";
import { MOCK_LINKS } from "../constants/mock";
import { ILink, ILinkSliceState } from "../types/store"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: ILinkSliceState = {
  links: [],
  isLoading: true,
  pagination: {
    page: 0,
    pageLimit: 25,
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
      console.log("Req new links.\nSorting: ", `${sort.sortDir}_${sort.sortBy}` )

      // await new Promise((resolve) => setTimeout(resolve, 1000))
      // thunkAPI.dispatch(setLinks(MOCK_LINKS))

      const response = await api
        .get<ILink[]>("api/statistics", { params: {
          limit: pagination.pageLimit,
          order: `${sort.sortDir}_${sort.sortBy}`
        }})

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
      console.log("New links mounted: ", payload.payload)
    },
    setSort: (state, payload: PayloadAction<"short" | "target" | "counter">) => {
      state.sort.sortBy = payload.payload
      state.sort.sortDir = state.sort.sortDir === "asc" ? "desc" : "asc"
    }
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

export const { setLinks, setSort } = linkSlice.actions

export default linkSlice.reducer