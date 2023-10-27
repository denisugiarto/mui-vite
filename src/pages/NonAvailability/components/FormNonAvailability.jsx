import { Box, Button, Checkbox, Container, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { useRef } from 'react';

const FormNonAvailability = (props) => {
	const { isDialogOpen, closeDialog, formSubmitHandler } = props;
	const formValue = useRef();
	return (
		<Dialog open={isDialogOpen} onClose={closeDialog} maxWidth={'lg'}>
			<DialogTitle>Create Non-Availability Record</DialogTitle>
			<DialogContent>
				<form>
					<Box display="flex" flexDirection={'column'} gap={1} pt={1}>
						<TextField
							label="Name"
							fullWidth
							variant="outlined"
							// Add your form input fields here
							onChange={(event) => (formValue.current = event.target.value)}
						/>
						<DatePicker />
						<DatePicker />
						<TimePicker ampm={false} />
						<TimePicker ampm={false} />
						<Button variant="outlined">Add Time</Button>
						{/* whole Day */}
						<label style={{ cursor: 'pointer' }}>
							Whole Day
							<Checkbox />
						</label>
						<TextField
							label="Reason"
							fullWidth
							variant="outlined"
							// Add your form input fields here
							onChange={(event) => (formValue.current = event.target.value)}
						/>
					</Box>
					<Box display="flex" columnGap={2} mt={2}>
						<Button variant="contained" color="primary" onClick={() => formSubmitHandler(formValue.current)}>
							Save
						</Button>
						<Button variant="contained" color="error" onClick={() => closeDialog()}>
							Cancel
						</Button>
					</Box>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default FormNonAvailability;
