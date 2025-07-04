const dislikeArticle = async (slug) => {
  try {
    const dataUserLocalStorage = localStorage.getItem("userData");
    const parseDataUser = JSON.parse(dataUserLocalStorage);
    const token = parseDataUser.token;

    const url = `https://blog-platform.kata.academy/api/articles/${slug}/favorite`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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
    console.error("Ошибка при дизлайке статьи:", error);
    throw error;
  }
};

export default dislikeArticle;
