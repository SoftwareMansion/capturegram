const KEY = "4441793-36a46550b17c6fcdbdacb8def";

export const getImagesPage = async page => {
  const response = await fetch(
    `https://pixabay.com/api/?key=${KEY}&per_page=10&page=${page + 1}`
  );

  if (response.status === 200) {
    const json = await response.json();
    return { ...json, page };
  } else {
    throw response.text();
  }
};
