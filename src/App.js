import { Typography } from '@material-ui/core';
import './App.css';
import Game from './components/Game';


function App() {
  
  return (
    <div style={{display:'flex',justifyContent:'center'}}> 
    <Typography variant='h4' color='textSecondary' style={{marginTop:30}}>Tic-Tac-Toe Game</Typography>     
      <Game />  
    </div>    
  );
}

export default App;
