// updateSubscriptionApi.js
import axios from "axios";
import Cookies from "js-cookie";

const updateSubscriptionApi = async (id, data) => {
  const token = Cookies.get("accessToken");
  console.log(id, data);
  try {
    const response = await axios.put(
      `http://localhost:5000/api/v1/subscriptions/${id}`,
      {
        ...data,
        notifyAt: data.notifyAt.toString(), // Ensure it's a string
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Error updating subscription:", error);
  }
};

export default updateSubscriptionApi;
