import { A, S } from "@duplojs/utils";

interface Book {
	type: "book";
	title: "superBook";
	pageQuantity: number;
}

interface Care {
	type: "car";
	model: string;
	wheel: number;
}

interface Computer {
	type: "computer";
	screens: number;
}

const product: (Book | Care | Computer)[] = [];

const result = A.group(
	product,
	(product, { output }) => product.type === "book"
		? output(product.type, product)
		: output("other", product),
);

const superTuple: [string, string, ...string[]] = ["one", "two", "three", "four"];

const result2 = A.mapTuple(superTuple, S.length);

const array = [12, null, 20, 56, 19];

const result3 = A.reduce(
	array,
	0,
	({ lastValue, element, next, exit }) => element === null
		? exit(null)
		: next(lastValue + element),
);
