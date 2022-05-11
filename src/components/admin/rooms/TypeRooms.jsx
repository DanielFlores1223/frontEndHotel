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
import { useSnackbar } from 'notistack'

//icons
import AddIcon from '@mui/icons-material/Add'
import Hr from '../../common/hr/Hr'
import DeleteIcon from '@mui/icons-material/Delete'

//CRUD Actions
const renderDeleteButton = (params) => {
     const { enqueueSnackbar }  = useSnackbar();
     const navigateTo = useNavigate();
     return (
          <strong>
              <Button
                  variant="text"
                  color="primary"
                  size="small"
                  style={{ marginLeft: 16 }}
                  onClick={async () => {
                    console.log(params.row.status);
                    let status = '';
                    
                    if (params.row.status === 'unvailable') {
                         status='available'
                    }else{
                         status='unvailable'
                    }

                    const { developURL } = service;
               
                    const url = `${developURL}/typeRoom/${params.id}`;
                    const data = { status }
               
                    const fetchConfig = {
                              method: 'DELETE', 
                              headers: { 'Content-Type': 'application/json', 'Authorization': getToken() },
                              body: JSON.stringify(data)
                         }
               
                    try {
                         
                         const response = await fetch( url, fetchConfig );
                         const responseJSON = await response.json();
               
                         console.log(responseJSON)
                         if (!responseJSON.success) {
                              enqueueSnackbar( responseJSON.msg , { variant: 'error', } );
                             return;
                           }
               
                           navigateTo('/rooms');
                           enqueueSnackbar( responseJSON.msg , { variant: 'success', } );
                    } catch (error) {
                         //Error
                         enqueueSnackbar( responseJSON.msg , { variant: 'something went wrong... Try again later', } );
                    }
                  }}
              >
                   <DeleteIcon />
              </Button>
          </strong>
      )
}

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
       width: 350,
     },
     {
       field: 'price',
       headerName: 'Price',
       type: 'number',
       width: 200,
     },
     {
          headerName: '---',
          field: 'deletedAct',
          width: 100,
          renderCell: renderDeleteButton,
          disableClickEventBubbling: true,
     }
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

     const updateTable = async (event) => {
          if(event.field === 'deletedAct'){
               setTimeout(() => {
                    getTypeRooms();
               },1000)
               
           }
     }

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
                                    onCellClick={ (e) => updateTable(e) }
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
                                    onCellClick={ (e) => updateTable(e) }
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