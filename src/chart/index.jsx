import React from "react";
import "./styles.css";

export function Chart({ employees, updateEmployeeChart }) {
    return (
        <div id="container">{employees.length ?
            <Family employees={employees} updateEmployeeChart={updateEmployeeChart} /> :
            <div className="noRecords"> No records found! </div>}
        </div>
    )
}

export function Family({ employees, updateEmployeeChart }) {
    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev, employee) {
        ev.dataTransfer.setData("text/plain", JSON.stringify(employee.id));
    }

    function drop(ev, dropData) {
        ev.preventDefault();
        var dragDataId = JSON.parse(ev.dataTransfer.getData('text/plain'));
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ manager_id: dropData.id })
        };
        fetch(`https://66891b460ea28ca88b86fa76.mockapi.io/api/employee/EmployeeDetails/${dragDataId}`, requestOptions)
            .then((res) => res.json())
            .then(() => {
                updateEmployeeChart(dragDataId, dropData.id);
            });
    }
    return (
        <div>
            <ul>
                {employees.map((employee, index) => (
                    <li>
                        <div key={`key-${employee.id}`} onDrop={(event) => drop(event, employee)} onDragOver={(event) => allowDrop(event)}>
                            <div className="box" draggable="true" onDragStart={(event) => drag(event, employee)} id={`id-${employee.id}`}>
                                <img src={employee.profile} alt="profile" />
                                <div className="flex">
                                    <div className="name">{employee.name}</div>
                                    <div>{employee.designation}</div>
                                </div>
                            </div>
                        </div>
                        {employee.children?.length ? <Family employees={employee.children} updateEmployeeChart={updateEmployeeChart} /> : null}
                    </li>
                ))}

            </ul>
        </div>
    )
}