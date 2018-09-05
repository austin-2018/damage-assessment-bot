import { Context, HttpMethod, HttpRequest, HttpResponse, HttpStatusCode } from "azure-functions-ts-essentials";
import { ChatConnector, UniversalBot, Middleware, Prompts, MemoryBotStorage, SuggestedActions, CardAction, Message } from "botbuilder";

export function run(context: Context, req: HttpRequest): any {

  let badMethodResponse: HttpResponse = {
    status: HttpStatusCode.MethodNotAllowed,
    body: null
  };
  context.done(undefined, badMethodResponse);
}