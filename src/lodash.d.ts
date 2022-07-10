declare module "lodash" {
	function head<T>(array: T[]): T | undefined
	function hasIn(object: Object, key: string): boolean
	function isBoolean(value: Object): boolean
	function toString(value: Object): string
	function split(string: string, separator: RegExp | string, limit: number): string[]
	function hasPath(object: Object, path: string | string[]): boolean
	function filter<T>(array: T[], predicate: Function): T[]
	function every<T>(array: T[], predicate: Function): boolean
	function map<T, U>(array: T[], predicate: Function): U[]
}
