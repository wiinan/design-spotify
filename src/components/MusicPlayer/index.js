/** @jsx jsx */
import React,{useReducer,createContext} from 'react';
import { css, jsx } from '@emotion/react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Content from './Content';
import Playbar from './Playbar';
import media from '../../media.json';

export const StoreContext = createContext(null);
const DEFAULT_PLAYLIST = 'home';
const initialState = {
  currentPlaylist: DEFAULT_PLAYLIST,
  media,
  playlists: {
    home:new Set(media.ids),
    favorites:new Set(),
  }
}
const reducer = (state,action) => {
  switch(action.type){
    case 'ADD_PLAYLIST':
      return {
      ...state,
      playlists:{...state.playlists, [action.playlist]:new Set()}
    };
    case 'SET_PLAYLIST':
      return {
        ...state,currentPlaylist:action.playlist
      };
    case 'ADD_FAVORITE':
      return state
  }
  return state
}

const MusicPlayer = () => {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <StoreContext.Provider value={{state,dispatch}}>
      <div css={CSS}>
        <Topbar />
        <Sidebar />
        <Content ></Content>
        <Playbar></Playbar>
      </div>
    </StoreContext.Provider>
  )
}

const CSS = css`
    height:100%;
    width:100%;
    display:flex;
    position:relative;
    color:white;
`

export default MusicPlayer;