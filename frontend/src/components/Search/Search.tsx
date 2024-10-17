import { Input, Select } from "@mantine/core";
import { FaSearch } from "react-icons/fa";
import classes from './Search.module.css';

interface SearchProps {
    setSearchTerm: (value: string) => void;
    setSortOrder: (value: string) => void; // Add prop for setting sorting order
}

export default function Search({ setSearchTerm, setSortOrder }: SearchProps) {
    return (
        <div className={classes.container}>
            <Input
                w={"100%"}
                maw={1330}
                className={classes.inputContainer}
                radius="xl"
                inputSize="100"
                placeholder="Search"
                onChange={(event) => setSearchTerm(event.currentTarget.value)} // Update the search term
                leftSection={<FaSearch radius="xl" style={{ marginLeft: "20px" }} size={16} />}
            />
            <Select
                className={classes.selectContainer}
                radius="xl"
                checkIconPosition="right"
                placeholder="Sort By"
                data={["Newest", "Oldest"]} // Removed "Top Rating"
                defaultValue="Newest"
                onChange={setSortOrder} // Update sorting order
            />
        </div>
    );
}
