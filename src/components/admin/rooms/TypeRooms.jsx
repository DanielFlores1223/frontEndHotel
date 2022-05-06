import {useState, useEffect} from 'react'

//libs
import { DataGrid } from '@material-ui/data-grid'
import { Grid, Button, Box, Hidden, Typography } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'

//My imports
import service from '../../../service'
import { getToken } from '../../common/functions/general'
import Spinner from '../../common/spinner/Spinner'
import HrTittle from '../../common/hr/HrTittle'

//icons
import AddIcon from '@mui/icons-material/Add'
import Hr from '../../common/hr/Hr'

const columnsMdUp = [
     {
       field: 'name',
       headerName: 'Type Room Name',
       width: 200,
     },
     {
          field: 'guests',
          headerName: 'Number of guests',
          width: 200,
     },
     {
       field: 'features',
       headerName: 'Features',
       width: 500,
     },
     {
       field: 'price',
       headerName: 'Price',
       type: 'number',
       width: 200,
     },
];

const columnsMdDown = [
        {
          field: 'name',
          headerName: 'Type Room Name',
          width: 100,
        },
        {
          field: 'guests',
          headerName: 'Number of guests',
          width: 100,
        },
        {
          field: 'features',
          headerName: 'Features',
          width: 100,
        },
        {
          field: 'price',
          headerName: 'Price',
          type: 'number',
          width: 100,
        },
]
   

const TypeRooms = () => {

     const [typeRooms, setTypeRooms] = useState([]);
     const [showSpinner, setShowSpinner] = useState(true);
     const navigateTo = useNavigate();

     const getTypeRooms = async () => {
          const { developURL } = service;

          const url = `${developURL}/typeRooms`;
          const fetchConfig = {
                    method: 'GET', 
                    headers: { 'Content-Type': 'application/json', 'Authorization': getToken() }
               }

          try {
               
               setShowSpinner(true);
               const response = await fetch( url, fetchConfig );
               const responseJSON = await response.json();
               setShowSpinner(false);

               if (!responseJSON.success) {
                    //Error
                    return;
               }

               //request successfully
               setTypeRooms( responseJSON.result );
          } catch (error) {
               //Error
               
          }
     }

     useEffect(() => {
          getTypeRooms();
     }, []);

     return (

          <>
               { !showSpinner ? (
                    <>
                         {/* HEADER SECTION */}
                         <Box mb={3}>
                              <Grid container 
                                    spacing={2}
                                    justifyContent='space-between'
                              >
                                   <Grid item 
                                         xs={12} 
                                         md={6}
                                   >
                                        <Grid container justifyContent='flex-start' alignItems='flex-end' >
                                             <HrTittle />
                                             <Typography variant='h5'>
                                                 Type Of Rooms
                                             </Typography>
                                        </Grid>
                                   </Grid>
                                   
                                   <Grid container 
                                         justifyContent='flex-end' 
                                         item 
                                         xs={12} 
                                         md={6}
                                   >
                                        <Button color='primary' 
                                                variant='text'
                                                onClick={ () => navigateTo('/form-type-rooms') }
                                                startIcon={<AddIcon />}
                                        >
                                             Type Room
                                        </Button>
                                   </Grid>
                              </Grid>

                              <Grid container 
                                    spacing={2}
                                    justifyContent='space-between'
                              >
                                   <Grid item 
                                         xs={12} 
                                   >
                                        <Hr />
                                   </Grid>
                              </Grid>
                         </Box>
                         {/* TABLE RESPONSIVE */}
                         <Hidden smDown>
                              <div style={{ height: 300, width: '100%' }}>
                                  <DataGrid
                                    rows={typeRooms}
                                    getRowId ={(row) => row._id}
                                    columns={columnsMdUp}
                                    pageSize={3}
                                    rowsPerPageOptions={[3]}
                                    disableSelectionOnClick
                                  />
                              </div>
                         </Hidden>
                         <Hidden mdUp>
                              <div style={{ height: 300, width: '100%' }}>
                                  <DataGrid
                                    rows={typeRooms}
                                    getRowId ={(row) => row._id}
                                    columns={columnsMdDown}
                                    pageSize={3}
                                    rowsPerPageOptions={[3]}
                                    disableSelectionOnClick
                                  />
                              </div>
                         </Hidden>
                    </>
               ) : (
                    <Spinner />
               ) }
                
          </>
       
     )
}

export default TypeRooms