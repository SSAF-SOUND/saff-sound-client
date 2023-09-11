import { SkillName } from '~/services/recruit';

import { Skills } from './skills';

export interface SkillIconProps {
  name: SkillName;
  size?: number;
  invert?: boolean;
}

const SkillIcon = (props: SkillIconProps) => {
  const { name, size = 24, invert = false } = props;
  const SkillSVG = Skills[name];
  const style = {
    height: size,
    filter: invert && invertable[name] ? 'invert(100%)' : undefined,
  };

  return <SkillSVG style={style} />;
};

const invertable = {
  ...(Object.fromEntries(
    Object.values(SkillName).map((skillName) => [skillName, false])
  ) as Record<SkillName, boolean>),
  [SkillName.IOS]: true,
  [SkillName.NEXTJS]: true,
  [SkillName.ETC]: true,
};

export default SkillIcon;
