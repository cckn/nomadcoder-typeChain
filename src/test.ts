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

interface GeolocationPosition {
	coords: {
		latitude: number
		longitude: number
		altitude: number
		accuracy: number
		altitudeAccuracy: number
		heading: number
		speed: number
	}
	timestamp: number
}

interface GeolocationPositionError {
	code: number
	message: string
}

interface GeolocationPositionOptions {
	enableHighAccuracy: boolean
	timeout: number
	maximumAge: number
}

type SuccessFn = (position: GeolocationPosition) => void
type ErrorFn = (error: GeolocationPositionError) => void
type WatchId = number

interface GeolocationAPI {
	getCurrentPosition(successFn: SuccessFn): void
	getCurrentPosition(successFn: SuccessFn, errorFn: ErrorFn): void
	getCurrentPosition(successFn: SuccessFn, errorFn: ErrorFn, options: GeolocationPositionOptions): void

	watchPosition(successFn: SuccessFn): WatchId
	watchPosition(successFn: SuccessFn, errorFn: ErrorFn): WatchId
	watchPosition(successFn: SuccessFn, errorFn: ErrorFn, options: GeolocationPositionOptions): WatchId

	clearWatch(watchId: WatchId): void
}

class GeolocationAPI implements GeolocationAPI {
	private geolocationPosition: GeolocationPosition = {
		coords: {
			latitude: 0,
			longitude: 0,
			altitude: 0,
			accuracy: 0,
			altitudeAccuracy: 0,
			heading: 0,
			speed: 0,
		},
		timestamp: 0,
	}

	private geolocationPositionError: GeolocationPositionError = {
		code: 0,
		message: "",
	}

	private watchIds: Record<WatchId, { successFn: SuccessFn; errorFn: ErrorFn; options: GeolocationPositionOptions }> =
		{}

	private prevWatchId = 0

	getCurrentPosition(successFn: SuccessFn): void
	getCurrentPosition(successFn: SuccessFn, errorFn: ErrorFn): void
	getCurrentPosition(successFn: SuccessFn, errorFn: ErrorFn, options: GeolocationPositionOptions): void
	getCurrentPosition(successFn: SuccessFn, errorFn?: ErrorFn, options?: GeolocationPositionOptions): void {
		successFn(this.geolocationPosition)

		if (errorFn) {
			errorFn(this.geolocationPositionError)
		}

		if (options) {
			if (options.enableHighAccuracy) {
				console.log("enableHighAccuracy")
			}
			if (options.timeout) {
				console.log("timeout")
			}
			if (options.maximumAge) {
				console.log("maximumAge")
			}
		}
	}

	watchPosition(successFn: SuccessFn): WatchId
	watchPosition(successFn: SuccessFn, errorFn: ErrorFn): WatchId
	watchPosition(successFn: SuccessFn, errorFn: ErrorFn, options: GeolocationPositionOptions): WatchId
	watchPosition(successFn: SuccessFn, errorFn?: ErrorFn, options?: GeolocationPositionOptions): WatchId {
		const watchId = this.prevWatchId++
		this.watchIds[watchId] = {
			successFn,
			errorFn,
			options,
		}
		return watchId
	}

	clearWatch(watchId: WatchId): void {
		delete this.watchIds[watchId]
	}
}
