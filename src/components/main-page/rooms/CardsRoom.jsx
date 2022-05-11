import {useState, useEffect, useRef} from 'react'

//Libs
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles'
import { Grid, 
         Button, 
         Box, 
         Hidden, 
         Typography, 
         Card, 
         CardActionArea,
         CardActions,
         CardContent,
         CardMedia,
         IconButton,
         Collapse    } from '@material-ui/core'

//My imports
import service from '../../../service'
import { generateIdUnique } from '../../common/functions/general'
import Spinner from '../../common/spinner/Spinner'
import HrTittle from '../../common/hr/HrTittle'

//Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PeopleIcon from '@material-ui/icons/People'
import PaidIcon from '@mui/icons-material/Paid'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  expand: {
     transform: 'rotate(0deg)',
     marginLeft: 'auto',
     transition: theme.transitions.create('transform', {
       duration: theme.transitions.duration.shortest,
     }),
   },
   expandOpen: {
     transform: 'rotate(180deg)',
   },
}));

const CardsRoom = ({ tittle, 
                     textSecondary, 
                     urlImgs, 
                     guests, 
                     price, 
                     setTypeRoomSelected, 
                     idRoom, 
                     setNameTRSelected,
                     setErrorTR }) => {

     const classes = useStyles();
     const [expanded, setExpanded] = useState(false);
     const [ imgUrl, setImgUrl ] = useState('');
     const [ textDescription, setTextDescription ] = useState('');
     const interval = useRef(null);

     const handleExpandClick = () => {
          setExpanded(!expanded);
     };


     useEffect(() => {

          /*
               This code is for update the images about the type of room every 4 minutes.
          
          */
               const n = Math.floor(Math.random() * urlImgs.length)
               const url1 = urlImgs[n].substring(8)
               const url2 = `uploads/${url1}`
               setImgUrl(`${service.developImgURL}/${url2}`);

               //Keeping the reference of interval
               interval.current = setInterval(()=> {
                    const n = Math.floor(Math.random() * urlImgs.length)
                    const url1 = urlImgs[n].substring(8)
                    const url2 = `uploads/${url1}`
                    setImgUrl(`${service.developImgURL}/${url2}`)
               }, 4000);

               const textD1 = textSecondary.substring(0, 100);
               const textD2 = `${textD1}...`
               setTextDescription(textD2)

               //Clean the reference interval for prevent a warning
               return () => {
                    clearInterval(interval.current);
               };
     }, [])

     return (
       <Card className={classes.root}>
            <CardActionArea onClick={(e) => { setTypeRoomSelected(idRoom); 
                                              setNameTRSelected(tittle);  
                                              setErrorTR(false);
                                             }
                                    } 
            >
                {
                     imgUrl ? (
                         <CardMedia
                           className={classes.media}
                           image={`${imgUrl}`}
                           title={imgUrl}
                         />
                     ) : (<Spinner />)
                }
                
                    <CardContent>
                         <Typography gutterBottom variant="h5" component="h2">
                           { tittle }
                         </Typography>
                         <Typography variant="body2" color="textSecondary" component="p">
                           {textDescription}
                         </Typography>
                    </CardContent>
            </CardActionArea>
            <CardActions>
               <Grid container spacing={3}>
                    <Grid container alignItems='center' item xs={3}>
                         <Grid item xs={6}>
                              <PeopleIcon />
                         </Grid>
                         <Grid item xs={6}>
                              <Typography variant="body1"  >
                                        { guests }
                               </Typography>
                         </Grid>
                    </Grid>
                    <Grid container alignItems='center' item xs={3}>
                         <Grid item xs={6}>
                              <PaidIcon />
                         </Grid>
                         <Grid item xs={6}>
                              <Typography variant="body1"  >
                                   { price }
                               </Typography>
                         </Grid>
                    </Grid>
               </Grid>
              <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                    <ExpandMoreIcon />
               </IconButton>
            </CardActions>

          {/* EXPANSION */}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
               <CardContent>
                 <Typography paragraph>Details:</Typography>
                 <Typography variant="body2" color="textSecondary" component="p" paragraph>
                      { textSecondary }
                 </Typography>
               </CardContent>
          </Collapse>
      </Card>
     )
}

export default CardsRoom