'use client';

import { Stack, Group, Card, Title, ScrollArea, Button } from "@mantine/core";
import { Navbar } from "./navbar";
import { type ReactNode } from "react";
import { GithubIcon } from "@mantinex/dev-icons";
import { useRouter } from "next/navigation";

interface props {
	children: ReactNode;
}

export function Container({ children }: props) {
	const headHeight = 57;
	const router = useRouter();

	return (
		<Stack gap={0}>
			<Card
				p="xs"
				pl="md"
				bg="var(--mantine-color-body)"
				style={{
					borderBottom: '1px solid var(--mantine-color-dark-filled)',
				}}
			>
				<Group
					justify="space-between"
				>
					<Title order={4} c="white">React Minecraft</Title>
					<Button p={8} variant="default" onClick={() => router.push('https://github.com/Juknum/react-minecraft')}><GithubIcon size="18" /></Button>
				</Group>
			</Card>
			<Group
				w="100%"
				h="100%"
				wrap="nowrap"
				align="start"
				gap={1}
			>
				<Stack
					mih={`calc(100vh - ${headHeight}px)`}
					w={300}
					gap={0}
					bg="dark"
				>
					<ScrollArea h={`calc(100vh - ${headHeight}px)`}>
						<Navbar />					
					</ScrollArea>
				</Stack>
				<Stack
					w="100%"
					mih={`calc(100vh - ${headHeight}px)`}
				>
					<ScrollArea h={`calc(100vh - ${headHeight}px)`}>
						{children}
					</ScrollArea>
				</Stack>
			</Group>
		</Stack>
	)
}