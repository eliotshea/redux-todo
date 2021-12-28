import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "../app/actions";

export function Header() {
    const project = useSelector((state) => state.project);
    const dispatch = useDispatch();

    function showModal(event) {
        document.getElementById("outer-add-modal").style.display = "flex";
    }

    function dispatchTitle(event) {
        dispatch(updateProject({
            ...project,
            name: event.target.value
        }))
    }

    return (
        <div id="header">
            <input type="text" value={project.name} onChange={dispatchTitle}></input>
            <button onClick={showModal}>Add Items</button>
        </div>
    )
}