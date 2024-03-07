import './App.css';
import { useState,useEffect } from 'react';
import SearchAppBar from './components/navbar';
import TileMenu from './components/tilemenu';
import content from './data.json'
import TutorialList from './components/list';
import Tutorial from './components/tutorial';
import Collapse from '@mui/material/Collapse';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchDisplay from './components/searchDisplay';


//returns categories for tile menu
const getCategories = () => {
  return content["data"].filter(x => x['chapter'] == 'Prescribing' )
}
console.log(getCategories())

const App = () => {
 
  const [searchTerm, setSearch] = useState("")
  const [tile, setTile] = useState("")
  const [selectedTutorials, setTutorials] = useState()
  const [collapseTiles, setCollapseTiles] = useState(true); //controls collapsing effect of tile menu
  
  const [directChapter, setSpecificChapter] = useState(null)
  const [directTutorial, setSpecificTutorial] = useState(null)

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const darkTheme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'light' : 'dark',
    },
  });
  
  

  const resetTiles = (status) => {
    setTile("")
  }

  //get url parameters 
  const getUrl = () => {
    const search = window.location.search;
    const chapter = new URLSearchParams(search).get('cat');
    const tutorial = new URLSearchParams(search).get('id');
    setSpecificChapter(chapter)
    setSpecificTutorial(tutorial)
  }


  useEffect(() => {

    //If a tile has been selected then collapse tile menu
    tile != "" ? setCollapseTiles(false):setCollapseTiles(true)
    if(tile['title'] != undefined){
      setTutorials([tile['title']])
    }
    getUrl()
  },[tile,collapseTiles,searchTerm]);

  
  //display tile menu if not direct to a specific tutorial
  return (      
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <SearchAppBar resetTiles={resetTiles} setSearch={setSearch} help_info={content.help_info}/>
          { 
            directChapter === null && searchTerm === "" ? (
              <>
                <Collapse in={collapseTiles}>
                  <TileMenu data={content} selectTile={setTile}/>     
                </Collapse>       
                {
                  tile == "" && searchTerm === "" ? "":(
                    <TutorialList tutorial={selectedTutorials} data={content} />
                  )
                } 
              </>
            ):
              <>
                {
                  searchTerm === "" ?  (<Tutorial  data={content} chapter={directChapter}  tutorialId={directTutorial}/>) : ""
                }
         
                {
                  searchTerm != "" ? <SearchDisplay data={content} searchTerm={searchTerm}/> : ""

                }
              </>
          }
          
          </ThemeProvider>

        
  );
}

export default App;
