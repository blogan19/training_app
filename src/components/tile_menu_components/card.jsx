import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconDisplay from './icon';

export default function TileCard({title,icon,description, selectTile}) {
    return (
      <Card sx={{  height: '100%' }} onClick={() => selectTile({title})}>
        <CardActionArea sx={{  height: '100%'}}> 
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <IconDisplay icon={icon}/>
          </CardContent>
        </CardActionArea>
      </Card>

    )
}