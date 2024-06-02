import React, { ChangeEvent, useState } from "react";
import {
  DialogActions,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  TextField,
  FormLabel,
  FormGroup,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { format } from "date-fns";
import { TimePicker } from "@mui/x-date-pickers";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FormData {
  eventTitle: string;
  description: string;
  participants: Number;
  date: Dayjs | null;
  time: Dayjs | null;
  duration: Number;
  sessionNotes: string;
}
interface FormErrors {
  eventTitle?: string;
  description?: string;
  participants?: string;
  date?: string;
  time?: string;
  duration?: string;
  sessionNotes?: string;
}

const CreateEvent = () => {
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const [eventData, setEventData] = useState<FormData>({
    eventTitle: "",
    description: "",
    participants: 2,
    date: null,
    time: null,
    duration: 1,
    sessionNotes: "",
  });

  const handleEventFormDataChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setEventData(() => {
      return { ...eventData, [name]: value };
    });
  };
  const handleDateChange = (date: Dayjs | null) => {
    setEventData((prevData) => ({ ...prevData, date }));
  };

  const handleTimeChange = (time: Dayjs | null) => {
    setEventData((prevData) => ({ ...prevData, time }));
  };

  //  Validation
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!eventData.eventTitle) newErrors.eventTitle = "Event title is required";
    if (!eventData.description)
      newErrors.description = "Description is required";
    if (!eventData.participants)
      newErrors.participants = "Participants are required";
    if (!eventData.date) newErrors.date = "Date is required";
    if (!eventData.time) newErrors.time = "Time is required";
    if (!eventData.duration) newErrors.duration = "Duration is required";
    if (!eventData.sessionNotes)
      newErrors.sessionNotes = "Session notes are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEventCreate = async () => {
    if (validate()) {
      const formattedDate = eventData.date
        ? format(eventData.date.toDate(), "yyyy-MM-dd")
        : "";
      const formattedTime = eventData.time
        ? format(eventData.time.toDate(), "HH:mm")
        : "";

      const eventDataFromUser = {
        ...eventData,
        date: formattedDate,
        time: formattedTime,
      };

      // POST Api Call

      console.log(eventDataFromUser, eventDataFromUser);
      setEventData({
        eventTitle: "",
        description: "",
        participants: 2,
        date: null,
        time: null,
        duration: 1,
        sessionNotes: "",
      });
      handleCloseDialog();

      toast.success("Event created successfully!");
    }
  };
  return (
    <>
      <Stack justifyContent="center" alignItems="center">
        <Button variant="contained" color="warning" onClick={handleOpenDialog}>
          Create Event
        </Button>
        <Dialog
          maxWidth="lg"
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDialog}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle align="center">Please Create an Event</DialogTitle>
          <DialogContent sx={{ width: "700px" }}>
            <Stack spacing={2}>
              <FormGroup>
                <FormLabel>Title :</FormLabel>
                <TextField
                  autoFocus
                  required
                  id="eventTitle"
                  name="eventTitle"
                  type="text"
                  placeholder="Event Title"
                  autoComplete="off"
                  value={eventData.eventTitle}
                  onChange={(event: any) => handleEventFormDataChange(event)}
                  error={!!errors.eventTitle}
                  helperText={errors.eventTitle}
                  fullWidth
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    backgroundColor: "#F5F6FA",
                    "& fieldset": { border: "none", outline: "none" },
                    mt: 1,
                  }}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Description :</FormLabel>
                <TextField
                  autoFocus
                  required
                  rows={5}
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Event Description"
                  autoComplete="off"
                  value={eventData.description}
                  onChange={(event: any) => handleEventFormDataChange(event)}
                  error={!!errors.description}
                  helperText={errors.description}
                  fullWidth
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    backgroundColor: "#F5F6FA",
                    "& fieldset": { border: "none", outline: "none" },
                    mt: 1,
                  }}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>List of participants :</FormLabel>
                <TextField
                  autoFocus
                  required
                  id="participants"
                  name="participants"
                  type="number"
                  placeholder="Event Description"
                  autoComplete="off"
                  value={eventData.participants}
                  onChange={(event: any) => handleEventFormDataChange(event)}
                  error={!!errors.participants}
                  helperText={errors.participants}
                  fullWidth
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    backgroundColor: "#F5F6FA",
                    "& fieldset": { border: "none", outline: "none" },
                    mt: 1,
                  }}
                />
              </FormGroup>
              <Stack direction={{ sm: "row" }} spacing={1}>
                <FormGroup>
                  <FormLabel>Date :</FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      onChange={handleDateChange}
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        backgroundColor: "#F5F6FA",
                        "& fieldset": { border: "none", outline: "none" },
                        mt: 1,
                      }}
                    />
                  </LocalizationProvider>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Time :</FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      onChange={handleTimeChange}
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        backgroundColor: "#F5F6FA",
                        "& fieldset": { border: "none", outline: "none" },
                        mt: 1,
                      }}
                    />
                  </LocalizationProvider>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Duration(hrs) :</FormLabel>
                  <TextField
                    autoFocus
                    required
                    id="duration"
                    name="duration"
                    type="number"
                    placeholder="Event Description"
                    autoComplete="off"
                    value={eventData.duration}
                    onChange={(event: any) => handleEventFormDataChange(event)}
                    error={!!errors.duration}
                    helperText={errors.duration}
                    fullWidth
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      backgroundColor: "#F5F6FA",
                      "& fieldset": { border: "none", outline: "none" },
                      mt: 1,
                    }}
                  />
                </FormGroup>
              </Stack>
              <FormGroup>
                <FormLabel>Session Notes :</FormLabel>
                <TextField
                  multiline
                  autoFocus
                  required
                  id="sessionNotes"
                  name="sessionNotes"
                  type="text"
                  rows={3}
                  placeholder="Session Notes"
                  autoComplete="off"
                  value={eventData.sessionNotes}
                  onChange={(event: any) => handleEventFormDataChange(event)}
                  error={!!errors.sessionNotes}
                  helperText={errors.sessionNotes}
                  fullWidth
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    backgroundColor: "#F5F6FA",
                    "& fieldset": { border: "none", outline: "none" },
                    mt: 1,
                  }}
                />
              </FormGroup>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleEventCreate}
              type="submit"
              variant="contained"
              color="info"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </>
  );
};

export default CreateEvent;
