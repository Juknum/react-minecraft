
import { createTheme, MantineProvider } from '@mantine/core';

import { Container } from '../components/container';

import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';

import './global.css';

export const metadata = {
	title: 'react-minecraft documentation',
};

export interface props {
	children: React.ReactNode
}

const theme = createTheme({
	cursorType: 'pointer',
});

export default function RootLayout({ children }: props) {

	return (
		<html lang="en">
			<head></head>
			<body>
				<MantineProvider theme={theme}>
					<Container>
						{children}
					</Container>
				</MantineProvider>
			</body>
		</html>
	);
}
