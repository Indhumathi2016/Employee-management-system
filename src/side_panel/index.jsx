import React, { useEffect, useState } from "react";

import "./styles.css";

export function SidePanel({onSearch, onFilter}) {
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        fetch("https://66891b460ea28ca88b86fa76.mockapi.io/api/employee/team")
            .then((res) => res.json())
            .then((json) => {
                setTeams(json);
            });
    }, []);
    return (
        <div className={"side_panel"}>
            <input placeholder="Search employee" onChange={event => onSearch(event.target.value)}/>
            <select onChange={event => onFilter(event.target.value)}>
                {teams.map((team) => (
                    <option key={`team-${team.id}`}>{team.name}</option>
                ))}
            </select>
        </div>
    )
}