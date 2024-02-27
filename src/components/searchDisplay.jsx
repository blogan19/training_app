import { useState,useEffect } from "react"
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IconButton from '@mui/material/IconButton';


export default function SearchDisplay({data, searchTerm}){
    
    
  const [tutorialList, setTutorialList] = useState([])
  const [searchMatches, setMatches] = useState([])
  
  const getAllTutorials = () => {
        let tutorials = []
        data.data.map(x => {
            x['subcategories'].map(i => {
                tutorials.push({"chapter": x['chapter'], "tutorial_name": i['tutorial_name'], "tags": i['tags'], "id": i["tutorial_id"] })
            })
        })
        setTutorialList(tutorials)
        
    }

    const searchTutorials = () => {
      let input = searchTerm
      if(input.length > 2){
        input = input.toLowerCase()
        input = '.*' + input.split('').join('.*') + '.*';
        const re = new RegExp(input);
        console.log(re)
        let matches = []

        tutorialList.map((i) => {
          //Check if regex matches items in tags list 
          const matchFoundTags = i["tags"].filter(x => x.match(re))
          //Check if regex matches item in content
          const matchFoundText = i["tutorial_name"].toLowerCase().match(re)
 

          if(matchFoundTags.length > 0 || matchFoundText != null){
            matches.push(i)
          }
        })
        matches = [...new Set(matches)]
        setMatches(matches)
      }
    }



    useEffect(() => {
      getAllTutorials(data)
      searchTutorials()
    });

    const tutList =  searchMatches.map((x) => (
          <a href={"?cat="+ x['chapter'] + "&id=" + x['id']}>
            <ListItemButton key={x['tutorial_name']} >
              <ListItemText primary={x['tutorial_name']} />
              <IconButton aria-label='comment'>
                <KeyboardArrowRightIcon />
              </IconButton>
            </ListItemButton>
          </a>
    ))


    //cat=Prescribing&id=1
    
    return (
      <Container>
        <Card sx={{ width: '100%', bgcolor: 'background.paper', mt:2 , p:2}}>
        {
          searchMatches.length > 0 ? (
            <Box>
              <Container>
                <List component="nav" aria-label="secondary mailbox folder">
                  {tutList}
                  <Divider/>
                 </List>
              </Container>
            </Box>
          ) : (
            <Box>
              <Container>
                <div align="center">
                  <h4>Nothing found for "{searchTerm}"</h4>
                  <p>Sorry, there are no tutorials matching your search term </p>
                </div>
              </Container>
            </Box>
          )
        }
      </Card>
      </Container>
    );
  }