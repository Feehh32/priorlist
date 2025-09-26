// Handle what happens when the API returns an error
const handleApiError = (response, addToast) => {
  if (!response) return;

  switch (response.code) {
    case 401:
      addToast("Você precisa estar logado para realizar essa ação.", "warning");
      break;
    case 404:
      addToast("Recurso não encontrado.", "error");
      break;
    case 500:
      addToast(
        "Ocorreu um erro no servidor. Tente novamente mais tarde.",
        "error"
      );
      break;
    default:
      // Para qualquer outro erro que vier da API
      if (response.error) {
        addToast(
          response.error.message || "Ocorreu um erro inesperado.",
          "error"
        );
      }
      break;
  }
};

export default handleApiError;
