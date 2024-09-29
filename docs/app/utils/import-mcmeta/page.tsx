'use client';

import React, { useMemo } from 'react';

import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Code, Stack, Text } from '@mantine/core';
import { TypeScriptIcon } from '@mantinex/dev-icons';

import { importMcmetaFileConfig, importMcmetaFileExample, importMcmetaFileModule } from './examples';

import { Content } from '~/docs/components/content';
import { Header } from '~/docs/components/header';
import { ReactIcon } from '~/docs/components/react-icon';

export default function useAnimationPage() {
	const tsIcn = <TypeScriptIcon size="16" />;
	const tsxIcn = <ReactIcon size="16" />;

	const exampleModule = useMemo(() => importMcmetaFileModule, []);
	const exampleConfig = useMemo(() => importMcmetaFileConfig, []);
	const exampleFinal = useMemo(() => importMcmetaFileExample, []);

	return (
		<Stack gap={0}>
			<Header
				title="Import MCMETA files"
				description="Add file extension support into TypeScript for MCMETA files."
			/>
			<Content>
				<Stack>
					<Text ta="justify">
						You can import MCMETA files into your TypeScript files by adding a custom declaration file to your project.
						To do this, create a new file in your types directory named <Code component="span">png.mcmeta.d.ts</Code> and add the following code:
					</Text>

					<CodeHighlightTabs
						w="100%"
						code={[
							{ icon: tsIcn, fileName: 'png.mcmeta.d.ts', code: exampleModule, language: 'ts' },
						]}
					/>

					<Text ta="justify">
						Do not forget to reference the declaration file in your <Code component="span">tsconfig.json</Code> file:
					</Text>

					<CodeHighlightTabs
						w="100%"
						code={[
							{ fileName: 'tsconfig.json', code: exampleConfig, language: 'json' },
						]}
					/>

					<Text ta="justify">
						Now you can import MCMETA files into your TypeScript files like any other module:
					</Text>

					<CodeHighlightTabs
						w="100%"
						code={[
							{ icon: tsxIcn, fileName: 'MyComponent.tsx', code: exampleFinal, language: 'tsx' },
						]}
					/>
				</Stack>
			</Content>
		</Stack>
	);
}