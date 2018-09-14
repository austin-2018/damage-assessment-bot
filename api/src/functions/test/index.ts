import { HttpStatusCode } from "azure-functions-ts-essentials";
import rcdaHttpFunction from "@/function-utils/rcdaHttpFunction";
import UserSession from "@common/models/user/UserSession";

class TestRequestDependencies { }

export default rcdaHttpFunction<null, UserSession, TestRequestDependencies>(
  TestRequestDependencies,
  true,
  async (req, _, { session }) => {

    return { 
      status: HttpStatusCode.OK,
      body: session
    };
  });