'use client';

import React, { useMemo, useState } from 'react';

import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Code, Group, Slider, Stack, Text, Title } from '@mantine/core';
import { Texture } from 'react-minecraft';

import { textureAnimationExample, textureExample, textureSizeExample } from './examples';

import type { Animation } from 'react-minecraft';

import { Content } from '~/docs/components/content';
import { Header } from '~/docs/components/header';
import { ReactIcon } from '~/docs/components/react-icon';
import mcmeta from '~/docs/public/textures/fire_1.png.mcmeta';

export default function useAnimationPage() {
	const tsxIcn = <ReactIcon size="16" />;

	const [size, setSize] = useState(140);

	const exampleSrcCode = useMemo(() => textureExample, []);
	const exampleSizeCode = useMemo(() => textureSizeExample.replaceAll('SIZE', size.toString()), [size]);
	const exampleAnimCode = useMemo(() => textureAnimationExample, []);

	return (
		<Stack gap={0}>
			<Header
				title="Texture"
				description="A component that allows you to display a texture from a given URL."
			/>
			<Content>
				<Stack>
					<Title order={2} mt="lg">src</Title>
					
					<Text ta="justify">
						You can specify the URL of the texture to display using the <Code component="span">src</Code> prop like any other&nbsp;
						<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img">img</a> element.
					</Text>

					<Group wrap="nowrap" align="start">
						<CodeHighlightTabs
							w="100%"
							maw="650px"
							code={[
								{ icon: tsxIcn, fileName: 'MyComponent.tsx', code: exampleSrcCode, language: 'tsx' },
							]}
						/>

						<Stack gap="xs">
							<Stack gap={0} align="center">
								<Texture 
									src="https://api.faithfulpack.net/v2/textures/304/url/faithful_32x/latest"
									size={150}
									className="output-framed"
								/>
								<Text c="dimmed">output</Text>
							</Stack>
						</Stack>
					</Group>

					<Title order={2} mt="lg">size</Title>

					<Text ta="justify">
						You can specify the size of the texture using the <Code component="span">size</Code> prop, which takes any valid CSS&nbsp;
						<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/width">width</a>/
						<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/height">height</a> value or a number&nbsp;
						representing the size in pixels.
					</Text>

					<Stack w="100%" align="center">
						<CodeHighlightTabs
							w="100%"
							code={[
								{ icon: tsxIcn, fileName: 'MyComponent.tsx', code: exampleSizeCode, language: 'tsx' },
							]}
						/>
						<Slider 
							w="100%"
							color="blue" 
							min={1} 
							max={512} 
							value={size} 
							onChange={setSize} 
						/>
						<Texture 
							src="../textures/diamond_ore.png"
							size={size}
						/>
					</Stack>

					<Title order={2} mt="lg">animation</Title>

					<Text ta="justify">
						You can specify the animation details of the texture using the <Code component="span">animation</Code> prop, which takes the
						same options as the <a href="/hooks/useAnimation"><Code component="span">useAnimation</Code></a> hook.
					</Text>

					<Group wrap="nowrap" align="start">
						<CodeHighlightTabs
							w="100%"
							maw="650px"
							code={[
								{ icon: tsxIcn, fileName: 'MyComponent.tsx', code: exampleAnimCode, language: 'tsx' },
							]}
						/>

						<Stack gap="xs">
							<Stack gap={0} align="center">
								<Texture
									src="../textures/fire_1.png"
									animation={{
										mcmeta: {
											animation: mcmeta.animation as Animation,
										}
									}}
									size="150px"
									className="output-framed"
								/>
								<Text c="dimmed">output</Text>
							</Stack>
						</Stack>
					</Group>
				</Stack>
			</Content>
		</Stack>
	);
}