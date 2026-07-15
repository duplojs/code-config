import { type ExpectType, P, pipe } from "@duplojs/utils";

type Event = (
	| {
		type: "created";
		payload: {
			id: number;
			by: string;
		};
	}
	| {
		type: "deleted";
		id: number;
	}
	| {
		type: "error";
		message: string;
	}
);

const input = null as unknown as Event;

const result = pipe(
	input,
	P.match(
		{ type: "created" },
		({ payload }) => {
			type check = ExpectType<
				typeof payload,
				{
					id: number;
					by: string;
				},
				"strict"
			>;

			return "1";
		},
	),
	P.match(
		{ type: "deleted" },
		({ id }) => {
			type check = ExpectType<
				typeof id,
				number,
				"strict"
			>;
			return "2";
		},
	),
	P.match(
		{ type: "error" },
		({ message }) => {
			type check = ExpectType<
				typeof message,
				string,
				"strict"
			>;
			return "3";
		},
	),
	P.exhaustive,
);
