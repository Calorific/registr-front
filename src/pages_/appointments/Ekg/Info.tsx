import React, { FC, memo } from 'react';
import { Popover } from 'antd';

const data = [
  ['ФВ ', ' фракция выброса'],
  ['СДЛА ', ' систолическое давление в легочной артерии'],
  ['ЛП ', ' левое предсердия'],
  ['ПП ', ' правое предсердие'],
  ['МЖП ', ' межжелудочковая перегородка'],
  ['КДР ЛЖ ', ' конечный диастолический размер ЛЖ'],
  ['КСР ЛЖ ', ' конечный систолический размер ЛЖ'],
  ['КДО ЛЖ ', ' конечный диастолический объём ЛЖ'],
  ['КСО ЛЖ ', ' конечный систолический объём ЛЖ'],
  ['ЗСЛЖ ', ' задняя стенка ЛЖ'],
];

const Content: FC = () => (
  data.map((item, i) => (
    <p key={i} className="text-[16px] leading-[28px] text-[#797979] !font-open-sans">
      <span className="text-[#232323]">{item[0]}</span>–{item[1]}
    </p>
  ))
);

const _Info: FC = () => {

  return (
    <Popover content={<Content />}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.9997 20.1668C16.0623 20.1668 20.1663 16.0628 20.1663 11.0002C20.1663 5.93755 16.0623 1.8335 10.9997 1.8335C5.93706 1.8335 1.83301 5.93755 1.83301 11.0002C1.83301 16.0628 5.93706 20.1668 10.9997 20.1668Z" stroke="#7EB0C6" strokeWidth="1.56" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 14.6668V11.0002M11 7.3335H11.0092" stroke="#7EB0C6" strokeWidth="1.56" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Popover>
  );
}

export const Info = memo(_Info);
