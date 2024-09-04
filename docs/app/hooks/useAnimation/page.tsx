'use client';

import React, { useMemo } from 'react';
import { Blockquote, Code, Group, Stack, Text, Title } from '@mantine/core';
import { Header } from '../../../components/header';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { ReactIcon } from '../../../components/react-icon';
import { sanitizeCodeBlock, sanitizeJSON } from '../../../utils/sanitize';
import { Content } from '../../../components/content';

import mcmeta from '../../../public/textures/fire_1.png.mcmeta';
import { useAnimation } from '../../../../src/hooks/useAnimation';
import { CiCircleInfo } from 'react-icons/ci';

const useAnimationExample = `
import { useAnimation } from 'react-minecraft';

export function MyComponent() {
	const mcmeta = ${sanitizeJSON(mcmeta)};
	const { canvasRef, sprites } = useAnimation({ 
		src: './textures/fire_1.png', 
		mcmeta 
	});

	return (
		<canvas ref={canvasRef} />
	);
}`;

const isTiledExample = `
import { useAnimation } from 'react-minecraft';

export function MyComponent() {
	const mcmeta = ${sanitizeJSON(mcmeta)};

	const { canvasRef } = useAnimation({ 
		src: './textures/water_flow.png', 
		mcmeta,
		isTiled: true,
	});

	const { canvasRef: canvasRef2 } = useAnimation({
		src: './textures/water_flow.png',
		mcmeta,
		isTiled: false,
	});

	return (
		<>
			<canvas ref={canvasRef} />
			<canvas ref={canvasRef2} />
		</>
	);
}`;

export default function useAnimationPage() {
	const tsxIcn = <ReactIcon size="16" />;
	
	const mcmeta = useMemo(() => ({}), []);
	const { canvasRef, sprites } = useAnimation({ src: '../textures/fire_1.png', mcmeta });

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

					<CodeHighlightTabs
						code={[
							{ icon: tsxIcn, fileName: 'MyComponent.tsx', code: sanitizeCodeBlock(useAnimationExample), language: 'tsx' },
						]}
					/>

					<Blockquote ta="justify" mt="md" icon={<CiCircleInfo size={32} />} radius="md" iconSize={50}>
						Note that undefined values such as <Code component="span">&#123;&#125;</Code> will cause React to re-render the component every time the component is rendered causing
						infinite loops. Make sure to wrap the object in a <Code component="span">useMemo</Code> hook to prevent this when using those values.
					</Blockquote>

					<canvas
						ref={canvasRef}
						style={{
							maxWidth: '150px',
							height: '150px',
							border: '1px solid #333'
						}}
					/>

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
								{ icon: tsxIcn, fileName: 'MyComponent.tsx', code: sanitizeCodeBlock(isTiledExample), language: 'tsx' },
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