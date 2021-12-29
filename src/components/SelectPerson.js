import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateItem } from "../app/actions";

export function SelectPerson(props) {
    const { id } = props;
    const item = useSelector((state) => state.items.find(x => x.id === id));
    const people = useSelector((state) => state.people.list);
    const dispatch = useDispatch();
    let open = false;
    
    useEffect(() => {
        if(item.assignedTo) {
            var person = people.find(x => x.id === item.assignedTo);
            var initials = document.getElementById("assigned-initials"+id);
            initials.style.backgroundColor = person.color;
        }
    }, [item, id, people]);

    function getInitials(personId) {
        var person = people.find(x => x.id === personId);
        if(person !== undefined) {
            return person.firstName.slice(0,1) + person.lastName.slice(0,1)
        } else {
            return ""
        }  
    }

    const options = people.map(x => {
        return <div key={x.id} value={x.id} onClick={handleChange} color={x.color}>{x.firstName + " " + x.lastName}</div>
    });

    function handleChange(event) {
        dispatch(updateItem(id, {
            ...item,
            assignedTo: parseInt(event.target.getAttribute("value"))
        }))
        handleClick();
    }

    function handleClick(event) {
        const list = document.getElementById("assigned-options"+id);
        if (!open) {
            
            list.style.display = "flex";
            list.style.position ="absolute";
        } else {
            list.style.display = "none";
        }
        open = !open;
    }

    return (
        <div className="select-person">
            <div className="assigned-initials" id={"assigned-initials"+id} onClick={handleClick}>
                <div className="initials">{getInitials(item.assignedTo)}</div>    
            </div>
            <div className="assign-options" id={"assigned-options"+id}>
                {options}
            </div>
        </div>
        
    )
}