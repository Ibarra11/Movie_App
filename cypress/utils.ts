import { faker } from "@faker-js/faker";
// was going to put this function in test-utils, but Cypress crashes because there is JSX in the file.
export function buildUser() {
  const email = faker.internet.email();
  const password = faker.internet.password();
  return { email, password };
}
