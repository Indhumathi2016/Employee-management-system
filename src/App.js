import React, { useState, useEffect } from 'react';
import './App.css';

import { SidePanel } from "./side_panel";
import { Chart } from "./chart";

function App() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [employeeTree, setEmployeeTree] = useState([]);
  useEffect(() => {
    fetchCall("Integration");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchCall(filter) {
    fetch(`https://66891b460ea28ca88b86fa76.mockapi.io/api/employee/EmployeeDetails?team=${filter}`)
      .then((res) => res.json())
      .then((json) => {
        setEmployees(json);
        const tree = generateData(json);
        setFilteredEmployees(tree);
        setEmployeeTree(tree);
      }).catch(error => {
        setEmployeeTree([]);
        setFilteredEmployees([]);
      });
  }

  function generateData(json) {
    function buildTreeArray(flatArray) {
      const nodeMap = flatArray.reduce((acc, item) => {
        acc[item.id] = { ...item, children: [] };
        return acc;
      }, {});

      // Recursive function to build nodes
      const buildNode = (id) => {
        const node = nodeMap[id];
        if (!node) return null;
        node.children = flatArray
          .filter((item) => item.manager_id === id)
          .map((item) => buildNode(item.id));

        return node;
      };
      return flatArray
        .filter((item) => item.manager_id === "")
        .map((item) => buildNode(item.id));
    }
    return buildTreeArray(json)
  }

  function onSearch(searchKey) {
    console.log(searchKey, "searchKey");
    if (searchKey) {
      const filters = employees.filter(employee => employee.name.toLowerCase().includes(searchKey.toLowerCase()));
      setFilteredEmployees(filters);
      console.log(filters, "filters");
    } else {
      setFilteredEmployees(employeeTree);
    }
  }

  function onFilter(filterKey) {
    fetchCall(filterKey);
  }

  function updateEmployeeChart(dragId, dropId) {
    const changedData = employees.map(employee => {
      console.log(employee.id, dragId, "id")
      if(employee.id === dragId) {
        employee.manager_id = dropId;
      }
      return employee;
    });
    setFilteredEmployees(generateData(changedData));
  }
  return (
    <div className="App">
      <SidePanel onSearch={onSearch} onFilter={onFilter} />
      <Chart employees={filteredEmployees} updateEmployeeChart={updateEmployeeChart} />
    </div>
  );
}

export default App;
