import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchJobQuery } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get?keyword=${searchJobQuery || ""}`,
                    { withCredentials: true }
                );
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                // Silently handle 401 auth errors on unauthenticated home page
                if (error?.response?.status !== 401 && error?.response?.status !== 404) {
                    console.log(error);
                }
            }
        };
        if (user) fetchAllJobs();
    }, [searchJobQuery, user]);
};

export default useGetAllJobs;
