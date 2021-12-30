import { useDispatch, useSelector } from "react-redux";
import { deleteItem, moveItem, updateItem } from "../app/actions";
import { throttle } from "throttle-debounce";
import { ItemStatuses } from "../app/reducers/itemsReducer";
import { SelectPerson } from "./SelectPerson";

const throttleAnimation = throttle(250, true, (event) => {

    const items = document.getElementsByClassName("item");
    for(var i = 0; i < items.length; i++) {
        if(checkCollision(items[i].getBoundingClientRect(), event.pageX, event.pageY) && event.target.id !== items[i].id) {
            items[i].style.transform = "translateY(10%)";
        } else {
            items[i].style.removeProperty("transform");
        }
    }
})

function checkCollision(rect, x, y) {
    if(x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
        return true;
    }
    return false;
}

export function Item (props) {
    const item = useSelector((state) => state.items.list.find((x) => x.id === props.id));
    const dispatch = useDispatch();
    
    let { id, name, estimatedHours, currentHours } = item;

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

        throttleAnimation(event);
    }

    function handleDragEnd(event) {
        event.target.style.removeProperty("position");
        event.target.style.removeProperty("left");
        event.target.style.removeProperty("top");

        var todo = document.getElementById("todo");
        var inProgress = document.getElementById("in-progress");
        var done = document.getElementById("done");

        if(checkCollision(todo.getBoundingClientRect(), event.pageX, event.pageY)) {
            dispatch(moveItem(id, {
                ...item,
                status: ItemStatuses.Todo,
                priority: getPriority(todo, event)
            }))
        }

        if(checkCollision(inProgress.getBoundingClientRect(), event.pageX, event.pageY)) {
            dispatch(moveItem(id, {
                ...item,
                status: ItemStatuses.InProgress,
                priority: getPriority(inProgress, event)
            }))
        }

        if(checkCollision(done.getBoundingClientRect(), event.pageX, event.pageY)) {
            dispatch(moveItem(id, {
                ...item,
                status: ItemStatuses.Done,
                priority: getPriority(done, event)
            }))
        }

        var li = document.getElementsByClassName("item");
        for(var i = 0; i < li.length; i++) {
            li[i].style.removeProperty("transform");
        }
    }

    function getPriority(list, event) {
        for (var i = 0; i < list.children.length; i++) {
            var rect = list.children[i].getBoundingClientRect();
            if (checkCollision(rect, event.pageX, event.pageY)){
                return i + 1;
            }
        }

        return list.children.length + 1;
    }

    return (
        <li id={"item-"+id}  className="item" draggable onDragStart={handleDragStart} onTouchStart={handleDragStart} onDrag={handleDrag} onTouchMove={handleDrag} onDragEnd={handleDragEnd} onTouchEnd={handleDragEnd}>
            <div className="item-row">
                <SelectPerson id={id}></SelectPerson>

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
                
                <button onClick={() => {dispatch(deleteItem(id))}}>✕</button>
            </div>
        </li>
    )
}