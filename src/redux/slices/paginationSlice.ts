import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PaginationState {
    page: number;
    limit: number;
    total: number;
}

const initialState: PaginationState = {page: 1, limit: 10, total: 0};

export const paginationSlice = createSlice({
    name: "pagination",
    initialState: initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
        },
        setTotal(state, action: PayloadAction<number>) {
            state.total = action.payload;
        }
    },
});

export const paginationSliceActions = {
    ...paginationSlice.actions,
}
