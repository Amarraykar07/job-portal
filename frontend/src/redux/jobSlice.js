import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        searchedQuery: "",
        allAdminJobs: [],
        singleJob: null,
        searchJobQuery: "",
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobQuery: (state, action) => {
            state.searchJobQuery = action.payload;
        },
    },
});
export const { setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobQuery } = jobSlice.actions;
export default jobSlice.reducer;
