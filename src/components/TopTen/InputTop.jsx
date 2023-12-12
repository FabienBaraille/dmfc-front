import PropTypes from "prop-types";

import { teamLogo } from "../../Utils/filters/teamFilter";

const InputTop = ({team, name, label, change, value, test, disabled}) => {
  const arrayTest = test.filter(teamId => teamId != value);
  const teamsList = team.map(({id, trigram, name}, index) => <option key={`${index}team${id}`} value={id} disabled={arrayTest.includes(id)} >{trigram} - {name}</option> );
  return (
    <div className="ranking-line">
      <label htmlFor={name} >{label}</label>
      <select 
        id={name}
        name={name}
        defaultValue={value}
        onChange={change}
        disabled={disabled}
        >
      {teamsList}
      </select>
      <img className='small-logo top-logo' src={`/src/assets/logos/${teamLogo(team, value)}`} alt="" />
    </div>
  )
}
InputTop.propTypes = {
  team: PropTypes.array,
  label: PropTypes.string,
  name: PropTypes.string,
  change: PropTypes.func,
  value: PropTypes.number,
  test: PropTypes.array,
  disabled: PropTypes.bool
}
export default InputTop;