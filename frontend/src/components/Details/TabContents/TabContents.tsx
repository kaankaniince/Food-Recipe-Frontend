import cx from 'clsx';
import { Box, Text, Group, rem } from '@mantine/core';
import { IconListSearch } from '@tabler/icons-react';
import classes from './TabContents.module.css';

interface TabContentsProps {
    ingredients: string[];
}

export default function TabContents({ ingredients }: TabContentsProps) {
    // Map through the ingredients and create a list of items
    const items = ingredients.map((ingredient, index) => (
        <Box<'div'>
            key={index}
            className={cx(classes.link)}
        >
            {ingredient}
        </Box>
    ));

    return (
        <div>
            <Group mb="md">
                <IconListSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                <Text>Ingredients List</Text>
            </Group>

            {/* Use Stack component to display items vertically */}
            <div>
                {items}
            </div>
        </div>
    );
}
