import { useDispatch, useSelector } from "react-redux";
import { deleteItem, updateItem } from "../app/actions";
import { ItemStatuses } from "../app/reducers/itemsReducer";
import { SelectPerson } from "./SelectPerson";

export function Item (props) {
    const item = useSelector((state) => state.items.find((x) => x.id === props.id));
    const dispatch = useDispatch();
    
    let { id, name, estimatedHours, currentHours, assignedTo } = item;

    function update(event) {
        if (!event.target.value) {
            event.target.value = 0;
        }
        dispatch(updateItem(id, {
            ...item,
            currentHours: parseInt(event.target.value)
        }))
    }

    function handleDragStart(event) {
        var img = new Image();
        event.dataTransfer.setDragImage(img, 0, 0)
        event.target.style.position = "absolute";
        event.target.style.left = event.pageX + "px";
        event.target.style.top = event.pageY + "px";
    }

    function handleDrag(event) {
        event.target.style.left = event.pageX + "px";
        event.target.style.top = event.pageY + "px";
    }

    function handleDragEnd(event) {
        event.target.style.removeProperty("position");
        event.target.style.removeProperty("left");
        event.target.style.removeProperty("top");

        var todo = document.getElementById("todo");
        var inProgress = document.getElementById("in-progress");
        var done = document.getElementById("done");

        if(checkCollision(todo.getBoundingClientRect(), event.pageX, event.pageY)) {
            
            dispatch(updateItem(id, {
                ...item,
                status: ItemStatuses.Todo
            }))
        }

        if(checkCollision(inProgress.getBoundingClientRect(), event.pageX, event.pageY)) {
            dispatch(updateItem(id, {
                ...item,
                status: ItemStatuses.InProgress
            }))
        }

        if(checkCollision(done.getBoundingClientRect(), event.pageX, event.pageY)) {
            dispatch(updateItem(id, {
                ...item,
                status: ItemStatuses.Done
            }))
        }
    }

    function checkCollision(rect, x, y) {
        if(x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
            return true;
        }
        return false;
    }

    return (
        <li className="item" draggable onDragStart={handleDragStart} onTouchStart={handleDragStart} onDrag={handleDrag} onTouchMove={handleDrag} onDragEnd={handleDragEnd} onTouchEnd={handleDragEnd}>
            <div className="item-row">
                <div className="item-hours-col">
                    <div className="item-name">
                        {name}
                    </div>
                    <div>Estimate: {estimatedHours}</div>
                    <div className="item-current-hours">
                        <label htmlFor="current-hours">Current:</label>
                        <input id="current-hours" value={currentHours} onChange={update}></input>
                    </div>
                    
                </div>
                <SelectPerson id={id}></SelectPerson>
                <button onClick={() => {dispatch(deleteItem(id))}}>✕</button>
            </div>
        </li>
    )
}