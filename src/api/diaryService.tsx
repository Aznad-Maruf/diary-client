import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:8080/entries'; // Replace with your backend URL if different

// Define the DiaryEntry interface based on the Java model
interface DiaryEntry {
  id?: string;
  title: string;
  content: string;
  tags: string[];
  date: string;  // Date is typically a string in API responses, format should be handled on the backend
  deleted: boolean;
}

export const createEntry = async (entry: DiaryEntry): Promise<DiaryEntry> => {
  const response: AxiosResponse<DiaryEntry> = await axios.post(API_URL, entry);
  return response.data;
};

export const getEntries = async (tags?: string[], date?: string): Promise<DiaryEntry[]> => {
  const params: { tags?: string[]; date?: string } = {};
  if (tags) params.tags = tags;
  if (date) params.date = date;
  const response: AxiosResponse<DiaryEntry[]> = await axios.get(API_URL, { params });
  return response.data;
};

export const getEntryById = async (id: string): Promise<DiaryEntry> => {
  const response: AxiosResponse<DiaryEntry> = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateEntry = async (id: string, updatedEntry: DiaryEntry): Promise<DiaryEntry> => {
  const response: AxiosResponse<DiaryEntry> = await axios.put(`${API_URL}/${id}`, updatedEntry);
  return response.data;
};

export const deleteEntry = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
