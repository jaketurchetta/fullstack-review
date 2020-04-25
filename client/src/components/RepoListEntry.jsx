import React from 'react';

const RepoListEntry = ({name, owner, description, html_url}) => {
  return (
    <li>
      <span><a href={html_url}> {name} </a></span>
      <span> {description} | </span>
      <span> {owner} </span>
      {/* <button onClick={() => handleDelete(id)}>Delete</button>
      <button onClick={() => toggleEditMode({id, item, quantity})}>Edit</button> */}
    </li>
  )
}


export default RepoListEntry;