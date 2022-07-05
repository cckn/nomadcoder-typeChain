/*----------------------------------------------------------------------------
 * LocalStorageAPI
 *---------------------------------------------------------------------------*/

abstract class LocalStorageAbstractClass<T> {
	abstract setItem(key: string, value: T): void
	abstract getItem(key: string): T
	abstract clearItem(key: string): void
	abstract clear(): void
}

class LocalStorageAPI<T> extends LocalStorageAbstractClass<T> {
	private storage: Record<string, T>
	constructor() {
		super()
		this.storage = {}
	}

	setItem(key: string, value: T): void {
		this.storage[key] = value
	}

	getItem(key: string): T {
		return this.storage[key]
	}

	clearItem(key: string): void {
		delete this.storage[key]
	}

	clear(): void {
		this.storage = {}
	}
}

/*----------------------------------------------------------------------------
 * GeolocationAPI
 *---------------------------------------------------------------------------*/

type SuccessFn = (position: GeolocationPosition) => void
type ErrorFn = (error: GeolocationPositionError) => void
interface Options {
	enableHighAccuracy: boolean
	timeout: number
	maximumAge: number
}

interface GeolocationInterface {
	getCurrentPosition(successFn: SuccessFn): void
	getCurrentPosition(successFn: SuccessFn, errorFn: ErrorFn): void
	getCurrentPosition(successFn: SuccessFn, errorFn: ErrorFn, options: Options): void
	watchPosition(successFn: SuccessFn): number
	watchPosition(successFn: SuccessFn, errorFn: ErrorFn): number
	watchPosition(successFn: SuccessFn, errorFn: ErrorFn, options: Options): number
	clearWatch(watchId: number): void
}

class GeolocationAPI implements GeolocationInterface {
	geolocation: Geolocation

	constructor() {
		this.geolocation = new Geolocation()
	}

	getCurrentPosition(successFn: SuccessFn): void
	getCurrentPosition(successFn: SuccessFn, errorFn: ErrorFn): void
	getCurrentPosition(successFn: SuccessFn, errorFn: ErrorFn, options: Options): void
	getCurrentPosition(successFn: SuccessFn, errorFn?: ErrorFn, options?: Options): void {
		this.geolocation.getCurrentPosition(successFn, errorFn, options)
	}

	watchPosition(successFn: SuccessFn): number
	watchPosition(successFn: SuccessFn, errorFn: ErrorFn): number
	watchPosition(successFn: SuccessFn, errorFn: ErrorFn, options: Options): number
	watchPosition(successFn: SuccessFn, errorFn?: ErrorFn, options?: Options): number {
		const watchId = this.geolocation.watchPosition(successFn, errorFn, options)
		return watchId
	}

	clearWatch(watchId: number): void {
		this.clearWatch(watchId)
	}
}

const geolocation = new GeolocationAPI()
geolocation.getCurrentPosition((position: GeolocationPosition) => {
	console.log(position)
})
