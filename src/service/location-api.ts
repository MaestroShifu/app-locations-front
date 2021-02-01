import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:4000/'
});

export interface ILocation {
    id?: string;
    name: string;
    area_m2: number;
    location_parent_id: string | null;
    internalLocations?: ILocation[];
}

const getLocations = async (): Promise<ILocation[]> => {
    const request = await http.get(`locations`);
    return request.data as ILocation[];
}

const postLocations = async (args: ILocation): Promise<ILocation> => {
    const request = await http.post(`locations`, args);
    return request.data as ILocation;
}

const putLocations = async (id: string, args: ILocation): Promise<ILocation> => {
    const request = await http.put(`locations/${id}`, args);
    return request.data as ILocation;
}

const deleteLocations = async (id: string): Promise<boolean> => {
    const request = await http.delete(`locations/${id}`);
    return request.data as boolean;
}

export const locationService = {
    getLocations,
    postLocations,
    putLocations,
    deleteLocations
}