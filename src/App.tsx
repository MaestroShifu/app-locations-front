import { Dialog, DialogTitle, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LocationForm } from './components/location-form/location-form';
import LocationsTable from './components/location-table/locations-table';
import { locationService, ILocation } from './service/location-api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    font-size: 3rem;
    font-weight: bold;
    color: blueviolet;
    margin: 1rem;
  }
  .table {
    width: 50vw;
  }
`;

interface ILocationSubmit {
  name: string;
  area_m2: number;
  parent_id: string;
};

const App: React.FunctionComponent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [location, setLocation] = useState<ILocation | undefined>(undefined);
  const [locations, setLocations] = useState<ILocation[]>([]);
  
  useEffect(() => {
    loadLocations()
  }, []);

  const loadLocations = async() => {
    try {
      const data = await locationService.getLocations();
      setLocations([...data]);
    } catch (error) {
      alert(error.message);
    }
  }

  const createLocations = async(args: ILocationSubmit) => {
    try {
      const data = await locationService.postLocations({
        name: args.name,
        area_m2: args.area_m2,
        location_parent_id: args.parent_id === 'none' ? null : args.parent_id 
      });
      const dataLocations = [...locations];
      if(!data.location_parent_id) {
        dataLocations.push(data);
      } else {
        const index = dataLocations.findIndex(location => location.id === args.parent_id);
        if(!dataLocations[index].internalLocations) {
          dataLocations[index].internalLocations = [];
        }
        dataLocations[index].internalLocations?.push(data);
      }
      setLocations([...dataLocations]);
      alert('Create succesfull');
    } catch (error) {
      alert(error);
    }
  }

  const deleteLocations = async(id: string) => {
    try {
      await locationService.deleteLocations(id);
      const data = locations.filter(location => location.id !== id);
      setLocations([...data]);
      alert('Delete succesfull');
    } catch (error) {
      alert(error.message);
    }
  }

  const selectLocations = (index: number) => {
    setLocation(locations[index]);
    handleClickOpen();
  }

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <Container>
      <Typography className='title' variant='h1' component='span'>
        Locations App
      </Typography>
      <LocationsTable isView={true} className='table' locations={locations} deleteAction={deleteLocations} viewAction={selectLocations} />
      <LocationForm locations={locations} submit={createLocations} />

      <Dialog onClose={handleClickOpen} aria-labelledby='modal sub locations' open={open}>
        <DialogTitle>Internal Locations</DialogTitle>
        <LocationsTable isView={false} className='table' locations={location?.internalLocations || []} deleteAction={deleteLocations} viewAction={selectLocations} />
      </Dialog>
    </Container>
  );
}

export default App;