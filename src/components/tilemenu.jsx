import { useState,useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TileCard from './tile_menu_components/card';

export default function TileMenu(categories) {
  
  const [tile, setTile] = useState("")

  const selectTile = (tileName) => {
    setTile(tileName)
    
  }
  useEffect(() => {
    categories.selectTile(tile)
  },[tile]);
  

  return (
    <Container sx={{mt:3}}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
            {categories['data']['data'].map((x,index) => (
              <Grid xs={2} sm={4} md={4} key={index}>
                <TileCard title={x['chapter']} icon={x['icon']} description={x['description']} selectTile={selectTile}></TileCard>
              </Grid> 
            ))}
          </Grid>
        </Box>
    </Container>
  );



  
}