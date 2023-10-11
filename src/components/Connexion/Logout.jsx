import { useDispatch } from "react-redux";

import { resetStore } from "../../actions/user";

import Wrapper from "../Wrapper/Wrapper";

const Logout = () => {

  const dispatch = useDispatch();

  const handleLogout = () => {
    document.cookie = `isLogged=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    document.cookie = `userInfos=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    dispatch(resetStore());
  }

  return (
    <Wrapper name="logout">
      <h3>Tu veux te déconnecter ?</h3>
      <button type="button" onClick={handleLogout}>Sortir de là !</button>
    </Wrapper>
  )
}

export default Logout;