import { Stack, Title, Text } from "@mantine/core";

export function Header({ title, description }: props) {
	return (
		<Stack bg="dark" w="100%" h={150}>
			<Stack
				pt="xl" 
				maw="calc(67.625rem * var(--mantine-scale))"
				ml="260"
				gap="xs"
			>
				<Title order={1} c="white">{title}</Title>
				<Text c="dimmed">{description}</Text>
			</Stack>
		</Stack>
	);
}