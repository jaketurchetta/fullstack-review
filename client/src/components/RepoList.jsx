import _ from 'underscore';
import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';


const RepoList = (props) => {
  const data = JSON.parse(props.repos);
  return (
    <div>
      <h4> Repo List Length </h4>
      There are {props.repos.length} repos.
      <div>
        <h4> Repo List </h4>
        {_.map(data, (repo) =>
        <RepoListEntry
          key={repo.id}
          name={repo.name}
          owner={repo.owner.login}
          url={repo.url}
          description={repo.description}/>)}
      </div>
    </div>
  )
}

export default RepoList;