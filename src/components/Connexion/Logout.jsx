import { useDispatch } from "react-redux";

import { setInputValue, setIsLogged } from "../../actions/user";

import Wrapper from "../Wrapper/Wrapper";

const Logout = () => {

  const dispatch = useDispatch();

  const handleLogout = () => {
    document.cookie = `isLogged=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    document.cookie = `userInfos=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    dispatch(setInputValue('loggedUser', ''));
    dispatch(setInputValue('password', ''));
    dispatch(setIsLogged(false));
  }

  return (
    <Wrapper name="logout">
      <h3>Tu veux te déconnecter ?</h3>
      <button type="button" onClick={handleLogout}>Sortir de là !</button>
    </Wrapper>
  )
}

export default Logout;