import { 
  ADD_BET_TO_LIST,
  BET_TO_REMOVE,
  SET_GAMES_ROUND,
  SET_INPUT_VALUE_BET,
  SET_IS_CREATED_MATCH,
  SET_IS_LOADING_BET,
  SET_IS_LOADING_GAME,
  SET_IS_UPDATED,
  SET_PREDICTION_BY_GAME,
  SET_UPDATED_GAME,
  TOGGLE_CREATION_MODE_BET,
  SET_ALL_PREDICTIONS,
  SET_COUNT_BET,
  RESET_COUNT_BET,
  SET_UPDATED_MESSAGE,
  RESET_SCORE_UPDATE,
  SET_IS_PRED,
  SET_DELETE_MESSAGE
} from "../actions/bet";

const initialState = {
  'betList': [],
  'betNumber': 0,
  'roundCreationMode': false,
  'isLoading': true,
  'isLoadingGame': false,
  'isCreatedMatch': false,
  'isUpdated': false,
  'updatedMessage': '',
  'games': [],
  'isPred': [],
  'roundName': '',
  'roundCat': 'SR',
  'roundNumber': '',
  'predictionByGame': [],
  'updatedGame': {},
  'allPredictions': [],
  'countBet': 0,
  'countPred': 0,
  'deleteMessage': ''
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_BET_TO_LIST:
      return {
        ...state,
        betList: [...state.betList, action.betTpl],
        betNumber: state.betNumber + 1
      }
      
    case BET_TO_REMOVE: 
      return {
        ...state,
        betList: [...state.betList.filter(bet => bet.key !== action.idToRemove)]
      }
    
    case TOGGLE_CREATION_MODE_BET:
      return {
        ...state,
        roundCreationMode: action.roundCreationMode
      }
    case SET_IS_LOADING_BET:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case SET_GAMES_ROUND:
      return {
        ...state,
        games: action.gamesList,
        isLoading: false,
      }
    case SET_IS_PRED:
      return {
        ...state,
        isPred: action.predList,
      }
    case SET_COUNT_BET:
      return {
        ...state,
        countBet: state.countBet + 1
      }
    case RESET_COUNT_BET:
      return {
        ...state,
        countBet: 0,
      }
    case RESET_SCORE_UPDATE:
      return {
        ...state,
        countPred: 0,
        allPredictions: [],
        predictionByGame: [],
        updatedGame: {},
      }
    case SET_INPUT_VALUE_BET:
      return {
        ...state,
        [action.inputName]: action.inputValue,
      }
    case SET_IS_LOADING_GAME:
      return {
        ...state,
        isLoadingGame: action.isLoading
      }
    case SET_IS_CREATED_MATCH:
      return {
        ...state,
        isCreatedMatch: action.isCreated,
      }
    case SET_IS_UPDATED:
      return {
        ...state,
        isUpdated: action.isUpdated,
      }
    case SET_PREDICTION_BY_GAME:
      return {
        ...state,
        predictionByGame: action.predictionInfos,
        isUpdated: true,
        isLoading: false
      }
    case SET_UPDATED_GAME:
      return {
        ...state,
        updatedGame: action.gameInfos,
        isLoading: false
      }
    case SET_DELETE_MESSAGE:
      return {
        ...state,
        deleteMessage: action.message,
        isLoadingGame: false
      }
    case SET_ALL_PREDICTIONS:
      return {
        ...state,
        allPredictions: [...state.allPredictions, action.predictionsInfos],
        countPred: state.countPred + 1
      }
    case SET_UPDATED_MESSAGE:
      return {
        ...state,
        updatedMessage: action.message
      }
    default:
      return state;
  }
};

export default reducer;