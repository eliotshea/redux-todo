import { useSelector } from "react-redux";
import { ItemStatuses } from "../app/reducers/itemsReducer";
import { AddItem } from "./AddItem";
import { Item } from "./Item";
 

export function ItemList () {
    const items =  useSelector((state) => state.items);

    const todo = items.filter((item) => item.status === ItemStatuses.Todo).sort((a, b) => a.priority - b.priority);
    const inProgress = items.filter((item) => item.status === ItemStatuses.InProgress).sort((a, b) => a.priority - b.priority);
    const done = items.filter((item) => item.status === ItemStatuses.Done).sort((a, b) => a.priority - b.priority);

    return <div>
        <div className="item-lists">
            <div className="item-list">
                <label htmlFor="todo">To Do:</label>
                <ul id="todo" className="item-column">
                    {todo.map((item) => <Item key={"item-" + item.id} id={item.id}></Item>)}
                </ul>
            </div>
            <div className="item-list">
                <label htmlFor="in-progress">In Progress:</label>
                <ul id="in-progress" className="item-column">
                    {inProgress.map((item) => <Item key={"item-" + item.id} id={item.id}></Item>)}
                </ul>
            </div>
            <div className="item-list">
                <label htmlFor="done">Done:</label>
                <ul id="done" className="item-column">
                    {done.map((item) => <Item key={"item-" + item.id} id={item.id}></Item>)}
                </ul>
            </div>
            
        </div>
        
        <AddItem></AddItem>
    </div>    
}