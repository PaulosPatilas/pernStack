import React from 'react';


function EmployeeRow(props) {
     
    return(
        <>
        <td>{props.LastName}</td>
        <td>{props.FirstName}</td>
        <td>{props.BirthDate}</td>
        <td>{props.is_active ? 'Yes' : 'No'}</td>
        </>                 
    )

}
export default EmployeeRow
