import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const DeletePopup = ({item,confirmDeleteHandler,cancelDeleteHandler}) => {
  return (
    <div className="popup">
        <div className='popup-box'>
      <Box
      sx={{
        maxWidth:"500px",
        margin:'0 auto',
        background:"#fff",
        padding:5,
        borderRadius:'10px',
        marginTop:'0px'
        }}>
        <Typography sx={{textAlign:'center'}} variant="h5" className='mb-3'>
            you are sure you want to delete <strong><i>{item.name}</i></strong>?
        </Typography>
        <div className='d-flex justify-content-end'>
            <Button sx={{padding:'10px', marginRight:'15px'}}  onClick={cancelDeleteHandler} variant='outlined'>Cancel</Button>
        <Button  sx={{padding:'10px'}} className='prim-btn' onClick={confirmDeleteHandler}>Delete</Button>
        </div>
        </Box>
    </div>
    </div>
    
  )
}

export default DeletePopup
