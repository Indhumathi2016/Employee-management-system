import React, { useEffect, useState } from "react";
import "./styles.css";

export function Chart() {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        fetch("https://66891b460ea28ca88b86fa76.mockapi.io/api/employee/EmployeeDetails")
            .then((res) => res.json())
            .then((json) => {
                setEmployees(json);
            });
    }, []);
    return (
        <div>
            <div id="container">
                {employees.map((employee, index) => (
                    <div id={`no${index}`}><span>{employee.name}</span></div>
                ))}

            <div id="no1"><a href="">Managing Director</a></div>
            <div id="line1"></div>
            <div id="line2"></div>
            <div id="line3"></div>
            <div id="line4"></div>
            <div id="line5"></div>
            <div id="line6"></div>
            <div id="no2"><a href="#">Sales &amp; Marketing Director</a></div>
            <div id="no3"><a href="#">Production Director</a></div>
            <div id="no4"><a href="#">Human Resources Director</a></div>
            <div id="no5"><a href="#">Finance Director</a></div>
            <div id="line7"></div>
            <div id="line8"></div>
            <div class="clear"></div>
            <div id="no6"><a href="#">Factory Manager</a></div>
            <div id="line9"></div>
            <div id="line10"></div>
            <div id="no7"><a href="#">Management Accountant</a></div>
            <div id="line11"></div>
            <div id="line12"></div>
            <div class="clear"></div>
            <div id="line13"></div>
            <div id="line14"></div>
            <div class="clear"></div>
            <div id="no8"><a href="#">Quality Control Manager</a></div>
            <div id="line15"></div>
            <div id="line16"></div>
            <div id="no9"><a href="#">Financial Accountant</a></div>
            <div id="line17"></div>
            <div id="line18"></div>
            <div class="clear"></div>

            </div>
        </div>
    )
}