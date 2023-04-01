import axios from "axios";
import { ownerAPI } from "../Constants/API";

const ownerInstance = axios.create({
    baseURL: ownerAPI,
});
export default ownerInstance;
