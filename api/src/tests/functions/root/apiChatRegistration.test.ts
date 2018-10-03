import apiChatRegistration, { ChatRegistrationDependencies } from "@/functions/root/api-chat-registration/index";
import ChatRegistrationService from "@/services/ChatRegistrationService";
import { HttpStatusCode } from "azure-functions-ts-essentials";
import HttpRequestMock from "@/tests/mocks/HttpRequestMock";
import genericMock from "../../mocks/genericMock";

describe("api/chat/request function", () => {
    
    describe("happy path", () => { 
               
        // Arrange
        let mockServices = {
            chatRegistrationService: genericMock<ChatRegistrationService>()
        };
        let httpRequest = new HttpRequestMock();
        let userId = "test-user-id";

        // Act
        let asyncAction = apiChatRegistration.implementation(httpRequest, mockServices, { session: <any>{ userId }, context: null });

        // Assert    
        it("should call the chat registration service once", async () => {
            await asyncAction;
            expect(mockServices.chatRegistrationService.$calls.register.length).toBe(1);
        });

        it("should pass request body to the service", async () => {
            await asyncAction;
            expect(mockServices.chatRegistrationService.$calls.register[0][0]).toBe(httpRequest.body);
        });

        it("should pass user id from session to the service", async () => {
            await asyncAction;
            expect(mockServices.chatRegistrationService.$calls.register[0][1]).toBe(userId);
        });

        it("should return OK status", async () => {
            let result = await asyncAction;
            expect(result.status).toBe(HttpStatusCode.OK);
        })

        it("should return empty body", async () => {
            let result = await asyncAction;
            expect(result.body).toBe(null);
        })
    });
});