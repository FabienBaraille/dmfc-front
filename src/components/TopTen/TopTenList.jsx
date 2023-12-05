import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import Wrapper from "../Wrapper/Wrapper";
import Input from "../Utils/Input";

import { updateTopTen } from "../../actions/bet";

import { transformDate } from "../../Utils/stats/calcDate";
import InputTop from "./InputTop";

const TopTenList = ({topten: {id, conference, deadline, team, results}}) => {

  const dispatch = useDispatch();

  const [newDeadline, setNewDeadline] = useState(deadline.slice(0, 16));
  const [team1, setTeam1] = useState(results.length !== 0 && !isNaN(parseInt(results[0])) ? parseInt(results[0]) : team[0].id);
  const [team2, setTeam2] = useState(results.length !== 0 && !isNaN(parseInt(results[1])) ? parseInt(results[1]) : team[0].id);
  const [team3, setTeam3] = useState(results.length !== 0 && !isNaN(parseInt(results[2])) ? parseInt(results[2]) : team[0].id);
  const [team4, setTeam4] = useState(results.length !== 0 && !isNaN(parseInt(results[3])) ? parseInt(results[3]) : team[0].id);
  const [team5, setTeam5] = useState(results.length !== 0 && !isNaN(parseInt(results[4])) ? parseInt(results[4]) : team[0].id);
  const [team6, setTeam6] = useState(results.length !== 0 && !isNaN(parseInt(results[5])) ? parseInt(results[5]) : team[0].id);
  const [team7, setTeam7] = useState(results.length !== 0 && !isNaN(parseInt(results[6])) ? parseInt(results[6]) : team[0].id);
  const [team8, setTeam8] = useState(results.length !== 0 && !isNaN(parseInt(results[7])) ? parseInt(results[7]) : team[0].id);
  const [team9, setTeam9] = useState(results.length !== 0 && !isNaN(parseInt(results[8])) ? parseInt(results[8]) : team[0].id);
  const [team10, setTeam10] = useState(results.length !== 0 && !isNaN(parseInt(results[9])) ? parseInt(results[9]) : team[0].id);

  const newResult = [team1, team2, team3, team4, team5, team6, team7, team8, team9, team10];

  const handleUpdate = (event) => {
    event.preventDefault();
    const newDate = transformDate(newDeadline, 'create');
    const body = {
      "results": newResult,
      "deadline": newDate
    };
    dispatch(updateTopTen(id, body));
  }
  return (
    <Wrapper name="topten-list">
      <h5>{`Top 10 Conférence ${conference === 'Eastern' ? 'Est' : 'Ouest'}`}</h5>
      <form onSubmit={handleUpdate}>
        <Input 
          inputName="deadline"
          label="Deadline :"
          id="pronostic-limit"
          type="datetime-local"
          value={newDeadline}
          onChange={event => setNewDeadline('toptenDate', event.target.value)} 
          isRequired={true}
        />
        <InputTop 
          team={team}
          name="first"
          label="1er :"
          change={(event) => setTeam1(parseInt(event.target.value))}
          value={team1}
          test={newResult}
        />
        <InputTop 
          team={team}
          name="second"
          label="2ème :"
          change={(event) => setTeam2(parseInt(event.target.value))}
          value={team2}
          test={newResult}
        />
        <InputTop 
          team={team}
          name="third"
          label="3ème :"
          change={(event) => setTeam3(parseInt(event.target.value))}
          value={team3}
          test={newResult}
        />
        <InputTop 
          team={team}
          name="forth"
          label="4ème :"
          change={(event) => setTeam4(parseInt(event.target.value))}
          value={team4}
          test={newResult}
        />
        <InputTop 
          team={team}
          name="fifth"
          label="5ème :"
          change={(event) => setTeam5(parseInt(event.target.value))}
          value={team5}
          test={newResult}
        />
        <InputTop 
          team={team}
          name="sixth"
          label="6ème :"
          change={(event) => setTeam6(parseInt(event.target.value))}
          value={team6}
          test={newResult}
        />
        <InputTop 
          team={team}
          name="seventh"
          label="7ème :"
          change={(event) => setTeam7(parseInt(event.target.value))}
          value={team7}
          test={newResult}
        />
        <InputTop 
          team={team}
          name="eigth"
          label="8ème :"
          change={(event) => setTeam8(parseInt(event.target.value))}
          value={team8}
          test={newResult}
        />
        <InputTop 
          team={team}
          name="ninth"
          label="9ème :"
          change={(event) => setTeam9(parseInt(event.target.value))}
          value={team9}
          test={newResult}
        />
        <InputTop 
          team={team}
          name="tenth"
          label="10ème :"
          change={(event) => setTeam10(parseInt(event.target.value))}
          value={team10}
          test={newResult}
        />
        <button type="submit">Mettre à jour</button>
      </form>
    </Wrapper>
  )
};
TopTenList.propTypes = {
  topten: PropTypes.object,
}
export default TopTenList;