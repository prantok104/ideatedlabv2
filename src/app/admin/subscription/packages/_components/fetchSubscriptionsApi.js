import axios from "axios";
import Cookies from "js-cookie";
import appClient from "@/lib/axios";

const fetchSubscriptionsApi = async (params = {}) => {
  const token = Cookies.get("accessToken");
  const API_URL = "http://localhost:5000/api/v1/subscriptions";

  console.log("got params ", params);

  try {
    const response = await axios.get(API_URL, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response data ", response.data.data.total);
    return response.data;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    throw error;
  }

  // const url = `${process.env.NEXT_PUBLIC_API_URL}/subscriptions`;

  // const { data, error, isLoading, mutate } = appClient.useAxiosSWR(url, {
  //   params,
  // });

  // if (error) {
  //   console.error("Error fetching subscriptions:", error);
  // }
  // // console.log(data);
  // return { data, error, isLoading, mutate };
};

export default fetchSubscriptionsApi;
