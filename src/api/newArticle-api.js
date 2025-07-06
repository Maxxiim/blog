const createNewArticle = async (articleData) => {
  try {
    const dataUserLocalStorage = localStorage.getItem("userData");
    const parseDataUser = JSON.parse(dataUserLocalStorage);
    const token = parseDataUser.token;

    const url = "https://blog-platform.kata.academy/api/articles";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(articleData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw {
        status: errorData.status,
        data: errorData,
      };
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export default createNewArticle;
