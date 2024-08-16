// import { Box, Button, Checkbox, Container, Dialog, DialogContent, DialogTitle, FormControlLabel, TextField } from '@mui/material';
// import { DatePicker, TimePicker } from '@mui/x-date-pickers';
// import { useRef, useState } from 'react';

// const FormNonAvailability = (props) => {
// 	const { isDialogOpen, closeDialog, formSubmitHandler } = props;
// 	const [showTime, setShowTime] = useState(false);
// 	const formValue = useRef();
// 	const [isWholeDay, setIsWholeDay] = useState(false);
// 	return (
// 		<Dialog open={isDialogOpen} onClose={closeDialog} maxWidth={'sm'} fullWidth>
// 			<DialogTitle>Create Non-Availability Record</DialogTitle>
// 			<DialogContent>
// 				<form>
// 					<Box display="flex" flexDirection={'column'} gap={2} pt={1}>
// 						<TextField
// 							label="Name"
// 							fullWidth
// 							variant="outlined"
// 							// Add your form input fields here
// 							onChange={(event) => (formValue.current = event.target.value)}
// 						/>
// 						<DatePicker label="Start Date" />
// 						<DatePicker label="End Date" />
// 						{showTime && !isWholeDay && (
// 							<>
// 								<TimePicker ampm={false} label="Start Time" />
// 								<TimePicker ampm={false} label="End Time" />
// 							</>
// 						)}
// 						{!showTime && (
// 							<Button variant="outlined" onClick={() => setShowTime(true)}>
// 								Add Time
// 							</Button>
// 						)}
// 						{/* whole Day */}
// 						{showTime && (
// 							<FormControlLabel
// 								control={
// 									<Checkbox
// 										value={isWholeDay}
// 										onChange={(event) => {
// 											setIsWholeDay(event.target.checked);
// 										}}
// 									/>
// 								}
// 								label="All Day"
// 							/>
// 						)}
// 						<TextField
// 							label="Reason"
// 							fullWidth
// 							variant="outlined"
// 							// Add your form input fields here
// 							onChange={(event) => (formValue.current = event.target.value)}
// 						/>
// 					</Box>
// 					<Box display="flex" columnGap={2} mt={2}>
// 						<Button variant="contained" color="primary" onClick={() => formSubmitHandler(formValue.current)}>
// 							Save
// 						</Button>
// 						<Button variant="contained" color="error" onClick={() => closeDialog()}>
// 							Cancel
// 						</Button>
// 					</Box>
// 				</form>
// 			</DialogContent>
// 		</Dialog>
// 	);
// };

// export default FormNonAvailability;
