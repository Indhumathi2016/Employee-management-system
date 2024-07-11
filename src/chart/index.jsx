import React from "react";
import "./styles.css";

export function Chart({ employees }) {
    return (
        <div id="container">{employees.length ?
            <Family employees={employees} /> :
            <div className="noRecords"> No records found! </div>}
        </div>
    )
}

export function Family({ employees }) {
    function allowDrop(ev) {
        ev.preventDefault();
      }
      
      function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
      }
      
      function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
      }
    return (
        <ul >
            {employees.map((employee, index) => (
                <li>
                    <div key={`key-${employee.id}`}>
                        <div className="box" ondrop={(event) => drop(event)} ondragover={(event) => allowDrop(event)} draggable="true" ondragstart={(event) => drag(event)}>
                            <img src={employee.profile} alt="profile" />
                            <div className="flex">
                                <div className="name">{employee.name}</div>
                                <div>{employee.designation}</div>
                            </div>
                        </div>
                    </div>
                    {employee.children?.length ? <Family employees={employee.children} /> : null}
                </li>
            ))}

        </ul>
    )
}