import { useState,useEffect } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';



import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function TutorialList(props) {
    const [tutorials, setTutorials]  = useState(null)
    const [expanded, setExpanded] = useState(false);
    const [description, setDescription] = useState(null)

    //expand panel
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const getCategory = (title) => {
        const tutorialContent =  props.data.data.filter(x => x['chapter'] == title)
        console.log(tutorialContent)
        if(tutorialContent != undefined && tutorialContent.length > 0){
            setDescription(tutorialContent[0]['description'])
            return tutorialContent[0]['subcategories']
        }
        
    }

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" >
          Home
        </Link>,
        <Typography key="3" color="text.primary">
          {props.tutorial}
        </Typography>,
      ];
    



    useEffect(() => {
        setTutorials(getCategory(props.tutorial))
        
      });
    console.log(props.data)
    
    
      
    return (
        <Container>
            <Card sx={{ width: '100%', bgcolor: 'background.paper', mt:2 , p:2}}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
                <h1>{props.tutorial}</h1>
                <p>{description}</p>
                

                <Divider sx={{mb:2}}></Divider>
                {
                tutorials != undefined ? (
                   tutorials.map((x,i) => (
                        <Accordion expanded={expanded === 'panel'+i} onChange={handleChange('panel'+i)} key={i}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography><strong>{x['tutorial_name']}</strong></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                {                             
                                    x['tutorial_type'] == 'text' ? (
                                        <div dangerouslySetInnerHTML={{__html: x['content']}} />  
                                    ) : ''
                                }
                                {
                                    x['tutorial_type'] == 'video' ? (
                                        <div className='video-wrapper'>
                                                <iframe className='responsive-iframe' src={x['url']}></iframe>
                                        </div>
                                    ): ''   
                                }
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))):''
                }
        </Card>
      </Container>

    )

}