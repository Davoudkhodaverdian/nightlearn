import { NextResponse } from "next/server";
import { customValidationResult } from "../../fundamental";
import { ValidationChain } from "express-validator";

export async function validateRequest<T>(values: { body: T }, validations: ValidationChain[]) {

  // Execute all rules
  for (let validation of validations) {
    await validation.run(values);
  }

  // Retrieve validation results
  const errors = customValidationResult(values);
  if (!errors.isEmpty()) {
    return NextResponse.json(
      {
        message: "Validation Error",
        errors: errors.array(),
        status: 400
      },
      { status: 400 }
    );
  }

  return null; // Allow the request to proceed to the next step

}
