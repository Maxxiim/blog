const delArticle = async (slug) => {
  const dataUserLocalStorage = localStorage.getItem("userData");
  const parseDataUser = JSON.parse(dataUserLocalStorage);
  const token = parseDataUser.token;

  try {
    const url = `https://blog-platform.kata.academy/api/articles/${slug}`;
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

    return true;
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

export default delArticle;
