import APIClient from "@/services/api-client";
const apiClient = new APIClient()
const useDemo =()=>{
    const endpoint = "/university/scholarship/list";
    return apiClient.getQuery(endpoint)
}
export default useDemo;