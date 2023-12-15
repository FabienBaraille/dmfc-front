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
  SET_UPDATED_MESSAGE_SCORE,
  RESET_SCORE_UPDATE,
  SET_IS_PRED,
  SET_IS_DELETED,
  SET_TOP_TEN,
  SET_IS_CREATED_ROUND,
  SET_IS_BET,
  SET_IS_CREATED_TOP,
  SET_BET_TOP_TEN_LIST,
  SET_IS_UPDATED_RESULTS,
  SET_IS_UPDATED_BET,
  RESET_IS_ALL_GET,
  SET_IS_UPDATED_DEADLINE,
  SET_TOP_TEN_RESULTS,
  SET_IS_UPDATED_TOP
} from "../actions/bet";

const initialState = {
  'betList': [],
  'betNumber': 0,
  'roundCreationMode': false,
  'toptenDate': '',
  'betStatus': '',

  'isLoading': false,
  'isLoadingGame': false,

  'isCreatedRound': false,
  'isCreatedMatch': false,
  'isCreatedTop': false,
  'games': [],

  'isUpdated': false,
  'updatedGame': {},
  'isUpdatedResults': false,
  'predictionByGame': [],
  'isUpdatedBet': false,
  'allPredictions': [],
  'isAllGet': false,
  'updatedMessageScore': '',
  
  'isUpdatedDeadline': false,
  'topResults': [],
  'isUpdatedTop': false,

  'isBet': false,
  'toptens': [],
  'betTopTenList': [],
  'updatedConf': '',
  'isPred': [],
  'roundName': '',
  'roundNumber': '',
  'isDeleted': false
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
    case SET_INPUT_VALUE_BET:
      return {
        ...state,
        [action.inputName]: action.inputValue,
      }

    case SET_IS_LOADING_BET:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case SET_IS_LOADING_GAME:
      return {
        ...state,
        isLoadingGame: action.isLoading
      }

    case SET_IS_CREATED_ROUND:
      return {
        ...state,
        isCreatedRound: action.isCreated
      }
    case SET_IS_CREATED_MATCH:
      return {
        ...state,
        isCreatedMatch: action.isCreated,
      }
    case SET_IS_CREATED_TOP:
      return {
        ...state,
        isCreatedTop: action.isCreated
      }
    case SET_GAMES_ROUND:
      return {
        ...state,
        games: action.gamesList,
        isLoading: false,
      }

    case SET_IS_UPDATED:
      return {
        ...state,
        isUpdated: action.isUpdated
      }
    case SET_UPDATED_GAME:
      return {
        ...state,
        updatedGame: action.gameInfos,
        isLoading: false
      }
    case SET_IS_UPDATED_RESULTS:
      return {
        ...state,
        isUpdatedResults: action.isUpdated
      }
    case SET_IS_UPDATED_TOP:
      return {
        ...state,
        isUpdatedTop: action.isUpdated
      }
    case SET_PREDICTION_BY_GAME:
      return {
        ...state,
        predictionByGame: action.predictionInfos,
        isUpdatedResults: true,
        isLoading: false
      }
    case SET_IS_UPDATED_BET:
      return {
        ...state,
        isUpdatedBet: action.isUpdated
      }
    case SET_ALL_PREDICTIONS:
      return {
        ...state,
        allPredictions: action.predictionsInfos,
        isAllGet: true,
      }
    case RESET_IS_ALL_GET:
      return {
        ...state,
        isAllGet: false
      }
    case SET_UPDATED_MESSAGE_SCORE:
      return {
        ...state,
        updatedMessageScore: action.message
      }

    // TOP TEN
    case SET_IS_UPDATED_DEADLINE:
      return {
        ...state,
        isUpdatedDeadline: action.isUpdated
      }
    case SET_TOP_TEN_RESULTS:
      return {
        ...state,
        topResults: action.data,
        updatedConf: action.conference,
        isLoading: false
      }
    case SET_TOP_TEN:
      return {
        ...state,
        toptens: action.datas,
        isLoadingGame: false
      }
    case SET_IS_PRED:
      return {
        ...state,
        isPred: action.predList,
      }
    case SET_IS_DELETED:
      return {
        ...state,
        isDeleted: action.isDeleted,
        isLoadingGame: false
      }
    case SET_IS_BET:
      return {
        ...state,
        isBet: action.isBet,
        betStatus: action.status
      }
    case SET_BET_TOP_TEN_LIST:
      return {
        ...state,
        betTopTenList: [...state.betTopTenList, action.datas],
        isUpdateTop: true
      }
    case RESET_SCORE_UPDATE:
      return {
        ...state,
        'isUpdated': false,
        'updatedGame': {},
        'predictionByGame': [],
        'allPredictions': [],
        'updatedMessageScore': '',
        'updatedConf': '',
        'topResults': []
      }
    default:
      return state;
  }
};

export default reducer;