

export interface TopicResponseDTO {
  id: string;
  goal_id: string;
  title: string;
  description?: string;
  sequence_order: number;
  status: number;
  progress_percent: number;
}
