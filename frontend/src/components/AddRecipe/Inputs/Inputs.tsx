import {Input, Textarea} from '@mantine/core';
import { useState } from 'react';

export default function Inputs() {
    const [value, setValue] = useState('');

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <div>
            <Input
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                placeholder="Title" />
            <Textarea
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                placeholder="Input Description"
            />
            <Input
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                placeholder="Ingredients" />
            <Input
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                placeholder="Step by Step Instrucitons" />
        </div>
    )
}