import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Alert, Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { get, getDatabase, onValue, ref, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase';
import DeleteIcon from '@mui/icons-material/Delete';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function FirebaseTestConnect() {
    console.log('firebase2', firebase.firestore());


    const [fName, setFName] = React.useState("");
    const [lName, setLName] = React.useState("");
    const [data, listData] = React.useState([]);
    const [itemSelect, setItemSelect] = React.useState(undefined);

    const [open, setOpen] = React.useState(false);
    const handleOpen = (id) => {
        if (id) {
            setItemSelect(id);
        }
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    React.useEffect(() => {
        const db = getDatabase();
        const starCountRef = ref(db, 'UserTyping/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            // tranfer data here
            const temp = []
            for (let id in data) {
                temp.push({
                    id: id,
                    firstName: data[id].firstName,
                    lastName: data[id].lastName,
                })
            }
            listData(temp);
        });

    }, [])

    // use Firebase insert data
    const handleAdd = () => {
        const db = getDatabase();
        set(ref(db, 'UserTyping/' + uuidv4()), {
            firstName: fName,
            lastName: lName
        });
        setFName("");
        setLName("");
    }

    const handleDelete = () => {
        if (itemSelect) {
            // delete here 
            // debugger
            // const db = getDatabase();
            // const ref1 = ref(db, '/UserTyping/' + itemSelect).remove();
            // console.log(ref1);

        }
    }

    console.log('$itemSelect', itemSelect);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Item>Add user</Item>

                    <Grid item xs={6} sx={{ py: '1rem' }}>
                        <TextField onChange={(e) => setFName(e.target.value)} name="fName" value={fName} id="outlined-firstName" label="firstName" variant="outlined" />
                    </Grid>

                    <Grid item xs={6} sx={{ py: '1rem' }}>
                        <TextField onChange={(e) => setLName(e.target.value)} name="lName" value={lName} id="outlined-lastName" label="lastName" variant="outlined" />
                    </Grid>

                    <Button variant="contained" onClick={() => handleAdd()}>Submit</Button>
                </Grid>

                <Grid item xs={8}>
                    <Item>List User</Item>  
                    <Grid item xs={12} sx={{ py: '1rem' }}>
                        {
                            data.length === 0 ? <Alert severity="warning">No data here — check it out!</Alert>

                                : <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">stt</TableCell>
                                                <TableCell align="center">First Name</TableCell>
                                                <TableCell align="center">Last Name</TableCell>
                                                <TableCell align="center">Action</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {data.map((item, index) => (
                                                <TableRow
                                                    key={item.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center">
                                                        {index}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.firstName}
                                                    </TableCell>
                                                    <TableCell align="center">{item.lastName}</TableCell>
                                                    <TableCell align="center">
                                                        <DeleteIcon onClick={() => handleOpen(item.id)} sx={{ cursor: 'pointer' }} color='primary' />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                        }
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid item xs={8}>
                    <Item>xs=8</Item>
                </Grid>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete Item
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure want to delete item ?
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <Button variant="contained" onClick={handleClose}>Cancel</Button>
                        </Grid>
                        <Grid item xs={6} sx={{ display: 'flex', justifyContent: "end" }}>
                            <Button variant="contained" onClick={() => handleDelete()}>Delete</Button>
                        </Grid>
                    </Grid>

                </Box>
            </Modal>
        </Box>
    )
}