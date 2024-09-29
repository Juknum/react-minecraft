import type { ReactNode } from 'react';

interface props {
	children: ReactNode;
	tableOfContent?: ReactNode;
}

export function Content({ children, tableOfContent }: props) {
	return (
		<div
			style={{
				zIndex: 1,
				display: 'flex',
				position: 'relative',
				justifyContent: 'space-between',
				paddingLeft: 'calc(var(--mantine-spacing-xl) * 2)',
				paddingRight: 'calc(var(--mantine-spacing-xl) * 2)',
				backgroundColor: 'var(--mantine-color-body)',
			}}
		>
			<div
				style={{
					marginTop: 'var(--mantine-spacing-xl)',
					width: 'calc(100% - var(--docs-table-of-contents-width))',
					maxWidth: 'var(--docs-content-width)',
					marginLeft: 'auto',
					marginRight: 'auto',
					marginBottom: 'calc(var(--mantine-spacing-xl) * 4)',
				}}
			>
				{children}
			</div>
			<div 
				style={{
					width: 'var(--docs-table-of-contents-width)',
				}}
			>
				{tableOfContent}
			</div>
		</div>
	);
}