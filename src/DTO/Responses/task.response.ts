

export interface TaskResponseDTO {
  id: string;
  topic_id: string;
  title: string;
  description?: string;
  sequence_order: number;
  status: number;
  progress_percent: number;
}
