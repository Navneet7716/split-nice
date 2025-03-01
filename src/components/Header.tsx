import { Burger, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderSearch.module.css';

const links = [
    { link: '/about', label: 'About' },
    { link: '/pricing', label: 'Pricing' },
];

export function HeaderSearch() {
    const [opened, { toggle }] = useDisclosure(false);

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            onClick={(event) => event.preventDefault()}
        >
            {link.label}
        </a>
    ));

    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                <Group>
                    <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
                    <Text fw={"bolder"} size='lg'>Split-Nice</Text>
                </Group>

                <Group>
                    <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
                        {items}
                    </Group>
                </Group>
            </div>
        </header>
    );
}