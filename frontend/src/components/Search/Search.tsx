import {Input, Select} from "@mantine/core";
import {FaSearch} from "react-icons/fa";
import classes from './Search.module.css';

export default function Search() {
    return (
        <div className={classes.container}>
            <Input
                w={"100%"}
                maw={1330}
                   className={classes.inputContainer}
                   radius="xl"
                   inputSize="100"
                   placeholder="Search"
                   leftSection={<FaSearch radius="xl" style={{marginLeft:"20px"}} size={16}/>}
            />
            <Select
                className={classes.selectContainer}
                radius="xl"
                checkIconPosition="right"
                placeholder="Sort Of"
                data={["Newest", "Oldest", "Top Rating"]}
                defaultValue="Newest"
            />

        </div>
    );
}
