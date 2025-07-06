export const postAuthUser = async (dataUser) => {
  try {
    const response = await fetch(
      "https://blog-platform.kata.academy/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUser),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw {
        status: response.status,
        error: errorData,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
