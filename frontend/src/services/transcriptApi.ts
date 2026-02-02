import api from "./apiClient";

export interface TranscriptLine {
  id: string;
  lessonId: string;
  startTime: number;
  endTime: number;
  text: string;
  order: number;
}

export const transcriptApi = {
  getTranscript: async (lessonId: string): Promise<TranscriptLine[]> => {
    const response = await api.get(`/lessons/${lessonId}/transcript`);
    return response.data;
  },
};
