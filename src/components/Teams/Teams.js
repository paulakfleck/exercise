import React, { useState, useEffect } from 'react';

import TeamsList from './TeamsList';
import Search from './../Search';

import useFetch from './../../hooks/useFetch';

const Teams = () => {
    const url = 'https://cgjresszgg.execute-api.eu-west-1.amazonaws.com';
    const [teams, setTeams] = useState(true);
    const [searchInput, setSearchInput] = useState('');

    const getFilter = (searchValue) => {
        setSearchInput(searchValue);
    }

    const defineTeams = fetchedTeams => {
        const filteredTeams = fetchedTeams.filter((team) => {
            if (team.name.toLowerCase().includes(searchInput.toLowerCase())) {
                return team;
            }
        });

        setTeams(filteredTeams);
    }

    const { isLoading, error, fetchData: fetchTeams } = useFetch(`${url}/teams`, defineTeams);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchTeams();
          }, 200)
      
          return () => clearTimeout(delayDebounceFn)
    }, [searchInput]);

    return (
        <React.Fragment>
            <h1 className="yellow">Teams</h1>

            <Search sendFilter={getFilter} placeholder="Filter by Team name" />
            
            {!isLoading && <TeamsList teams={teams}></TeamsList>}
            {isLoading && <p className="loading">Loading...</p>}
            {!isLoading && error && <p>{error}</p>}
        </React.Fragment>
    )
}

export default Teams;