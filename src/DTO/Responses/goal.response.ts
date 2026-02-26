

export interface GoalResponseDTO {
  id: string;
  title: string;
  description?: string;
  priority: number;
  target_start?: string;
  target_end?: string;
  status: number;
  progress_percent: number;
  created_at: string;
}
