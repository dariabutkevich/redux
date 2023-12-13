import { fetchLogin } from "../../ApiFile";
import { z } from "zod";

export const getUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const user = await fetchLogin(email, password);
      if (user) {
        dispatch({
          type: "USER/SET",
          payload: user,
        });
      } else {
        throw new Error("Invalid user");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        dispatch({
          type: "USER/ERROR/SET",
          payload: err.format(),
        });
      }
    }
  };
