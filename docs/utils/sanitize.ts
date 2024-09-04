export function sanitizeCodeBlock(str: string) {
	return str.replaceAll('\t', '  ');
}

export function sanitizeJSON(json: unknown) {
	const str = JSON.stringify(json, null, '\t\t');
	return str.substring(0, str.length-1) + '\t}';
}