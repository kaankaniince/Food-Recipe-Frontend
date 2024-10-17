// import BaseDemo from "../../components/AddRecipe/Dropzone/DropzoneButon.tsx";
// import Inputs from "../../components/AddRecipe/Inputs/Inputs.tsx";
import AddRecipePage from "../../components/AddRecipe/AddRecipe.tsx";

export default function EditRecipe() {
    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <div>
            {/*<BaseDemo/>*/}
            {/*<Inputs/>*/}
            <AddRecipePage isEdit={true}/>
        </div>
    )
}