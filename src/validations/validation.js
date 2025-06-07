import { ResponseError } from "../errors/response-error.js";
import { parseJoiError } from "./validation-helper.js";

const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (result.error) {
    const errors = parseJoiError(result.error);
    throw new ResponseError(400, "Validation Error", errors);
  } else {
    return result.value;
  }
};

export { validate };
