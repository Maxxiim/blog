const updateUser = async (newUserData) => {
  try {
    const dataUserLocalStorage = localStorage.getItem("userData");
    const parseDataUser = JSON.parse(dataUserLocalStorage);
    const token = parseDataUser.token;

    const url = `https://blog-platform.kata.academy/api/user`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user: newUserData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw {
        status: response.status,
        data: errorData,
      };
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error("Ошибка при обновлении пользователя:", error);
    throw error;
  }
};

export default updateUser;
