export const postCreateUser = async (dataUser) => {
  try {
    const response = await fetch(
      "https://blog-platform.kata.academy/api/users",
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
        data: errorData,
      };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export default postCreateUser;
