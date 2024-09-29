'use client';

import { usePathname, useRouter } from 'next/navigation';

import { IoChevronForward } from 'react-icons/io5';
import { TbFishHook, TbComponents } from 'react-icons/tb';

import { Button, Text, NavLink, Stack, Group, Indicator } from '@mantine/core';

export function Navbar() {
	const router = useRouter();
	const pathname = usePathname();
	
	const metadata = [
		{
			icon: <TbComponents />,
			title: 'Components',
			href: '/components',
			links: [
				{ href: '/block-model', title: 'BlockModel', monospaced: true },
				{ href: '/texture', title: 'Texture', monospaced: true },
			]
		},
		{
			icon: <TbFishHook />,
			title: 'Hooks',
			href: '/hooks',
			links: [
				{ href: '/useAnimation', title: 'useAnimation', monospaced: true },
			]
		},
	];

	return (
		<Stack p="xs" gap="xl">
			<Stack gap="xs">
				<Button 
					justify="space-between" 
					rightSection={<IoChevronForward />}
					onClick={() => router.push('/')}
					variant={pathname === '/' ? 'light' : 'outline'}
					h="40.8"
				>
					Getting Started
				</Button>

				{metadata.map(({ icon, href: topHref, title, links }, index) => (
					<NavLink
						leftSection={icon}
						key={index}
						label={title}
						active={pathname.startsWith(topHref)}
						style={{ borderRadius: '5px' }}
						defaultOpened={pathname.startsWith(topHref)}
					>
						<Stack 
							gap={4} 
							mr="xs"
							pl="md"
							style={{
								borderLeft: '1px solid #fff3',
							}}
						>
							{links.map(({ href, title, monospaced }, index) => (
								<Group
									key={index}
									justify="space-between"
									align="center"
									onClick={() => router.push(topHref + href)}
									className="code-link"
								>
									<Text
										key={index}
										fz="sm"
										ff={monospaced ? 'monospace' : 'inherit'}
									>
										{title}
									</Text>

									{pathname === topHref + href && (
										<Indicator color="teal" />
									)}
								</Group>
							))}
						</Stack>
					</NavLink>
				))}
			</Stack>
		</Stack>
	);
}