import debounce from "debounce";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, moveItem, updateItem } from "../app/actions";
import { ItemStatuses } from "../app/reducers/itemsReducer";
import { SelectPerson } from "./SelectPerson";

export function Item (props) {
    const item = useSelector((state) => state.items.find((x) => x.id === props.id));
    const dispatch = useDispatch();
    
    let { id, name, estimatedHours, currentHours } = item;

    var todo = document.getElementById("todo");
    var inProgress = document.getElementById("in-progress");
    var done = document.getElementById("done");

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

        // debounce(() => {
        //     var todo = document.getElementById("todo");
        //     var inProgress = document.getElementById("in-progress");
        //     var done = document.getElementById("done");

        //     console.log("checking to animate");
        //     if(checkCollision(todo.getBoundingClientRect(), event.pageX, event.pageY)) {
        //         var index = getPriority(todo, event) - 1;
        //         animateLi(todo, index);
        //     } else {
        //         for(var i = 0; i < todo.children.length; i++) {
        //             todo.children[i].style.removeProperty("transform");
        //         }
        //     }
    
        //     if(checkCollision(inProgress.getBoundingClientRect(), event.pageX, event.pageY)) {
        //         var index = getPriority(inProgress, event) - 1;
        //         animateLi(inProgress, index);
        //     } else {
        //         for(var i = 0; i < inProgress.children.length; i++) {
        //             inProgress.children[i].style.removeProperty("transform");
        //         }
        //     }
            
    
        //     if(checkCollision(done.getBoundingClientRect(), event.pageX, event.pageY)) {
        //         var index = getPriority(done, event) - 1;
        //         animateLi(done, index);
        //     } else {
        //         for(var i = 0; i < done.children.length; i++) {
        //             done.children[i].style.removeProperty("transform");
        //         }
        //     }
        // }, 200)();
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

        var li = document.getElementsByTagName("li");
        for(var i = 0; i < li.length; i++) {
            li[i].style.removeProperty("transform");
        }
    }

    function checkCollision(rect, x, y) {
        if(x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
            return true;
        }
        return false;
    }

    function getPriority(list, event) {
        console.log(list.children);
        for (var i = 0; i < list.children.length; i++) {
            var rect = list.children[i].getBoundingClientRect();
            if (checkCollision(rect, event.pageX, event.pageY)){
                return i + 1;
            }
        }

        return list.children.length + 1;
    }

    function animateLi(element, index) {
        for(var i = index; i < element.children.length; i++) {
            element.children[i].style.transform = `translateY(100%)`;
        }
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