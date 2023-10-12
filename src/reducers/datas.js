import { NEWS_CREATION_MODE, SET_NEWS } from "../actions/news";
import { 
  LEAGUE_CREATION_MODE,
  SET_LEAGUE,
  SET_ALL_LEAGUE,
  SET_IS_LOADING,
  SET_IS_LOADING_SR,
  SET_ROUNDS,
  SET_SEASON,
  SET_SR_PREDICTION,
  SET_USERS_LIST,
  SET_ALL_TEAMS, 
  SET_TITLE,
  SET_FOCUS,
  SET_MODAL_FUNCTION,
  SET_MODAL_SENTENCE,
  SET_IS_LOADING_START,
} from '../actions/datas';
import { SET_TARGET_KICK } from "../actions/user";

const initialState = {
  'allUsers': [],
  'allLeague': [],
  'allTeams':[],
  'SRPrediction': [],
  'isLoadingStart': false,
  'isLoading': true,
  'isLoadingSR': true,
  // News
  'newsCreation': false,
  'newsTitle': '',
  'news': '',
  'newsId': 0,
  // End news
  // League Management
  'leagueCreation': false,
  'leagueInfos': {},
  'leagueDescription': '',
  'leagueName': '',
  'title': '',
  'focusedInputId': null,
  'focusedInputModal': null,
  'targetKick': null,
  'modalFunction': {},
  'modalSentence': false,
  // End League management
  'rounds': [],
  'allSeasons': [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case SET_IS_LOADING_START:
      return {
        ...state,
        isLoadingStart: action.isLoadingStart,
      }
    case SET_USERS_LIST:
      return {
        ...state,
        allUsers: action.list,
        isLoading: false,
      }
    case SET_ALL_LEAGUE:
      return {
        ...state,
        allLeague: action.leaguesList,
        isLoading: false,
      }
    case SET_ALL_TEAMS:
      return {
        ...state,
        allTeams: action.teamsList,
        isLoading: false,
      }
    case SET_IS_LOADING_SR:
      return {
        ...state,
        isLoadingSR: true,
      }
    case SET_SR_PREDICTION:
      return {
        ...state,
        SRPrediction: action.prediction,
        isLoadingSR: false,
      }
    case NEWS_CREATION_MODE:
      return {
        ...state,
        newsCreation: action.newsCreation,
        isLoading: false,
      }
    case SET_NEWS:
      return {
        ...state,
        [action.inputName]: action.inputValue,
        isLoading: false,
      }
    case SET_ROUNDS:
      return {
        ...state,
        rounds: action.roundsInfos,
        isLoading: false,
      }
    case SET_LEAGUE:
      return {
        ...state,
        [action.inputName]: action.inputValue,
        isLoading: false,
      }
    case LEAGUE_CREATION_MODE:
      return {
        ...state,
        leagueCreation: action.leagueCreation,
        isLoading: false,
      }
    case SET_SEASON:
      return {
        ...state,
        allSeasons: action.seasonInfos,
        isLoading: false,
      }
    case SET_TITLE:
      return {
        ...state,
        title: action.title,
        isLoading: false,
      }
    case SET_FOCUS:
      return {
        ...state,
        focusedInputId: action.id,
      }
    case SET_TARGET_KICK:
      return {
        ...state,
        targetKick: action.username,
      }
    case SET_MODAL_FUNCTION:
      return {
        ...state,
        modalFunction: action.func
      }
    case SET_MODAL_SENTENCE:
      return {
        ...state,
        modalSentence: action.bool
      }
    default:
    return state;
  }
};

export default reducer;