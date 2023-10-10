import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../Wrapper/Wrapper";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAllPredictions, setIsUpdatedScore } from "../../actions/bet";

const ScoreUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector((state) => state.bet.isLoading);
  const isUpdated = useSelector((state) => state.bet.isUpdatedScore);

  const allUsers = useSelector((state) => state.datas.allUsers);
  const allPredictions = useSelector((state) => state.bet.allPredictions);

  useEffect(() => {
    
  }, []);

  console.log(allPredictions);

  if (isLoading) {
    return (
      <Wrapper>
        <h2>Mise à jour en cours !</h2>
      </Wrapper>
    )
  }
  if (isUpdated) {
    return (
      <Wrapper>
        <h2>Mise à jour terminée !</h2>
      </Wrapper>
    )
  }
}

export default ScoreUpdate;