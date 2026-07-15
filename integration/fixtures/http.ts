import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { createHttpClient } from "@duplojs/http/client";
import { DPE, E } from "@duplojs/utils";

declare function createPost(userId: any, post: any): Promise<void>;

useRouteBuilder("POST", "/users/{userId}/posts")
	.extract({
		params: {
			userId: DPE.string(),
		},
		body: DPE.object({
			title: DPE.string(),
			content: DPE.string(),
		}),
	})
	.handler(
		ResponseContract.noContent("post.created"),
		async({ userId, body }, { response }) => {
			await createPost(userId, body);

			return response("post.created");
		},
	);

type Routes = (
	| {
		method: "GET";
		path: "/users/{userId}";
		params: {
			userId: number;
		};
		responses: {
			code: "422";
			information: "extract-error";
			body?: undefined;
		} | {
			code: "200";
			information: "users.find";
			body: {
				id: number;
				name: string;
				age: number;
			};
		};
	}
);

const httpClient = createHttpClient<Routes>({
	baseUrl: "http://example.com/api",
});

const response = await httpClient
	.get("/users/{userId}", { params: { userId: "1" } })
	.whenInformation("users.find", ({ body }) => {
		void body;
		//   ^?
	})
	.iWantInformation("users.find");

if (E.isRight(response)) {
	void response;
}

if (E.isLeft(response)) {
	void response;
}
