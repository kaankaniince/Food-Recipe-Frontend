import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Header from "./Header/Header.tsx";
import Navbar from "./Navbar/Navbar.tsx";

function MobileNavbar() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between" style={{ flex: 1 }}>
                    <Header/>
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                </Group>
            </AppShell.Header>

            <AppShell.Navbar py="md" px={4}>
                <Navbar/>
            </AppShell.Navbar>

            <AppShell.Main>
            </AppShell.Main>
        </AppShell>
    );
}

export default MobileNavbar;
