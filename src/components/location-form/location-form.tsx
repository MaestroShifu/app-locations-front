
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ILocation } from '../../service/location-api';

interface ILocationFormInput {
    name: string;
    area_m2: number;
    parent_id: string;
};

interface ILocationForm {
    locations: ILocation[];
    submit: (args: ILocationFormInput) => void;
}

const Container = styled.div`
    margin: 1rem;
    form {
        display: flex;
        align-items: baseline;
        .input {
            margin: 0.5rem;
            width: 10rem;
        }
    }
`; 

export const LocationForm: React.FunctionComponent<ILocationForm> = (props) => {
    const { control, handleSubmit, reset } = useForm<ILocationFormInput>({
        defaultValues: {
            name: '',
            area_m2: 0,
            parent_id: 'none'
        }
    });

    const onSubmit = (data: ILocationFormInput) => {
        props.submit(data);
        reset();
    };

    const selectOptions = props.locations.map(location => {
        return (
            <MenuItem key={location.id} value={location.id}>{location.name}</MenuItem>
        );
    });

    return (
        <Container>
            <Typography variant='body1' component='span'>
                Create location:
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* NAME */}
                <Controller
                    as={TextField}
                    control={control}
                    label='Name:'
                    name='name'
                    placeholder='Name location'
                    type='text'
                    className='input'
                />
                {/* AREA */}
                <Controller
                    as={TextField}
                    control={control}
                    label='Area m2:'
                    name='area_m2'
                    placeholder='Area location'
                    type='text'
                    className='input'
                />
                {/* Parent location */}
                <FormControl className='input'>
                    <InputLabel>Parent locations:</InputLabel>
                        <Controller
                            as={    
                                <Select>
                                    <MenuItem value={'none'}>None</MenuItem>
                                    { selectOptions }
                                </Select>
                            }
                            control={control}
                            name='parent_id'
                        />
                </FormControl>
                <Button type='submit' variant='contained'>SAVE</Button>
            </form>
        </Container>
    );
}