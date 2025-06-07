const parseJoiError = (error) => {
  const details = error.details.map((err) => ({
    field: err.path.join("."), 
    message: err.message.replace(/['"]/g, ""), 
  }));

  const structuredErrors = {};

  for (const detail of details) {
    const { field, message } = detail;
    if (!structuredErrors[field]) {
      structuredErrors[field] = [];
    }
    structuredErrors[field].push(message);
  }

  return structuredErrors;
};

export { parseJoiError };
