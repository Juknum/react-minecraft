'use client';

import { Title, Text, Code, Stack, Group, Button } from "@mantine/core";
import { Content } from "../components/content";
import { CodeHighlightTabs } from "@mantine/code-highlight";

import { NpmIcon, YarnIcon } from '@mantinex/dev-icons';
import { PnpmIcon } from "../components/pnpm-icon";
import { sanitizeCodeBlock, sanitizeJSON } from "../utils/sanitize";
import { ReactIcon } from "../components/react-icon";

import { Texture } from 'react-minecraft';

import { IoChevronForward } from "react-icons/io5";
import { useRouter } from "next/navigation";

import mcmeta from '../public/textures/fire_1.png.mcmeta' ;

const basicExample = `
import { Texture, type Animation } from 'react-minecraft';

export function App() {
	const mcmeta: Animation = ${sanitizeJSON(mcmeta)};

	return (
		<Texture 
			src="./public/textures/fire_1.png"
			size="150px"
			animation={{
				mcmeta
			}}
		/>
	);
}
`;

export default function GettingStartedPage() {
	const npmIcn = <NpmIcon size="16" />;
	const yrnIcn = <YarnIcon size="16" />;
	const pnpIcn = <PnpmIcon size="16" />;
	const tsxIcn = <ReactIcon size="16" />;

	const router = useRouter();

	return (
		<Content>
			<Stack>
				<Title order={1} c="white">Getting Started</Title>
				<Text fs="calc(.9375rem * var(--mantine-scale))">
					The easiest way to get started is to install <Code component="span">react-minecraft</Code> using your favorite package manager:
				</Text>

				<CodeHighlightTabs 
					code={[
						{ icon: npmIcn, fileName: 'npm', code: `npm install react-minecraft`, language: 'bash' },
						{ icon: yrnIcn, fileName: 'yarn', code: 'yarn add react-minecraft', language: 'bash' },
						{ icon: pnpIcn, fileName: 'pnpm', code: 'pnpm add react-minecraft', language: "bash" },
					]} 
				/>

				<Text fs="calc(.9375rem * var(--mantine-scale))">
					After that you can start using <Code component="span">react-minecraft</Code> components/hooks in your project:
				</Text>

				<CodeHighlightTabs 
					code={[
						{ icon: tsxIcn, fileName: 'App.tsx', code: sanitizeCodeBlock(basicExample), language: 'tsx' },
					]} 
				/>

				<Text>
					Which will render the following:
				</Text>

				<Group w="100%" justify="center">
					<Stack align="center" gap="xs" w="100%">
						<Texture
							src="./textures/fire_1.png"
							size="150px"
							animation={{ mcmeta }}
						/>
						<Text c="dimmed">fire_1</Text>
					</Stack>

				</Group>

				<Button 
					variant="light" 
					ml="auto" 
					mr="auto" 
					mt="xl"
					justify="space-between"
					rightSection={<IoChevronForward />}
					onClick={() => router.push('/components/texture')}
				>
					Go to Texture Component
				</Button>

			</Stack>
		</Content>
	);
}