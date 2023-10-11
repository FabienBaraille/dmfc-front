import PropTypes from 'prop-types';

import "./Strength.scss";

const Strength = ({password}) => {
  const pwdValidate = password;
  const initPwdChecker = () => {
    let pwdCheck = 0;
    let validateRegex = ["[A-Z]", "[a-z]", "[0-9]", "\\W"];
    validateRegex.forEach((regex) => {
      if (new RegExp(regex).test(pwdValidate)) {
        pwdCheck += 1;
      }
    });
    switch (pwdCheck) {
      case 0:
        return {
          strength: 0,
          val: "",
        };
      case 1:
        return {
          strength: 1,
          val: "faible",
        };
      case 2:
        return {
          strength: 2,
          val: "moyen",
        };
      case 3:
        return {
          strength: 3,
          val: "bon",
        };
      case 4:
        return {
          strength: 4,
          val: "fort",
        };
      default:
        return null;
    }
  };
  return (
    <div className="wrapper-strength">
        <progress
          className={`pwd-checker-bar strength-${initPwdChecker().val}`}
          value={initPwdChecker().strength}
          max="4"
        />
        {password && (
            <p className={`pwd-label label strength-${initPwdChecker().val}`}>
              <strong>{initPwdChecker().val} </strong>
            </p>
        )}
    </div>
  );
};

Strength.propTypes = {
  password: PropTypes.string,
}

export default Strength;