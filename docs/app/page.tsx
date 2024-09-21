'use client';

import { useRouter } from 'next/navigation';

import { useMemo } from 'react';

import { IoChevronForward } from 'react-icons/io5';

import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Title, Text, Code, Stack, Group, Button } from '@mantine/core';
import { NpmIcon, YarnIcon } from '@mantinex/dev-icons';
import { Texture } from 'react-minecraft';

import { Content } from '~/docs/components/content';
import { PnpmIcon } from '~/docs/components/pnpm-icon';
import { ReactIcon } from '~/docs/components/react-icon';
import mcmeta from '~/docs/public/textures/fire_1.png.mcmeta' ;
import { sanitizeJSON } from '~/docs/utils/json';

export default function GettingStartedPage() {
	const npmIcn = <NpmIcon size="16" />;
	const yrnIcn = <YarnIcon size="16" />;
	const pnpIcn = <PnpmIcon size="16" />;
	const tsxIcn = <ReactIcon size="16" />;

	const router = useRouter();

	const ex = useMemo(() => `
import { Texture, type Animation } from 'react-minecraft';

export function App() {
	const mcmeta: Animation = ${sanitizeJSON(mcmeta)};

	return (
		<Texture 
			src="./public/textures/fire_1.png"
			size="150px"
			animation={{mcmeta}}
		/>
	);
}
`, []);

	return (
		<Content>
			<Stack>
				<Title order={1} c="white">Getting Started</Title>
				<Text fs="calc(.9375rem * var(--mantine-scale))">
					The easiest way to get started is to install <Code component="span">react-minecraft</Code> using your favorite package manager:
				</Text>

				<CodeHighlightTabs 
					code={[
						{ icon: npmIcn, fileName: 'npm', code: 'npm install react-minecraft', language: 'bash' },
						{ icon: yrnIcn, fileName: 'yarn', code: 'yarn add react-minecraft', language: 'bash' },
						{ icon: pnpIcn, fileName: 'pnpm', code: 'pnpm add react-minecraft', language: 'bash' },
					]} 
				/>

				<Text fs="calc(.9375rem * var(--mantine-scale))">
					After that you can start using <Code component="span">react-minecraft</Code> components/hooks in your project:
				</Text>

				<CodeHighlightTabs 
					code={[
						{ icon: tsxIcn, fileName: 'App.tsx', code: ex, language: 'tsx' },
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
							animation={{mcmeta}}
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