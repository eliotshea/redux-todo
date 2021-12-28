import { useState } from "react"
import { useDispatch } from "react-redux";
import { addItem } from "../app/actions";
import { ItemStatuses } from "../app/reducers/itemsReducer";

export function AddItem() {
    const [name, setName ] = useState("");
    const [estimate, setEstimate ] = useState(0); 

    const dispatch = useDispatch();

    function submitForm(event) {
        event.preventDefault();
        dispatch(
            addItem({
                name: name,
                estimatedHours: estimate,
                currentHours: 0,
                assignedTo: null,
                status: ItemStatuses.Todo
            })
        );
        setName("");
        setEstimate(0);
        document.getElementById("name").focus();
    }
    
    function exitModal(event) {
        const modal = document.getElementById("outer-add-modal");
        modal.style.display = "none";
    }
    
    return (
        <div id="outer-add-modal" onClick={exitModal}>
            <form onSubmit={submitForm}>
                <div id="inner-modal" onClick={(event) => {event.stopPropagation()}}>
                    <div className="modal-header">
                        Add Items
                        <div className="exit-modal" onClick={exitModal}>✕</div>
                    </div>
                    <div className="modal-content">
                            <label htmlFor="name">Item Name:</label>
                            <input id="name" type="text" value={name} onChange={(event) => setName(event.target.value)}></input>
                            <label htmlFor="estimate">Estimate:</label>
                            <input id="estimate" type="number" value={estimate} onChange={(event) => setEstimate(event.target.value)}></input>
                    </div>
                
                    <div className="modal-footer">
                        <input type="submit" value="Submit"></input>
                    </div>
                </div>
            </form>
        </div>
    )

}