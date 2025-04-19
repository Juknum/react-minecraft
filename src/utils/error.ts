
/**
 * Throws an error with a prefixed message.
 * @param message the error message
 */
export function error(message: string): void {
	throw new Error(`[react-minecraft] ${message}`);
}