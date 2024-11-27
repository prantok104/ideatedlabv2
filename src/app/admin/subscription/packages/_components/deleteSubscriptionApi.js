// deleteSubscriptionApi.js
import axios from "axios";
import Cookies from "js-cookie";

const deleteSubscriptionApi = async (id) => {
  const token = Cookies.get("accessToken");
  try {
    await axios.delete(`http://localhost:5000/api/v1/subscriptions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("Error deleting subscription:", error);
  }
};

export default deleteSubscriptionApi;
