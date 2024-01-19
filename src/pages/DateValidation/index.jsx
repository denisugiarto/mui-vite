import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useMinimumNotice } from '../../hooks/useMinimumNotice';

export default function DateValidation() {
	const [submitValue, setSubmitValue] = useState();
	const {
		register,
		handleSubmit,
		setError,
		trigger,
		control,
		getValues,
		watch,
		formState: { errors },
	} = useForm({ mode: 'onChange' });

	const onSubmit = (data) => {
		console.log('🚀 ~ onSubmit ~ data:', data);
		console.log(data);
		setSubmitValue(data);
	};
	const numberValue = watch('numberValue');
	const dateValue = watch('date');

	function addError() {
		setError('username', {
			type: 'manual',
			message: 'Dont Forget Your Username Should Be Cool!',
		});
		console.log(errors);
	}

	useEffect(() => {
		if (dateValue) {
			trigger('date');
		}
	}, [numberValue, dateValue]);

	const [minNotice, minimumDateTimeSRT] = useMinimumNotice();

	return (
		<div>
			<pre>errors: {JSON.stringify(errors, null, 2)}</pre>
			<p>numberValue: {numberValue}</p>
			<p>dateValue: {dayjs().add(numberValue, 'day').format('YYYY-MM-DD')}</p>
			<p>dateValue: {dayjs(dateValue).isAfter(dayjs().add(numberValue, 'day'))}</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					name="numberValue"
					rules={{ required: true, validate: (data) => data >= 2 || 'value must more than 2' }}
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<input
							type="number"
							onChange={(e) => {
								onChange(e);
							}}
							selected={value}
							defaultValue={0}
						/>
					)}
				/>
				<Controller
					control={control}
					name="date"
					rules={{
						required: true,
						validate: (data) => dayjs(data).isAfter(dayjs().add(getValues('numberValue'), 'day')) || `value must after ${numberValue} day`,
					}}
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<input
							defaultValue={0}
							type="date"
							onChange={onChange} // send value to hook form
							onBlur={onBlur} // notify when input is touched/blur
							selected={value}
						/>
					)}
				/>
				<input type="submit" />
			</form>
			<pre>Submit: {JSON.stringify(submitValue, null, 2)}</pre>
		</div>
	);
}
