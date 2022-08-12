import { CyHttpMessages } from "cypress/types/net-stubbing";

type GraphQLTestRequest<T extends unknown = void> = (
  req: CyHttpMessages.IncomingRequest,
  operationName: string
) => T;

export const hasOperationName: GraphQLTestRequest<boolean> = (
  req,
  operationName
) => {
  const { body } = req;
  return (
    body.hasOwnProperty("operationName") && body.operationName === operationName
  );
};

export const aliasQuery: GraphQLTestRequest = (req, operationName) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `${operationName}Query`;
  }
};
export const aliasMutation: GraphQLTestRequest = (req, operationName) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `${operationName}Mutation`;
  }
};
