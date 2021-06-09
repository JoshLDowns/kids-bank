export const deleteAccount = (id, setIsLoading) => {
  const response = { status: "" };
  fetch(`/api/accounts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application.json",
    },
  })
    .then((res) => res.json())
    .then((_data) => {
      response.status = "ok";
      setIsLoading(false);
      return response;
    })
    .catch((error) => {
      response.status = "error";
      response.data = error.info;
      setIsLoading(false);
      return response;
    });
};
