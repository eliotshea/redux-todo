import { useSelector } from "react-redux";

export function Assignee(props) {
    const id = props.id;
    const user = useSelector((state) => state.people.find(x => x.id === id));
    
    
    return <div>
        {user === undefined ? "" : user.name}
    </div>
}