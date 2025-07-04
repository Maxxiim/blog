const updateArticle = async (slug, articleData) => {
  try {
    const dataUserLocalStorage = localStorage.getItem("userData");
    const parseDataUser = JSON.parse(dataUserLocalStorage);
    const token = parseDataUser.token;

    const url = await `https://blog-platform.kata.academy/api/articles/${slug}`;
    const response = await fetch(url, {
      method: "PUT",
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
  } catch (error) {
    console.log(error);
  }
};

export default updateArticle;
