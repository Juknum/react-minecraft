
export class ReactMinecraftError {
	static error(message: string): void {
		throw new Error(`[react-minecraft] ${message}`);
	}
}