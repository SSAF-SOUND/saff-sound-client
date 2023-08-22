import type { SubmitHandler } from 'react-hook-form';
import type {
  RecruitCategory,
  RecruitType,
  SkillsType,
} from '~/services/recruit';

import { useForm } from 'react-hook-form';

import { Button } from '~/components/Common';
import { getRecruitThemeByCategory } from '~/services/recruit';

import { RecruitTypeFilter, SkillsFilter } from './Fields';
import { RecruitFormLabel } from './RecruitFormLabel';

export type RecruitFilterFormDefaultValues = {
  recruitType?: RecruitType[];
  skills?: SkillsType[];
};

interface RecruitFilterFormProps {
  submitHandler?: SubmitHandler<RecruitFilterFormDefaultValues>;
  category?: RecruitCategory;
  defaultValues?: RecruitFilterFormDefaultValues;
}

export const RecruitFilterForm = (props: RecruitFilterFormProps) => {
  //   const { data } = useRecruitTypes();
  const {
    category = 'project',
    defaultValues = { skills: [], recruitType: [] },
    submitHandler = console.log,
  } = props;
  const { skills: defaultSkills, recruitType: defaultRecruitType } =
    defaultValues;

  const categoryIsProject = category === 'project';
  const { control, handleSubmit, reset, watch } =
    useForm<RecruitFilterFormDefaultValues>({
      defaultValues,
    });

  return (
    <form
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
      }}
      onSubmit={handleSubmit(submitHandler)}
    >
      <RecruitFormLabel />
      {categoryIsProject && (
        <RecruitTypeFilter
          reset={() => reset({ ...watch(), recruitType: [] })}
          control={control}
          defaultValue={defaultRecruitType}
        />
      )}

      <SkillsFilter
        reset={() => reset({ ...watch(), skills: [] })}
        control={control}
        defaultValue={defaultSkills as unknown as string[]}
        category={category}
      />

      <Button type="submit" theme={getRecruitThemeByCategory(category)}>
        선택완료
      </Button>
    </form>
  );
};