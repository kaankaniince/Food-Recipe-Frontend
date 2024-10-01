import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Header from "./Header/Header.tsx";
import Navbar from "./Navbar/Navbar.tsx";
import {Outlet} from "react-router-dom"
import Footer from "./Footer/Footer.tsx";

function BasicAppShell() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'md' , collapsed: { desktop: true, mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%"  justify="space-between" style={{ flex: 1 }}>
                    <Header />
                    <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
                </Group>
            </AppShell.Header>

            <AppShell.Navbar  >
                <Navbar/>
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet/>
            </AppShell.Main>


            <Footer/>
        </AppShell>
    );
}

export default BasicAppShell;
