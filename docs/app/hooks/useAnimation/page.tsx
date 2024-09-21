'use client';

import React, { useMemo } from 'react';

import { CiCircleInfo } from 'react-icons/ci';

import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Blockquote, Code, Group, Stack, Text, Title } from '@mantine/core';
import { useAnimation } from 'react-minecraft';

import { isTiledExample } from './examples/isTiled';
import { useAnimationExample } from './examples/useAnimation';

import { Content } from '~/docs/components/content';
import { Header } from '~/docs/components/header';
import { ReactIcon } from '~/docs/components/react-icon';

export default function useAnimationPage() {
	const tsxIcn = <ReactIcon size="16" />;

	const mcmeta = useMemo(() => ({}), []);
	const { canvasRef } = useAnimation({ src: '../textures/fire_1.png', mcmeta });

	const ex1 = useMemo(() => useAnimationExample, []);
	const ex2 = useMemo(() => isTiledExample, []);

	const { canvasRef: canvasRefTiledTrue } = useAnimation({ src: '../textures/water_flow.png', mcmeta, isTiled: true });
	const { canvasRef: canvasRefTiledFalse } = useAnimation({ src: '../textures/water_flow.png', mcmeta, isTiled: false });
	
	return (
		<Stack gap={0}>
			<Header 
				title="use-animation"
				description="A hook to animate a texture using the given MCMETA data"
			/>
			<Content>
				<Stack>
					<Text ta="justify">
						You can use the <Code component="span">useAnimation</Code> hook to animate a texture using the given MCMETA data and
						given URL of the image to animate. The hook returns a reference to the canvas element used for the animation and
						determined sprites.
					</Text>

					<Group wrap="nowrap" align="start">
						<CodeHighlightTabs
							w="100%"
							maw="650px"
							code={[
								{ icon: tsxIcn, fileName: 'MyComponent.tsx', code: ex1, language: 'tsx' },
							]}
						/>

						<Stack gap="xs">
							<Stack gap={0} align="center">
								<canvas
									ref={canvasRef}
									style={{
										maxWidth: '150px',
										height: '150px',
										border: '1px solid #333'
									}}
								/>
								<Text c="dimmed">output</Text>
							</Stack>
						</Stack>
					</Group>

					<Blockquote ta="justify" mt="md" icon={<CiCircleInfo size={32} />} radius="md" iconSize={50}>
						Note that undefined values such as <Code component="span">&#123;&#125;</Code> will cause React to re-render the component every time the component is rendered causing
						infinite loops. Make sure to wrap the object in a <Code component="span">useMemo</Code> hook to prevent this when using those values.
					</Blockquote>

					<Text ta="justify">
						You can also pass some additional parameters to the hook such as <Code component="span">isTiled</Code> and <Code component="span">isPaused</Code> to
						customize the animation.
					</Text>

					<Title order={2} mt="lg">isTiled</Title>

					<Text ta="justify">
						The <Code component="span">isTiled</Code> parameter tells the hook to center the image in the canvas. This is used for fluids and other textures when it needs to seamlessly rotates
						(in-game) without cutting off corners or extending beyond the texture's boundaries.
					</Text>

					<Group wrap="nowrap" align="start">
						<CodeHighlightTabs
							w="100%"
							maw="650px"
							code={[
								{ icon: tsxIcn, fileName: 'MyComponent.tsx', code: ex2, language: 'tsx' },
							]}
						/>

						<Stack gap="xs">
							<Stack gap={0} align="center">
								<canvas
									ref={canvasRefTiledTrue}
									style={{
										maxWidth: '150px',
										height: '150px',
										border: '1px solid #333'
									}}
								/>
								<Text c="dimmed">isTiled: true</Text>
							</Stack>

							<Stack gap={0} align="center">
								<canvas
									ref={canvasRefTiledFalse}
									style={{
										maxWidth: '150px',
										height: '150px',
										border: '1px solid #333'
									}}
								/>
								<Text c="dimmed">isTiled: false</Text>
							</Stack>
						</Stack>
					</Group>
				</Stack>
			</Content>
		</Stack>
	);
}