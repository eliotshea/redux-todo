import { useDispatch, useSelector } from "react-redux";
import { ItemStatuses } from "../app/reducers/itemsReducer";
import { AddItem } from "./AddItem";
import { Item } from "./Item";
 

export function ItemList () {
    const items =  useSelector((state) => state.items);
    const dispatch = useDispatch();

    return <div>
        <div className="item-lists">
            <div className="item-list">
                <label htmlFor="todo">To Do:</label>
                <ul id="todo" className="item-column">
                    {items.filter((item) => item.status === ItemStatuses.Todo)?.map((item) => <Item key={"item-" + item.id} id={item.id}></Item>)}
                </ul>
            </div>
            <div className="item-list">
                <label htmlFor="in-progress">In Progress:</label>
                <ul id="in-progress" className="item-column">
                    {items.filter((item) => item.status === ItemStatuses.InProgress)?.map((item) => <Item key={"item-" + item.id} id={item.id}></Item>)}
                </ul>
            </div>
            <div className="item-list">
                <label htmlFor="done">Done:</label>
                <ul id="done" className="item-column">
                    {items.filter((item) => item.status === ItemStatuses.Done)?.map((item) => <Item key={"item-" + item.id} id={item.id}></Item>)}
                </ul>
            </div>
            
        </div>
        
        <AddItem></AddItem>
    </div>    
}