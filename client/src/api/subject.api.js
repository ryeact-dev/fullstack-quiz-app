import axios from 'axios';

export async function getAllSubjects() {
  return await axios.get(`/api/subject/all-subject`);
}

export async function getPaginatedSubjects({ page, count }) {
  return await axios.get(
    `/api/subject/all-subject?count=${count}&page=${page}`
  );
}

export async function addSubject({ forAddingData, isNew }) {
  if (isNew) {
    return await axios.post(`/api/subject/add-subject`, forAddingData);
  } else return await axios.patch(`/api/subject/update-subject`, forAddingData);
}

export async function deleteSubject({ subjectId }) {
  return await axios.delete(`/api/subject/delete-subject/${subjectId}`);
}
