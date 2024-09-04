'use client';

import { Button, Code, NavLink, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IoChevronForward } from "react-icons/io5";

export function Navbar() {
	const router = useRouter();
	
	const metadata = [
		{
			title: 'Components',
			href: '/components',
			links: [
				{ href: '/block-model', title: 'BlockModel' },
				{ href: '/texture', title: 'Texture' },
			]
		},
		{
			title: 'Hooks',
			href: '/hooks',
			links: [
				{ href: '/useAnimation', title: 'useAnimation' },
			]
		},
	]

	return (
		<Stack p="xs" gap="xl">
			<Stack gap="xs">
				<Button 
					justify="space-between" 
					rightSection={<IoChevronForward />}
					onClick={() => router.push('/')}	
				>
					Getting Started
				</Button>
				<Button disabled></Button>
				<Button disabled></Button>
				<Button disabled></Button>
				<Button disabled></Button>
			</Stack>

			<Stack gap={0}>
				{metadata.map(({ href: topHref, title, links }, index) => (
					<NavLink
						key={index}
						label={title}
						className={'nav-link'}
					>
						<Stack gap={2} mr="xs">
							{links.map(({ href, title }, index) => (
								<Code
									className="code-link"
									key={index}
									onClick={() => router.push(topHref + href)}
								>
									{title}
								</Code>
							))}
						</Stack>
					</NavLink>
				))}
			</Stack>
		</Stack>
	);
}