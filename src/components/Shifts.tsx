import { useEffect, useState } from "react"
import add_shift from "../assets/images/add_shift.svg"
import "../assets/styles/shifts.css"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormLabel,Grid,IconButton,Menu,MenuItem,Stack, Switch, TextField } from "@mui/material"
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs"
import { MoreVert as MoreVertIcon } from '@mui/icons-material';


interface shift {
    shiftName: string;
    shiftDesc: string;
    startTime: string | null;
    endTime: string | null;
    isActive: boolean;
}


export const Shifts = () => {
    const [shifts, setShifts] = useState<shift[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [shiftName, setShiftName] = useState("")
    const [shiftDesc, setShiftDesc] = useState("")
    const [startTime, setStartTime] = useState<any | null>(null)
    const [endTime, setEndTime] = useState<any | null>(null)    
    const [isActive, setIsActive] = useState(true)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    
    useEffect(() => {
        console.log(shifts)
    }, [shifts])

    const handleClickAdd = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleModalSubmit = () => {
        const newShift:shift = {
            shiftName,
            shiftDesc,
            startTime : startTime ? dayjs(startTime).format('hh:mm A') : null,
            endTime : endTime ? dayjs(endTime).format("hh:mm A") : null,
            isActive
        }

        setShifts((prevState) => [...prevState, newShift])


        setShiftName("")
        setShiftDesc("")
        setStartTime(null)
        setEndTime(null)
        setIsActive(true)

        closeModal()
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return(
        <div>
            {
                        !shifts.length ? 
                            <div className="shift-card">
                            <Grid  container  spacing={2}>

                                <Grid item lg={3}>
                                    <div className="shift-name">
                                        <h3>Shift Name</h3>
                                    </div>
                                </Grid>

                                <Grid item lg={6}>
                                    <div className="shift-timing">
                                        <div>
                                            Start Time
                                            <p>06:00 AM</p>
                                        </div>
                                        <div>
                                            End Time
                                            <p>10:00 AM</p>
                                        </div>
                                    </div>
                                </Grid>

                                <Grid item lg={2} >
                                <div className="shift-actions">
                                    <Button variant="contained">Edit</Button>
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem >Activate</MenuItem>
                                        <MenuItem >Delete</MenuItem>
                                    </Menu>
                                </div>
                                </Grid>

                                </Grid>
                            </div>
                        :
                        <div className="no-shifts-wrap">
                            <div className="no-shifts">
                                <img src={add_shift} alt="no shifts" onClick={handleClickAdd} />
                                <p>Looks like you didn't add any shifts yet!</p>
                            </div>
                        </div>
            }
            <Dialog open={isModalOpen} onClose={closeModal} className="modal" disableEnforceFocus fullWidth>
                <DialogTitle textAlign={"center"} variant="h5">Add Shift</DialogTitle>
                <br />
                <DialogContent>
                    <Stack>
                        <TextField variant="outlined" label="Shift Name" value={shiftName} onChange={(e) => setShiftName(e.target.value)}></TextField>
                        <br />
                        <TextField variant="outlined" label="Shift Description" value={shiftDesc} onChange={(e) => setShiftDesc(e.target.value)}></TextField>
                        <br />
                        <FormLabel><b>Shift Timing</b></FormLabel>
                        <br />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker label="Start Time" value={startTime} onChange={(val) => setStartTime(val)} />
                            <br />
                            <TimePicker label="End Time" value={endTime} onChange={(val) => setEndTime(val)} />
                        </LocalizationProvider>
                        <br />
                        <FormLabel>
                            <b>Status</b>
                            <Switch aria-label="Active" value={isActive} defaultChecked onChange={(e) => setIsActive(e.target.checked)} /> 
                            <b>Active</b>    
                        </FormLabel>
                        <br />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="contained" onClick={handleModalSubmit} >Add</Button>
                    <Button onClick={closeModal} color="error" variant="contained">Close</Button>
                </DialogActions>
            </Dialog>
        </div>



    )

}