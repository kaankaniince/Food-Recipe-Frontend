import {Timeline, Text, Box} from '@mantine/core';

interface TimelineComponentProps {
    instructions: string[];
}

export default function TimelineComponent({instructions}: TimelineComponentProps) {
    return (
        <Timeline active={1} bulletSize={24} lineWidth={2}>
            {/* Map through the instructions array and display each instruction in a timeline item */}
            {instructions.map((instruction, index) => (
                <Timeline.Item
                    key={index}
                    bullet={
                        <Box>
                            <Text
                                size="xs">
                                {index + 1}
                            </Text>
                        </Box>
                    }
                    title={`Step ${index + 1}`}
                >
                    <Text c="dimmed" size="sm">
                        {instruction}
                    </Text>
                </Timeline.Item>
            ))}
        </Timeline>
    );
}
