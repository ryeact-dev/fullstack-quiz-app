import axios from 'axios';

export async function getAllQuestions() {
  return await axios.get(`/api/question/get-question`);
}

export async function getPaginatedQuestions({ subject, page, count }) {
  return await axios.get(
    `/api/question/get-question?subject=${subject}&count=${count}&page=${page}`
  );
}

export async function addQuestion({ forAddingData, isNew }) {
  if (isNew) {
    return await axios.post(`/api/question/add-question`, forAddingData);
  } else {
    return await axios.patch(`/api/question/update-question`, forAddingData);
  }
}

export async function deleteQuestion({ questionId }) {
  return await axios.delete(`/api/question/delete-question/${questionId}`);
}
