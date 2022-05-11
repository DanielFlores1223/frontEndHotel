import React from 'react'

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
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled'

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

const renderInfoButton = (params , status) => {
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
                    
                    if (params.row.status) {
                         status= false
                    }else{
                         status= true
                    }

                    const { developURL } = service;
               
                    const url = `${developURL}/user/${params.id}`;
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
          
                           enqueueSnackbar( responseJSON.msg , { variant: 'success', } );
                    } catch (error) {
                         //Error
                         enqueueSnackbar( responseJSON.msg , { variant: 'something went wrong... Try again later', } );
                    }
                  }}
              >
                  { params.row.status && (<CheckCircleIcon />) }
                   { !params.row.status && (<PersonAddDisabledIcon />) }
              </Button>
          </strong>
      )
}

//Config DataGrid (Table) columns
const columnsMdUp = [
     {
       field: 'name',
       headerName: 'Name',
       width: 170,
     },
     {
       field: 'lastName',
       headerName: 'Last Name',
       width: 170,
     },
     {
       field: 'role',
       headerName: 'Role',
       width: 170,
     },
     {
          field: 'email',
          headerName: 'Email',
          width: 170,
     },
     {
          field: 'status',
          headerName: '',
          width: -1,
          visible: false
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
          width: 115,
        },
        {
          field: 'lastName',
          headerName: 'Last Name',
          width: 115,
        },
        {
          field: 'role',
          headerName: 'Role',
          width: 115,
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
          field: 'actions',
          width: 100,
          renderCell: renderEditButton,
          disableClickEventBubbling: true,
        },

        {
          headerName: '---',
          field: 'infoAct',
          width: 100,
          renderCell: renderInfoButton,
          disableClickEventBubbling: true,
     }
]

const Employees = () => {
     const [employees, setEmployees] = useState([]);
     const [showSpinner, setShowSpinner] = useState(true);
     const navigateTo = useNavigate();

     const getEmployees = async () => {
          const { developURL } = service;

          const url = `${developURL}/user/searchFilterOr`;
          const data = { filter1: 'role', value1: 'Receptionist', filter2: 'role', value2: 'Admin' };
          const fetchConfig = {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json', 'Authorization': getToken() },
                    body: JSON.stringify( data )
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
               setEmployees( responseJSON.result );
          } catch (error) {
               //Error

          }
     }

     useEffect(() => {
          getEmployees();
     }, []);

     // This function reload this table
     const updateTable = async (event) => {
          if(event.field === 'deletedAct'){
               setTimeout(() => {
                    getEmployees();
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
                                       Employees
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
                                   Employee
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
                          rows={employees}
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
                          rows={employees}
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

export default Employees