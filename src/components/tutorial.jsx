import { useState,useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';


export default function Tutorial({data,chapter,tutorialId}) {
  //const [tutorials, getTutorials] = useState(data.data.filter(x => x['chapter'] == chapter)[0]['subcategories'])

  const [tutorial, setTutorial] = useState()
  const [tutorialType, setTutorialType]  = useState("")

 
  const checkExists = () => {
    try{
      const tutorials = data.data.filter(x => x['chapter'] == chapter)[0]['subcategories']
      const tutorial = tutorials.filter(x => x['tutorial_id'] === tutorialId)[0]
      setTutorialType(tutorial['tutorial_type'])
      setTutorial(tutorial)
    }
    catch(err){
      console.log(err.message)
    }
  }

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" >
      Home
    </Link>,
    <Typography key="3" color="text.primary">
      {chapter}
    </Typography>,
  ];

  useEffect(() => {
    checkExists()
  },[]);

  
  
  
  // what if tutorial doesn't exist
  return (
    <>
      {
        tutorial === undefined || tutorial.length === 0 ? (
          <h5>404 not found</h5>
        ):(
          
            <Box>
              <Container>
                <Card sx={{ width: '100%', bgcolor: 'background.paper', mt:2 , p:3}}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
                <h2>{chapter}</h2>
                <h4>{tutorial['tutorial_name']}</h4>
                <div>
              {
                tutorialType == 'text' ? ( tutorial['content']): ''
              }
              </div>
              {
                tutorialType == 'video' ? (
                    <div className='video-wrapper'>
                      <iframe className='responsive-iframe' src={tutorial['url']}></iframe>
                    </div>
                ): ''   
              }
                </Card>
             </Container>
            </Box>
          
        )
      }
    </>
  );



  
}