import axios from 'axios';
import { Tag } from '../types/Tag';
import config from '../config';

const API_URL = `${config.API_ROOT_URL}/tags`;

export const getTags = async (): Promise<Tag[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getTagById = async (id: string): Promise<Tag> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createTag = async (tag: Tag): Promise<Tag> => {
    const response = await axios.post(API_URL, tag);
    return response.data;
};

export const updateTag = async (id: string, tag: Tag): Promise<Tag> => {
    const response = await axios.put(`${API_URL}/${id}`, tag);
    return response.data;
};

export const deleteTag = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};