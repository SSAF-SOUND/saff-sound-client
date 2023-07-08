export interface RecruitFormValues {
  category: string;
  participants: {
    study: Participants[];
    project: Participants[];
  };
  endDate: string;
  title: string;
  content: string;
}

export type Participants = {
  part: string;
  count: number;
};
