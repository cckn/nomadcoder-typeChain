import { head, map } from "lodash"

const arr = [null, "dasd", undefined, 123, true]
const arr2 = []

const res = map(arr, (item: string) => {
	return item + "asd"
})

console.log(head(arr))
console.log(head(arr2))

console.log(res)
