/*
     This component can be used for Admins and Receptionists

*/

import {useState, useEffect} from 'react'

//libs
import { DataGrid  } from '@material-ui/data-grid'
import { Grid, Button, Box, Hidden, Typography } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

//My imports
import service from '../../../service'
import { getToken } from '../../common/functions/general'
import Spinner from '../../common/spinner/Spinner'
import HrTittle from '../../common/hr/HrTittle'

//icons
import AddIcon from '@mui/icons-material/Add'
import Hr from '../../common/hr/Hr'
import NoMeetingRoomIcon from '@material-ui/icons/NoMeetingRoom'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import InfoIcon from '@material-ui/icons/Info'

//Button Edit
import EditIcon from '@material-ui/icons/Edit';

//Table actions (CRUD)
const renderEditButton = (params) => {
     const navigateTo = useNavigate();

     return (
         <strong>
             <Button
                 variant="text"
                 color="primary"
                 size="small"
                 style={{ marginLeft: 16 }}
                 onClick={() => {
                     navigateTo(`/form-rooms/${params.id}`)
                 }}
             >
                 <EditIcon />
             </Button>
         </strong>
     )
}

const renderInfoButton = (params) => {
     const navigateTo = useNavigate();

     return (
         <strong>
             <Button
                 variant="text"
                 color="primary"
                 size="small"
                 style={{ marginLeft: 16 }}
                 onClick={() => {
                     navigateTo(`/info-room/${params.id}`)
                 }}
             >
                 <InfoIcon />
             </Button>
         </strong>
     )
}

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
               
                    const url = `${developURL}/room/${params.id}`;
                    const data = { status }
               
                    const fetchConfig = {
                              method: 'PUT', 
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
                   { params.row.status === 'unvailable' && (<CheckCircleIcon />) }
                   { params.row.status === 'available' && (<NoMeetingRoomIcon />) }
              </Button>
          </strong>
      )
}


//Config DataGrid (Table) columns
const columnsMdUp = [
     {
       field: 'name',
       headerName: 'Name',
       width: 200,
     },
     {
       field: 'floor',
       headerName: 'Floor',
       width: 200,
     },
     {
       field: 'status',
       headerName: 'Status',
       width: 200,
     },
     {
          field: 'typeRoomName',
          headerName: 'Type',
          width: 200,
     },
     {
          headerName: '---',
          field: 'actions',
          width: 100,
          renderCell: renderEditButton,
          disableClickEventBubbling: true,
     },
     {
          headerName: '---',
          field: 'deletedAct',
          width: 100,
          renderCell: renderDeleteButton,
          disableClickEventBubbling: true,
     },
     {
          headerName: '---',
          field: 'infoAct',
          width: 100,
          renderCell: renderInfoButton,
          disableClickEventBubbling: true,
     }
];




const columnsMdDown = [
     {
          field: 'name',
          headerName: 'Name',
          width: 150,
        },
        {
          field: 'floor',
          headerName: 'Floor',
          width: 150,
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 150,
        },
        {
          headerName: '---',
          field: 'actions',
          width: 100,
          renderCell: renderEditButton,
          disableClickEventBubbling: true,
        },
        {
             headerName: '---',
             field: 'deletedAct',
             width: 100,
             renderCell: renderDeleteButton,
             disableClickEventBubbling: true,
        }
]

const RoomsDash = () => {
     const [rooms, setRooms] = useState([]);
     const [showSpinner, setShowSpinner] = useState(true);
     const navigateTo = useNavigate();

     const getRooms = async () => {
          const { developURL } = service;

          const url = `${developURL}/rooms`;
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

               const { result } = responseJSON;
               let arrayEnd = [];

               // This loop save the type of room of each room
               for (let index = 0; index < result.length; index++) {

                    if(result[index].idTypeRoom !== null){
                         const dataEnd = { ...result[index], typeRoomName: result[index].idTypeRoom.name }
                         arrayEnd = [...arrayEnd, dataEnd ];
                    }
                    
               }

               //request successfully
               setRooms( arrayEnd );
          } catch (error) {
               //Error

          }
     }

     useEffect(() => {
          getRooms();
     }, []);

     const updateTable = async (event) => {
          if(event.field === 'deletedAct'){
               setTimeout(() => {
                    getRooms();
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
                                                 Rooms
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
                                                onClick={ () => navigateTo('/form-rooms') }
                                                startIcon={<AddIcon />}
                                        >
                                             Room
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
                                    rows={rooms}
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
                                    rows={rooms}
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

export default RoomsDash