export default function endGameValidation(session?: string, userInput?: string) {
  if (!session || !userInput) return "Missing body parameters";

  if (userInput.length > 100) return "User input must be less than 100 characters";
  if (userInput.length < 4) return "User input must be greater than 3 characters";
}
